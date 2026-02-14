import type { Category, Word, Rating, Difficulty } from './types';

// Strip markdown formatting (asterisks, underscores) from text
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')  // **bold**
    .replace(/\*([^*]+)\*/g, '$1')       // *italic*
    .replace(/__([^_]+)__/g, '$1')       // __bold__
    .replace(/_([^_]+)_/g, '$1');        // _italic_
}

export function getWordGenerationPrompt(category: Category | 'all', excludeWords: string[], difficulty: Difficulty): string {
  const categoryContext = category === 'all' 
    ? 'any category (psychology, society, science, economics, tech, or art/philosophy)'
    : getCategoryDescription(category);

  const excludeList = excludeWords.length > 0 
    ? `\n\nDO NOT use any of these words (already attempted): ${excludeWords.join(', ')}`
    : '';

  const difficultyInstructions = difficulty === 'easy'
    ? `
DIFFICULTY: EASY
Choose a simple, everyday word that most people can explain reasonably well.
- Should be common words people use frequently
- The definition should be straightforward
- Perfect examples: friendship, jealousy, luck, courage, patience, creativity, honesty, freedom, happiness, love

BAD examples for easy (too complex): cognitive dissonance, gaslighting, existentialism`
    : `
DIFFICULTY: HARD
Choose a word that is SPECIFIC and INTERESTING - something people have heard of but would struggle to explain precisely.

IMPORTANT RULES:
- AVOID generic abstract words like: meaning, truth, beauty, art, time, reality, existence, nature, life, love
- PREFER specific concepts, movements, phenomena, or terms that have a defined meaning
- The word should make someone think "Oh, I know that word... wait, how DO I explain it?"

GREAT examples by category:
- Psychology: gaslighting, cognitive dissonance, Dunning-Kruger effect, Stockholm syndrome, impostor syndrome
- Society: gentrification, populism, social contract, civil disobedience, apartheid
- Science: entropy, photosynthesis, placebo effect, natural selection, black hole
- Economics: inflation, recession, hedge fund, arbitrage, supply and demand
- Tech: algorithm, encryption, machine learning, blockchain, cloud computing
- Art: Renaissance, Impressionism, Baroque, surrealism, minimalism, allegory, satire

BAD examples (too vague/generic): meaning, truth, beauty, art, creativity, purpose, existence
BAD examples (too obscure): epistemology, ontological, phenotype, synecdoche`;

  return `Generate a word for the "Close Enough" game.

The word should be from: ${categoryContext}
${difficultyInstructions}

CRITICAL REQUIREMENTS:
1. SPECIFIC & INTERESTING - Choose a precise term, not a vague abstract concept
2. RECOGNIZABLE - People have heard this word before in school, news, or conversation
3. CHALLENGING TO DEFINE - Easy to recognize, hard to explain accurately
4. NOT BORING - Avoid generic words like "meaning", "truth", "beauty", "time"
${excludeList}

IMPORTANT: Do NOT use any markdown formatting (no asterisks, no bold, no italics). Write in plain text only.

Respond in this exact JSON format:
{
  "word": "the word",
  "category": "psychology" | "society" | "science" | "economics" | "tech" | "art",
  "definition": "A clear, friendly 2-3 sentence explanation that a smart friend would give"
}

Only output the JSON, nothing else.`;
}

export function getRatingPrompt(word: string, definition: string, userExplanation: string): string {
  return `You are rating a player's explanation in the "Close Enough" game. The game tests the illusion of explanatory depth - people think they understand common words until they try to explain them.

WORD: "${word}"

ACTUAL DEFINITION:
${definition}

USER'S EXPLANATION:
"${userExplanation}"

Your job is to:
1. Compare their explanation to the actual definition
2. ALWAYS start with what they got RIGHT (be generous and encouraging)
3. Gently note what's missing (no judgment, just helpful)
4. Give a score from 1-5 stars
5. Keep the tone like a clever friend who's genuinely excited when they get close

SCORING GUIDE:
⭐ (1 star): Completely off track or barely related
⭐⭐ (2 stars): Has a vague idea but missing most key elements
⭐⭐⭐ (3 stars): Got the core concept but missing important nuances
⭐⭐⭐⭐ (4 stars): Strong understanding with minor gaps
⭐⭐⭐⭐⭐ (5 stars): Nailed it! Captured the essence perfectly

TONE EXAMPLES:
- "You nailed the core idea!"
- "You picked up on the key part about X..."
- "The piece you missed is..."
- "Here's the full picture..."
- "Close enough! You clearly get the gist."

IMPORTANT: Do NOT use any markdown formatting (no asterisks, no bold, no italics). Write in plain text only.

Respond in this exact JSON format:
{
  "stars": 1-5,
  "whatYouGotRight": ["specific thing they got right", "another thing"],
  "whatYouMissed": ["what was missing", "another gap"],
  "fullExplanation": "The complete, friendly definition",
  "encouragement": "A brief, warm closing message"
}

If the user's explanation is empty, very short (under 10 characters), or just nonsense, give 1 star and be encouraging about trying again.

Only output the JSON, nothing else.`;
}

function getCategoryDescription(category: Category): string {
  const descriptions: Record<Category, string> = {
    psychology: 'Psychology & Human Behavior - specific psychological phenomena, effects, syndromes, or behavioral concepts (e.g., cognitive dissonance, impostor syndrome, confirmation bias)',
    society: 'Society & Culture - specific social movements, political concepts, or cultural phenomena (e.g., gentrification, populism, civil disobedience)',
    science: 'Science & Nature - specific scientific concepts, processes, or phenomena (e.g., photosynthesis, entropy, natural selection)',
    economics: 'Money & Economics - specific economic terms, mechanisms, or financial concepts (e.g., inflation, recession, compound interest)',
    tech: 'Tech & Digital - specific technology concepts, systems, or digital phenomena (e.g., algorithm, encryption, machine learning)',
    art: 'Art & Philosophy - specific art movements, literary devices, or aesthetic concepts (e.g., Renaissance, Impressionism, satire, allegory)',
  };
  return descriptions[category];
}

export function parseWordResponse(response: string): Word | null {
  try {
    // Clean up the response - remove markdown code blocks if present
    let cleaned = response.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();
    
    const parsed = JSON.parse(cleaned);
    
    if (parsed.word && parsed.category && parsed.definition) {
      return {
        word: stripMarkdown(parsed.word),
        category: parsed.category,
        hint: parsed.hint ? stripMarkdown(parsed.hint) : undefined,
        definition: stripMarkdown(parsed.definition),
      };
    }
    return null;
  } catch (e) {
    console.error('Failed to parse word response:', e);
    return null;
  }
}

export function parseRatingResponse(response: string): Rating | null {
  try {
    // Clean up the response
    let cleaned = response.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.slice(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.slice(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();
    
    const parsed = JSON.parse(cleaned);
    
    if (typeof parsed.stars === 'number' && parsed.fullExplanation) {
      return {
        stars: Math.min(5, Math.max(1, parsed.stars)),
        whatYouGotRight: Array.isArray(parsed.whatYouGotRight) 
          ? parsed.whatYouGotRight.map(stripMarkdown) 
          : [],
        whatYouMissed: Array.isArray(parsed.whatYouMissed) 
          ? parsed.whatYouMissed.map(stripMarkdown) 
          : [],
        fullExplanation: stripMarkdown(parsed.fullExplanation),
        encouragement: stripMarkdown(parsed.encouragement || 'Keep playing!'),
      };
    }
    return null;
  } catch (e) {
    console.error('Failed to parse rating response:', e);
    return null;
  }
}
