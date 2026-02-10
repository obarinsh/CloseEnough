export type Category = 
  | 'psychology'
  | 'society'
  | 'science'
  | 'economics'
  | 'tech'
  | 'art';

export type Difficulty = 'easy' | 'hard';

export type CategoryIcon = 'brain' | 'globe' | 'flask-conical' | 'coins' | 'monitor' | 'palette';

export interface CategoryInfo {
  id: Category;
  name: string;
  icon: CategoryIcon;
  color: string;
  bgColor: string;
}

export interface Word {
  word: string;
  category: Category;
  hint?: string;
  definition: string;
}

export interface Rating {
  stars: number;
  whatYouGotRight: string[];
  whatYouMissed: string[];
  fullExplanation: string;
  encouragement: string;
}

export interface GameState {
  currentWord: Word | null;
  userExplanation: string;
  rating: Rating | null;
  phase: 'loading' | 'explaining' | 'rating' | 'feedback';
  selectedCategory: Category | 'all';
  difficulty: Difficulty;
}

export interface UserStats {
  totalScore: number;
  currentStreak: number;
  bestStreak: number;
  wordsAttempted: string[];
  lastPlayedDate: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'psychology',
    name: 'Psychology',
    icon: 'brain',
    color: 'text-primary',
    bgColor: 'bg-primary-light',
  },
  {
    id: 'society',
    name: 'Society',
    icon: 'globe',
    color: 'text-primary',
    bgColor: 'bg-primary-light',
  },
  {
    id: 'science',
    name: 'Science',
    icon: 'flask-conical',
    color: 'text-primary',
    bgColor: 'bg-primary-light',
  },
  {
    id: 'economics',
    name: 'Money',
    icon: 'coins',
    color: 'text-primary',
    bgColor: 'bg-primary-light',
  },
  {
    id: 'tech',
    name: 'Tech',
    icon: 'monitor',
    color: 'text-primary',
    bgColor: 'bg-primary-light',
  },
  {
    id: 'art',
    name: 'Art',
    icon: 'palette',
    color: 'text-primary',
    bgColor: 'bg-primary-light',
  },
];

export function getCategoryInfo(categoryId: Category): CategoryInfo {
  return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];
}
