import { GoogleGenerativeAI } from '@google/generative-ai';
import type { Category, Word, Rating, Difficulty } from './types';
import { 
  getWordGenerationPrompt, 
  getRatingPrompt, 
  parseWordResponse, 
  parseRatingResponse 
} from './prompts';

// API key should be set in environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    if (!API_KEY) {
      throw new Error('Gemini API key not configured. Set VITE_GEMINI_API_KEY in your .env file.');
    }
    genAI = new GoogleGenerativeAI(API_KEY);
  }
  return genAI;
}

export function isApiConfigured(): boolean {
  return !!API_KEY;
}

export async function generateWord(
  category: Category | 'all',
  excludeWords: string[] = [],
  difficulty: Difficulty = 'hard'
): Promise<Word> {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const prompt = getWordGenerationPrompt(category, excludeWords, difficulty);
  
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  const word = parseWordResponse(response);
  
  if (!word) {
    throw new Error('Failed to generate a valid word. Please try again.');
  }
  
  return word;
}

export async function rateExplanation(
  word: string,
  definition: string,
  userExplanation: string
): Promise<Rating> {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
  
  const prompt = getRatingPrompt(word, definition, userExplanation);
  
  const result = await model.generateContent(prompt);
  const response = result.response.text();
  
  const rating = parseRatingResponse(response);
  
  if (!rating) {
    throw new Error('Failed to rate your explanation. Please try again.');
  }
  
  return rating;
}

// Easy fallback words - simple, everyday concepts people can explain well
export const EASY_FALLBACK_WORDS: Word[] = [
  {
    word: 'Friendship',
    category: 'psychology',
    definition: 'Friendship is a close relationship between people who care about each other, enjoy spending time together, and support one another. Friends trust each other, share experiences, and are there for each other in good times and bad.',
  },
  {
    word: 'Jealousy',
    category: 'psychology',
    definition: 'Jealousy is the feeling of resentment or insecurity when you fear losing something you have to someone else, or when you want something that belongs to another person. It often involves feeling threatened by a rival.',
  },
  {
    word: 'Luck',
    category: 'psychology',
    definition: 'Luck is when good or bad things happen to you by chance, not because of your own actions or abilities. It\'s the random events in life that affect your outcomes without you controlling them.',
  },
  {
    word: 'Courage',
    category: 'psychology',
    definition: 'Courage is the ability to do something that frightens you or to face danger, pain, or difficulty without letting fear stop you. It\'s being brave even when you\'re scared.',
  },
  {
    word: 'Honesty',
    category: 'psychology',
    definition: 'Honesty is telling the truth and being sincere and genuine in what you say and do. It means not lying, cheating, or deceiving others, and being trustworthy.',
  },
  {
    word: 'Freedom',
    category: 'society',
    definition: 'Freedom is the ability to act, speak, or think as you want without being controlled or restricted by others. It\'s having the power to make your own choices about your life.',
  },
  {
    word: 'Teamwork',
    category: 'society',
    definition: 'Teamwork is when a group of people work together toward a common goal, each contributing their skills and efforts. It involves cooperation, communication, and helping each other succeed.',
  },
  {
    word: 'Creativity',
    category: 'art',
    definition: 'Creativity is the ability to come up with new ideas, make original things, or think of unique solutions to problems. It\'s using your imagination to create something that didn\'t exist before.',
  },
  {
    word: 'Gravity',
    category: 'science',
    definition: 'Gravity is the force that pulls objects toward each other. On Earth, it\'s what keeps us on the ground and makes things fall down when we drop them. The bigger an object, the stronger its gravitational pull.',
  },
  {
    word: 'Savings',
    category: 'economics',
    definition: 'Savings is money that you keep and don\'t spend, usually put aside for future use. It\'s the portion of your income that you set aside instead of using it right away.',
  },
  {
    word: 'Password',
    category: 'tech',
    definition: 'A password is a secret word or phrase that you use to prove your identity and gain access to something, like a website or device. It keeps your accounts secure by making sure only you can get in.',
  },
  {
    word: 'Patience',
    category: 'psychology',
    definition: 'Patience is the ability to wait calmly for something without getting frustrated or upset. It\'s accepting delays or problems without becoming annoyed or anxious.',
  },
];

// Hard fallback words - seem familiar but tricky to define precisely
export const HARD_FALLBACK_WORDS: Word[] = [
  {
    word: 'Sarcasm',
    category: 'psychology',
    definition: 'Sarcasm is using words to convey the opposite of their literal meaning, typically with a mocking or contemptuous tone. It\'s a form of verbal irony where the speaker says something but clearly means the opposite, often to criticize or make fun of something.',
  },
  {
    word: 'Democracy',
    category: 'society',
    definition: 'Democracy is a system of government where power is held by the people, who exercise it directly or through elected representatives. It\'s built on principles like majority rule, protection of minority rights, free elections, and civic participation.',
  },
  {
    word: 'Inflation',
    category: 'economics',
    definition: 'Inflation is the rate at which the general level of prices for goods and services rises over time, causing purchasing power to fall. When inflation occurs, each unit of currency buys fewer items than it did before.',
  },
  {
    word: 'Algorithm',
    category: 'tech',
    definition: 'An algorithm is a step-by-step set of instructions or rules designed to solve a specific problem or accomplish a task. In computing, algorithms tell computers exactly what operations to perform and in what order.',
  },
  {
    word: 'Empathy',
    category: 'psychology',
    definition: 'Empathy is the ability to understand and share the feelings of another person by imagining yourself in their situation. Unlike sympathy (feeling sorry for someone), empathy involves actually feeling what they feel.',
  },
  {
    word: 'Metabolism',
    category: 'science',
    definition: 'Metabolism is the set of chemical processes that occur within living organisms to maintain life. It includes breaking down food for energy (catabolism) and building up compounds the body needs (anabolism). Your metabolic rate determines how quickly you burn calories.',
  },
  {
    word: 'Irony',
    category: 'art',
    definition: 'Irony is a contrast between what is expected and what actually occurs. There are several types: verbal irony (saying the opposite of what you mean), situational irony (when outcomes contradict expectations), and dramatic irony (when the audience knows something characters don\'t).',
  },
  {
    word: 'Cognitive Dissonance',
    category: 'psychology',
    definition: 'Cognitive dissonance is the mental discomfort experienced when holding two contradictory beliefs, values, or attitudes simultaneously. To reduce this discomfort, people often change their beliefs or rationalize their behavior.',
  },
  {
    word: 'Gaslighting',
    category: 'psychology',
    definition: 'Gaslighting is a form of psychological manipulation where someone makes another person question their own memory, perception, or sanity. The term comes from a 1944 film where a husband manipulates his wife into thinking she\'s going insane.',
  },
  {
    word: 'Renaissance',
    category: 'art',
    definition: 'The Renaissance was a cultural movement spanning roughly the 14th to 17th century, beginning in Italy. It marked a "rebirth" of interest in classical Greek and Roman culture, leading to major advances in art, science, literature, and philosophy that shaped the modern world.',
  },
  {
    word: 'Procrastination',
    category: 'psychology',
    definition: 'Procrastination is the act of delaying or postponing tasks despite knowing there will be negative consequences. It\'s not simply laziness—it often involves emotional regulation, where we avoid tasks that trigger negative feelings like anxiety or boredom.',
  },
  {
    word: 'Sustainability',
    category: 'science',
    definition: 'Sustainability is the practice of meeting current needs without compromising the ability of future generations to meet their own needs. It involves balancing economic growth, environmental protection, and social well-being.',
  },
];

// Combined for backwards compatibility
export const FALLBACK_WORDS: Word[] = [...EASY_FALLBACK_WORDS, ...HARD_FALLBACK_WORDS];

export function getRandomFallbackWord(
  category: Category | 'all',
  excludeWords: string[] = [],
  difficulty: Difficulty = 'hard'
): Word {
  const wordList = difficulty === 'easy' ? EASY_FALLBACK_WORDS : HARD_FALLBACK_WORDS;
  
  let available = wordList.filter(
    w => !excludeWords.map(e => e.toLowerCase()).includes(w.word.toLowerCase())
  );
  
  if (category !== 'all') {
    available = available.filter(w => w.category === category);
  }
  
  if (available.length === 0) {
    // If all words have been used, reset but still filter by category
    available = category === 'all' 
      ? wordList 
      : wordList.filter(w => w.category === category);
  }
  
  return available[Math.floor(Math.random() * available.length)];
}

// Simple fallback rating when API is not available
export function getFallbackRating(
  definition: string,
  userExplanation: string
): Rating {
  const explanation = userExplanation.toLowerCase().trim();
  const def = definition.toLowerCase();
  
  // Very basic keyword matching for demo
  const defWords = def.split(/\s+/).filter(w => w.length > 4);
  const matchingWords = defWords.filter(w => explanation.includes(w));
  const matchRatio = matchingWords.length / Math.max(defWords.length, 1);
  
  let stars: number;
  let whatYouGotRight: string[];
  let whatYouMissed: string[];
  let encouragement: string;
  
  if (explanation.length < 10) {
    stars = 1;
    whatYouGotRight = ['You gave it a shot!'];
    whatYouMissed = ['Try writing a more complete explanation'];
    encouragement = 'Don\'t be shy—give it a real try! There\'s no wrong answer here.';
  } else if (matchRatio > 0.4) {
    stars = 4;
    whatYouGotRight = ['You captured the main idea', 'Good use of relevant concepts'];
    whatYouMissed = ['A few nuances could be added'];
    encouragement = 'Impressive! You clearly understand this well.';
  } else if (matchRatio > 0.2) {
    stars = 3;
    whatYouGotRight = ['You\'re on the right track', 'Some key elements are there'];
    whatYouMissed = ['Some important aspects weren\'t covered'];
    encouragement = 'Close enough! You\'ve got the gist of it.';
  } else if (matchRatio > 0.1) {
    stars = 2;
    whatYouGotRight = ['You have a general sense of it'];
    whatYouMissed = ['Several key concepts were missing'];
    encouragement = 'You\'re getting there! Check out the full explanation.';
  } else {
    stars = 2;
    whatYouGotRight = ['You made an attempt'];
    whatYouMissed = ['The core concept wasn\'t quite captured'];
    encouragement = 'This one\'s tricky! See how close you were.';
  }
  
  return {
    stars,
    whatYouGotRight,
    whatYouMissed,
    fullExplanation: definition,
    encouragement,
  };
}
