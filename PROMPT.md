# Close Enough — AI Prompt Documentation

## App Concept

**Close Enough** is a word game that tests the "illusion of explanatory depth" — the psychological phenomenon where people believe they understand common concepts until they try to explain them. Players are given familiar words and asked to explain their meaning in their own words, then receive AI feedback comparing their explanation to the actual definition.

---

## Game Flow

1. **Select Category** (optional): Psychology, Society, Science, Money, Tech, Art, or "All Topics"
2. **Select Difficulty**: Easy (simple everyday words) or Hard (tricky-to-define words)
3. **See the Word**: A word appears that the player likely recognizes
4. **Explain It**: Player writes their explanation in their own words
5. **Get Feedback**: AI rates their explanation (1-5 stars) with:
   - What they got right
   - What they missed
   - The full definition
   - An encouraging message
6. **Repeat**: Continue with new words, building score and streak

---

## AI Prompts

### 1. Word Generation Prompt

```
Generate a word for the "Close Enough" game.

The word should be from: [CATEGORY or "any category"]

DIFFICULTY: [EASY or HARD]

For EASY:
Choose a simple, everyday word that most people can explain reasonably well.
- Should be common words people use frequently
- The definition should be straightforward
- Perfect examples: friendship, jealousy, luck, courage, patience, creativity, honesty, freedom, happiness, love

For HARD:
Choose a word that seems familiar but is surprisingly tricky to define precisely.
- People think they know it but struggle to articulate it clearly
- Tests the "illusion of explanatory depth"
- Perfect examples: sarcasm, irony, algorithm, empathy, metabolism, gaslighting, cognitive dissonance, inflation, democracy

CRITICAL REQUIREMENTS:
1. FREQUENTLY ENCOUNTERED - People hear/read this word regularly in everyday life
2. INTUITIVELY UNDERSTOOD - Most people feel they know what it means from context
3. NOT OBSCURE - The user should immediately recognize the word

[If applicable: DO NOT use any of these words (already attempted): word1, word2, ...]

Respond in this exact JSON format:
{
  "word": "the word",
  "category": "psychology" | "society" | "science" | "economics" | "tech" | "art",
  "definition": "A clear, friendly 2-3 sentence explanation that a smart friend would give"
}

Only output the JSON, nothing else.
```

---

### 2. Explanation Rating Prompt

```
You are rating a player's explanation in the "Close Enough" game. The game tests the illusion of explanatory depth - people think they understand common words until they try to explain them.

WORD: "[word]"

ACTUAL DEFINITION:
[definition]

USER'S EXPLANATION:
"[userExplanation]"

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

Respond in this exact JSON format:
{
  "stars": 1-5,
  "whatYouGotRight": ["specific thing they got right", "another thing"],
  "whatYouMissed": ["what was missing", "another gap"],
  "fullExplanation": "The complete, friendly definition",
  "encouragement": "A brief, warm closing message"
}

If the user's explanation is empty, very short (under 10 characters), or just nonsense, give 1 star and be encouraging about trying again.

Only output the JSON, nothing else.
```

---

## Categories

| Category | Description | Example Words |
|----------|-------------|---------------|
| Psychology | How people think, feel, and behave | empathy, sarcasm, procrastination, cognitive dissonance |
| Society | How communities and civilizations work | democracy, freedom, teamwork, culture |
| Science | Natural world and scientific concepts | gravity, metabolism, sustainability, evolution |
| Economics | Finance, trade, and economic systems | inflation, savings, investment, supply |
| Tech | Technology, internet, and digital life | algorithm, password, encryption, cloud |
| Art | Creativity, meaning, and abstract concepts | irony, creativity, Renaissance, surrealism |

---

## Difficulty Levels

### Easy Mode
- **Goal**: Words most people can explain reasonably well
- **Characteristics**: Common, everyday vocabulary with straightforward definitions
- **Examples**: friendship, jealousy, luck, courage, patience, creativity, honesty, freedom, gravity, savings

### Hard Mode
- **Goal**: Words that seem familiar but are tricky to define precisely
- **Characteristics**: Tests the illusion of explanatory depth — words people *think* they know
- **Examples**: sarcasm, democracy, inflation, algorithm, empathy, metabolism, irony, gaslighting, cognitive dissonance

---

## Scoring System

| Stars | Meaning | Points |
|-------|---------|--------|
| ⭐ | Completely off track | +1 |
| ⭐⭐ | Vague idea, missing most elements | +2 |
| ⭐⭐⭐ | Got core concept, missing nuances | +3 |
| ⭐⭐⭐⭐ | Strong understanding, minor gaps | +4 |
| ⭐⭐⭐⭐⭐ | Nailed it! | +5 |

**Streak**: Consecutive words with 3+ stars

---

## AI Personality Guidelines

The AI should act like a **clever, encouraging friend** who:

1. **Celebrates wins first** — Always start with what the player got right
2. **Is generous** — Give credit for partial understanding
3. **Never judges** — Missing something is part of the game, not a failure
4. **Explains clearly** — The "full explanation" should be educational and friendly
5. **Stays warm** — Encouragement messages should feel genuine, not robotic

### Good tone examples:
- "You nailed the core idea!"
- "Close enough! You clearly get the gist."
- "The piece you missed is actually pretty subtle..."
- "You were so close! Here's the full picture..."

### Avoid:
- Condescending language
- Academic/dry explanations
- Making players feel stupid for missing things
- Overly formal responses

---

## Technical Notes

- **Model**: Gemini 2.5 Flash
- **Response Format**: JSON only (no markdown, no extra text)
- **Fallback**: Built-in word lists for when API is unavailable
- **Categories**: Enforced via prompt and parsed from response
- **Score clamping**: Stars are always between 1-5

---

# Brand Book

## Brand Identity

| Attribute | Value |
|-----------|-------|
| **Brand Name** | Close Enough |
| **Symbol** | ≈ (approximately equal) |
| **Tagline** | "One word at a time." |

## Design Philosophy

Clean, minimal, and approachable — inspired by Apple's design language. The UI feels soft, warm, and inviting rather than clinical. Semi-transparent elements float over a gentle gradient background, creating a sense of lightness and calm.

### Design Principles

1. **Soft & Approachable** — Rounded corners, gentle shadows, warm colors
2. **Minimal & Focused** — One thing at a time, no clutter
3. **Warm & Encouraging** — The design should feel like a supportive friend
4. **Effortlessly Beautiful** — Premium feel without being flashy

---

## Color Palette

### Primary Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Accent (Plum)** | `#8B5E83` | Primary buttons, focus states, interactive elements |
| **Accent Light** | `#8B5E8320` | Hover backgrounds, subtle highlights |

### Text Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Text Primary** | `#1D1D1F` | Headlines, primary content |
| **Text Secondary** | `#6E6E73` | Labels, supporting text |
| **Text Tertiary** | `#AEAEB2` | Hints, placeholders, disabled states |

### Background

| Name | Value | Usage |
|------|-------|-------|
| **Gradient** | `linear-gradient(180deg, #E8F5E8 0%, #FFF8E8 35%, #F5E8F0 100%)` | Full-page background (mint → cream → blush) |
| **Subtle** | `rgba(255,255,255,0.6)` | Cards, inputs, semi-transparent containers |
| **Divider** | `rgba(0,0,0,0.07)` | Borders, separators |

### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| **Success** | `#34C759` | Positive feedback |
| **Warning** | `#FF9500` | Cautions |
| **Destructive** | `#E8654A` | Errors |

---

## Typography

### Font Family

**DM Sans** — A geometric sans-serif with a friendly, modern feel.

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale

| Name | Size | Line Height | Letter Spacing | Weight | Usage |
|------|------|-------------|----------------|--------|-------|
| `xs` | 0.75rem | 1rem | 0.02em | 400 | Fine print |
| `sm` | 0.875rem | 1.25rem | 0.01em | 400 | Captions, hints |
| `base` | 1rem | 1.6rem | 0 | 400 | Body text |
| `lg` | 1.125rem | 1.75rem | -0.01em | 400 | Emphasized body |
| `xl` | 1.25rem | 1.75rem | -0.01em | 500 | Section titles |
| `2xl` | 1.5rem | 2rem | -0.02em | 600 | Card titles |
| `3xl` | 1.875rem | 2.25rem | -0.02em | 600 | Page titles |
| `4xl` | 2.25rem | 2.5rem | -0.03em | 700 | Hero words |
| `5xl` | 3rem | 1.1 | -0.03em | 700 | Display |
| `6xl` | 3.75rem | 1.05 | -0.04em | 800 | Extra large display |

---

## Spacing & Layout

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 0.5rem (8px) | Small elements, badges |
| `md` | 0.625rem (10px) | Buttons, inputs |
| `lg` | 0.75rem (12px) | Cards |
| `xl` | 0.875rem (14px) | Large cards |
| `2xl` | 1rem (16px) | Containers |

### Shadows

```css
/* Subtle shadow */
box-shadow: 0 2px 8px rgba(139, 94, 131, 0.08);

/* Medium shadow */
box-shadow: 0 2px 12px rgba(139, 94, 131, 0.15);

/* Large shadow (hover states) */
box-shadow: 0 8px 24px rgba(139, 94, 131, 0.25);
```

---

## Components

### Buttons

**Primary Button**
- Background: `#8B5E83` (plum accent)
- Text: `#FFFFFF`
- Border radius: `xl` (14px)
- Shadow: `0 2px 12px rgba(139, 94, 131, 0.25)`
- Hover: Lift `-1px`, shadow expands to `0 8px 24px rgba(139, 94, 131, 0.4)`

**Ghost Button**
- Background: transparent
- Text: `#1D1D1F`
- Hover: `rgba(255,255,255,0.6)` background

### Cards/Containers

- Background: `rgba(255,255,255,0.6)` (semi-transparent white)
- Border radius: `2xl` (16px)
- No visible border (or `rgba(0,0,0,0.07)` if needed)

### Input Fields

- Background: `rgba(255,255,255,0.6)`
- Border: `2px solid transparent`
- Focus border: `2px solid #8B5E83`
- Focus background: `#FFFFFF`
- Border radius: `xl` (14px)
- Text: `#1D1D1F`
- Placeholder: `#AEAEB2`

### Category Badges

- Background: `#8B5E8320` (accent with 12% opacity)
- Border: `1px solid rgba(139, 94, 131, 0.15)`
- Text: `#8B5E83`
- Border radius: full pill

---

## Motion & Animation

### Timing

| Token | Duration | Usage |
|-------|----------|-------|
| `fast` | 120ms | Micro-interactions (hover, focus) |
| `normal` | 200ms | Standard transitions |
| `slow` | 350ms | Emphasis transitions |
| `reveal` | 500ms | Content reveals |

### Easing Functions

```css
/* Default - smooth */
cubic-bezier(0.25, 0.1, 0.25, 1)

/* Enter - decelerate */
cubic-bezier(0, 0, 0.2, 1)

/* Exit - accelerate */
cubic-bezier(0.4, 0, 1, 1)

/* Playful - overshoot */
cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Keyframe Animations

**Fade In** (content appears)
```css
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
```

**Scale In** (emphasis)
```css
@keyframes scale-in {
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
```

**Star Pop** (rating celebration)
```css
@keyframes star-pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

**Spin Slow** (loading dice)
```css
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
/* Duration: 2s, linear, infinite */
```

---

## Iconography

- **Style**: Emoji-based for warmth and accessibility
- **Loading**: 🎲 (spinning dice)
- **Thinking**: 🤔
- **Categories**: 🧠 🌍 ⚗️ 💰 🖥 🎨 🎲
- **Ratings**: ⭐ (with opacity/grayscale for unfilled)

---

## Voice & Tone

### Brand Voice

**Clever but kind** — Like a smart friend who's genuinely excited to help you learn, never condescending.

### Tone Guidelines

| Context | Tone |
|---------|------|
| Instructions | Clear, friendly, casual |
| Success | Celebratory, genuine excitement |
| Partial success | Encouraging, "close enough!" |
| Miss | Supportive, educational |
| Loading | Light, playful |

### Example Copy

- "Explain it in your own words"
- "Don't overthink it — just write what you think it means!"
- "Finding a word for you..."
- "Checking your explanation..."
- "One word at a time."

---

## CSS Variables (for shadcn/ui compatibility)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 6% 12%;
  --card: 0 0% 100%;
  --card-foreground: 240 6% 12%;
  --primary: 312 20% 46%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 6% 12%;
  --secondary-foreground: 0 0% 100%;
  --accent: 312 20% 46%;
  --accent-foreground: 0 0% 100%;
  --muted: 0 0% 100%;
  --muted-foreground: 240 2% 45%;
  --border: 0 0% 0%;
  --input: 0 0% 0%;
  --ring: 312 20% 46%;
  --destructive: 12 77% 60%;
  --destructive-foreground: 0 0% 100%;
}
```

---

## Tailwind Config Reference

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8B5E83",
          foreground: "#FFFFFF",
          light: "#8B5E8320",
        },
        secondary: {
          DEFAULT: "#1D1D1F",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#8B5E83",
          foreground: "#FFFFFF",
        },
        subtle: "rgba(255,255,255,0.6)",
        border: "rgba(0,0,0,0.07)",
        "text-primary": "#1D1D1F",
        "text-secondary": "#6E6E73",
        "text-tertiary": "#AEAEB2",
        destructive: { DEFAULT: "#E8654A", foreground: "#FFFFFF" },
        success: { DEFAULT: "#34C759", foreground: "#FFFFFF" },
        warning: { DEFAULT: "#FF9500", foreground: "#1D1D1F" },
      },
      fontFamily: {
        heading: ["DM Sans", "Helvetica Neue", "sans-serif"],
        body: ["DM Sans", "Helvetica Neue", "sans-serif"],
      },
      borderRadius: {
        sm: "0.5rem",
        md: "0.625rem",
        lg: "0.75rem",
        xl: "0.875rem",
        "2xl": "1rem",
      },
    },
  },
};
```
