import type { UserStats } from './types';

const STORAGE_KEY = 'close-enough-stats';

const DEFAULT_STATS: UserStats = {
  totalScore: 0,
  currentStreak: 0,
  bestStreak: 0,
  wordsAttempted: [],
  lastPlayedDate: '',
};

export function getStats(): UserStats {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STATS;
    return { ...DEFAULT_STATS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveStats(stats: UserStats): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats:', e);
  }
}

export function updateStatsAfterRound(stars: number, word: string): UserStats {
  const stats = getStats();
  const today = new Date().toISOString().split('T')[0];
  
  // Add stars to total score
  stats.totalScore += stars;
  
  // Track attempted words
  if (!stats.wordsAttempted.includes(word)) {
    stats.wordsAttempted.push(word);
  }
  
  // Update streak (3+ stars maintains/increases streak)
  if (stars >= 3) {
    stats.currentStreak += 1;
    if (stats.currentStreak > stats.bestStreak) {
      stats.bestStreak = stats.currentStreak;
    }
  } else {
    stats.currentStreak = 0;
  }
  
  stats.lastPlayedDate = today;
  saveStats(stats);
  
  return stats;
}

export function resetStats(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasAttemptedWord(word: string): boolean {
  const stats = getStats();
  return stats.wordsAttempted.includes(word.toLowerCase());
}
