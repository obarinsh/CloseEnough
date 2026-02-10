import type { Word, Difficulty } from '@/lib/types';
import { getCategoryInfo } from '@/lib/types';
import { CategoryIcon } from './CategoryIcon';

interface WordCardProps {
  word: Word;
  difficulty: Difficulty;
  isRevealing?: boolean;
}

export function WordCard({ word, difficulty, isRevealing = false }: WordCardProps) {
  const category = getCategoryInfo(word.category);
  
  const textPrimary = '#2D2D2F';
  const warmAccentBg = '#F5EBD8';
  const warmAccentBorder = '#E8D5B5';

  return (
    <div className={isRevealing ? 'animate-scale-in' : ''}>
      {/* Category Badge */}
      <div className="flex justify-center gap-2 mb-4">
        <span 
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-semibold"
          style={{
            background: warmAccentBg,
            color: textPrimary,
            border: `1.5px solid ${warmAccentBorder}`,
          }}
        >
          <CategoryIcon icon={category.icon} size={14} />
          <span>{category.name}</span>
        </span>
        <span 
          className="inline-flex items-center px-3 py-1.5 rounded-xl text-[13px] font-semibold capitalize"
          style={{
            background: '#F5F2ED',
            color: '#999',
          }}
        >
          {difficulty}
        </span>
      </div>

      {/* Word Display */}
      <div className="text-center py-6 sm:py-10">
        <h1 
          style={{ 
            fontFamily: "'Fredoka', 'Nunito', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(2.25rem, 8vw, 3.5rem)',
            color: textPrimary, 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em',
          }}
        >
          {word.word}
        </h1>
      </div>
    </div>
  );
}
