import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Word, Rating, Category, Difficulty, UserStats, GameState } from '@/lib/types';
import { getStats, updateStatsAfterRound } from '@/lib/storage';
import { 
  generateWord, 
  rateExplanation, 
  isApiConfigured,
  getRandomFallbackWord,
  getFallbackRating
} from '@/lib/gemini';

interface GameContextType {
  // Game state
  gameState: GameState;
  stats: UserStats;
  isApiReady: boolean;
  error: string | null;
  
  // Actions
  startNewRound: () => Promise<void>;
  submitExplanation: (explanation: string) => Promise<void>;
  setCategory: (category: Category | 'all') => void;
  setDifficulty: (difficulty: Difficulty) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [gameState, setGameState] = useState<GameState>({
    currentWord: null,
    userExplanation: '',
    rating: null,
    phase: 'loading',
    selectedCategory: 'all',
    difficulty: 'easy',
  });
  
  const [stats, setStats] = useState<UserStats>(getStats);
  const [error, setError] = useState<string | null>(null);
  const [isApiReady] = useState(() => isApiConfigured());

  // Load stats on mount
  useEffect(() => {
    setStats(getStats());
  }, []);

  const startNewRound = useCallback(async () => {
    setError(null);
    setGameState(prev => ({ 
      ...prev, 
      phase: 'loading',
      currentWord: null,
      rating: null,
      userExplanation: '',
    }));

    try {
      let word: Word;
      
      if (isApiReady) {
        word = await generateWord(
          gameState.selectedCategory,
          stats.wordsAttempted,
          gameState.difficulty
        );
      } else {
        // Use fallback words in demo mode
        word = getRandomFallbackWord(
          gameState.selectedCategory,
          stats.wordsAttempted,
          gameState.difficulty
        );
      }
      
      setGameState(prev => ({
        ...prev,
        currentWord: word,
        phase: 'explaining',
      }));
    } catch (err) {
      console.error('Failed to generate word:', err);
      // Fall back to demo words on error
      const word = getRandomFallbackWord(
        gameState.selectedCategory,
        stats.wordsAttempted,
        gameState.difficulty
      );
      setGameState(prev => ({
        ...prev,
        currentWord: word,
        phase: 'explaining',
      }));
      
      if (isApiReady) {
        setError('Using demo mode - API temporarily unavailable');
      }
    }
  }, [gameState.selectedCategory, gameState.difficulty, stats.wordsAttempted, isApiReady]);

  const submitExplanation = useCallback(async (explanation: string) => {
    if (!gameState.currentWord) return;
    
    setError(null);
    setGameState(prev => ({ 
      ...prev, 
      userExplanation: explanation,
      phase: 'rating' 
    }));

    try {
      let rating: Rating;
      
      if (isApiReady) {
        rating = await rateExplanation(
          gameState.currentWord.word,
          gameState.currentWord.definition,
          explanation
        );
      } else {
        // Use fallback rating in demo mode
        rating = getFallbackRating(
          gameState.currentWord.definition,
          explanation
        );
      }
      
      // Update stats
      const newStats = updateStatsAfterRound(
        rating.stars,
        gameState.currentWord.word
      );
      setStats(newStats);
      
      setGameState(prev => ({
        ...prev,
        rating,
        phase: 'feedback',
      }));
    } catch (err) {
      console.error('Failed to rate explanation:', err);
      // Fall back to simple rating on error
      const rating = getFallbackRating(
        gameState.currentWord.definition,
        explanation
      );
      
      const newStats = updateStatsAfterRound(
        rating.stars,
        gameState.currentWord.word
      );
      setStats(newStats);
      
      setGameState(prev => ({
        ...prev,
        rating,
        phase: 'feedback',
      }));
      
      if (isApiReady) {
        setError('Using simplified rating - API temporarily unavailable');
      }
    }
  }, [gameState.currentWord, isApiReady]);

  const setCategory = useCallback((category: Category | 'all') => {
    setGameState(prev => ({ ...prev, selectedCategory: category }));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setGameState(prev => ({ ...prev, difficulty }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      currentWord: null,
      userExplanation: '',
      rating: null,
      phase: 'loading',
      selectedCategory: 'all',
      difficulty: 'easy',
    });
    setError(null);
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        stats,
        isApiReady,
        error,
        startNewRound,
        submitExplanation,
        setCategory,
        setDifficulty,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
