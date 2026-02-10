import { useState } from 'react';
import { Eye, PenLine, Star, Info, HelpCircle, X } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { CategoryPicker } from './CategoryPicker';
import { DifficultyToggle } from './DifficultyToggle';

interface StartScreenProps {
  onStart: () => void;
}

const steps = [
  { icon: Eye, title: 'See a word', desc: "A familiar term you've heard before" },
  { icon: PenLine, title: 'Explain it', desc: 'Write what you think it means' },
  { icon: Star, title: 'Get rated', desc: 'See how close you actually got' },
];

export function StartScreen({ onStart }: StartScreenProps) {
  const { gameState, setCategory, setDifficulty, isApiReady } = useGame();
  const [isHoveredStart, setIsHoveredStart] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  const brandColor = '#b677ce';
  const textPrimary = '#2D2D2F';
  const textSecondary = '#6E6E73';
  const textTertiary = '#AEAEB2';

  return (
    <div className="animate-fade-in">
      {/* Title */}
      <div className="text-center mb-4">
        <h1 
          style={{ 
            fontFamily: "'Fredoka', 'Nunito', sans-serif",
            fontSize: '2rem',
            fontWeight: 600,
            color: '#ce7777', 
            lineHeight: 1.2, 
            letterSpacing: '-0.02em',
            marginBottom: 8,
          }}
        >
          How well do you
          <br />
          really know words?
        </h1>
        
      </div>

      {/* Subtitle row with How to play */}
      <div 
        className="flex items-center justify-between mb-5"
        style={{ gap: '12px' }}
      >
        <p 
          className="text-[14px]"
          style={{ color: textSecondary, lineHeight: 1.4 }}
        >
          Explain everyday words and discover what you <em>really</em> know.
        </p>

        <button
          onClick={() => setShowHowToPlay(true)}
          className="flex-shrink-0 flex flex-col items-center gap-0.5 text-[11px] font-medium transition-opacity hover:opacity-70"
          style={{ color: brandColor }}
        >
          <HelpCircle size={14} />
          How to play
        </button>
      </div>

      {/* How to Play Modal */}
      {showHowToPlay && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ zIndex: 100, background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setShowHowToPlay(false)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-sm relative animate-fade-in"
            style={{ 
              padding: '24px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowHowToPlay(false)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={18} color={textTertiary} />
            </button>
            
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ 
                color: textPrimary,
                fontFamily: "'Fredoka', 'Nunito', sans-serif",
              }}
            >
              How to play
            </h3>
            
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={i}
                  className="flex items-center gap-3 py-3"
                  style={{ 
                    borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: '#F8F4EF' }}
                  >
                    <StepIcon size={18} color={brandColor} />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold" style={{ color: textPrimary }}>
                      {step.title}
                    </p>
                    <p className="text-[12px]" style={{ color: textTertiary }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Selection */}
      <div className="mb-5">
        <CategoryPicker 
          selected={gameState.selectedCategory} 
          onChange={setCategory} 
        />
      </div>

      {/* Difficulty Toggle */}
      <div className="mb-6">
        <DifficultyToggle 
          difficulty={gameState.difficulty} 
          onChange={setDifficulty} 
        />
      </div>

      {/* API Status */}
      {!isApiReady && (
        <div 
          className="flex items-start gap-3 p-4 rounded-2xl text-sm mb-5"
          style={{ background: '#F8F4EF' }}
        >
          <Info size={18} className="flex-shrink-0 mt-0.5" color={textSecondary} />
          <div>
            <p className="font-semibold mb-0.5 text-[13px]" style={{ color: textPrimary }}>Demo Mode</p>
            <p style={{ color: textTertiary }} className="text-xs">
              Playing with curated words. Add your Gemini API key to unlock AI.
            </p>
          </div>
        </div>
      )}

      {/* Start Button */}
      <button
        onClick={onStart}
        onMouseEnter={() => setIsHoveredStart(true)}
        onMouseLeave={() => setIsHoveredStart(false)}
        className="w-full rounded-2xl font-semibold text-base transition-all duration-200"
        style={{
          padding: '16px',
          background: brandColor,
          color: '#fff',
          border: 'none',
          fontFamily: "'Fredoka', 'Nunito', 'DM Sans', sans-serif",
          fontSize: 16,
          opacity: isHoveredStart ? 0.92 : 1,
          transform: isHoveredStart ? 'translateY(-1px)' : 'none',
          boxShadow: isHoveredStart 
            ? '0 8px 24px rgba(182,119,206,0.35)'
            : '0 4px 16px rgba(182,119,206,0.25)',
        }}
      >
        Start Playing
      </button>

      <p 
        className="text-xs text-center mt-4"
        style={{ color: textTertiary, fontStyle: 'italic' }}
      >
        One word at a time.
      </p>
    </div>
  );
}
