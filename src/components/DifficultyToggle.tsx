import type { Difficulty } from '@/lib/types';

interface DifficultyToggleProps {
  difficulty: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const difficultyOptions = [
  { id: 'easy' as Difficulty, label: 'Easy', sub: 'Simple words' },
  { id: 'hard' as Difficulty, label: 'Hard', sub: 'Tricky words' },
];

export function DifficultyToggle({ difficulty, onChange }: DifficultyToggleProps) {
  const textPrimary = '#2D2D2F';
  const textTertiary = '#AEAEB2';
  const warmAccent = '#E8D5B5';
  const warmAccentBg = '#F5EBD8';

  return (
    <div className="space-y-2.5">
      <p 
        className="tracking-[1px] uppercase font-bold"
        style={{ 
          color: '#999',
          fontFamily: "'Fredoka', 'Nunito', sans-serif",
          fontSize: '13px',
        }}
      >
        Difficulty
      </p>
      
      <div className="flex gap-1.5">
        {difficultyOptions.map((d) => {
          const isSelected = difficulty === d.id;
          
          return (
            <button
              key={d.id}
              onClick={() => onChange(d.id)}
              className="flex-1 py-3.5 px-3.5 rounded-xl text-center transition-all duration-150 font-semibold text-[14px]"
              style={{
                background: isSelected ? warmAccentBg : '#F5F2ED',
                color: textPrimary,
                border: isSelected ? `2px solid ${warmAccent}` : '2px solid transparent',
              }}
            >
              {d.label}
              <p 
                className="text-[11px] font-normal mt-0.5"
                style={{ color: isSelected ? '#A0926E' : textTertiary }}
              >
                {d.sub}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
