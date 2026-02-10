import { useState } from 'react';
import { Check, X, Lightbulb } from 'lucide-react';
import type { Rating, Word } from '@/lib/types';
import { StarRating } from './StarRating';
import { getCategoryInfo } from '@/lib/types';
import { CategoryIcon } from './CategoryIcon';

interface FeedbackDisplayProps {
  word: Word;
  rating: Rating;
  userExplanation: string;
  onNext: () => void;
}

export function FeedbackDisplay({ word, rating, userExplanation, onNext }: FeedbackDisplayProps) {
  const category = getCategoryInfo(word.category);
  const [isHoveredNext, setIsHoveredNext] = useState(false);

  const brandColor = '#b677ce';
  const textPrimary = '#2D2D2F';
  const textSecondary = '#6E6E73';
  const textTertiary = '#AEAEB2';
  const warmBg = '#F8F4EF';
  const successBg = '#EDFCF0';
  const successColor = '#22863A';
  const errorBg = '#FEF0ED';
  const errorColor = '#D1242F';

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Score Section */}
      <div className="text-center py-6">
        <div className="flex justify-center mb-4">
          <StarRating rating={rating.stars} size="lg" animated />
        </div>
        
        <p 
          style={{ 
            fontFamily: "'Fredoka', 'Nunito', sans-serif",
            fontWeight: 600,
            fontSize: '1.5rem',
            color: textPrimary, 
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          {rating.stars === 5 && "Perfect!"}
          {rating.stars === 4 && "Almost there!"}
          {rating.stars === 3 && "Close enough!"}
          {rating.stars === 2 && "Getting warmer!"}
          {rating.stars === 1 && "Nice try!"}
        </p>
        
        <p className="text-[13px]" style={{ color: textSecondary, fontStyle: 'italic' }}>
          {rating.encouragement}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'rgba(0,0,0,0.05)' }} />

      {/* What You Said */}
      <div>
        <p 
          className="text-[11px] tracking-[1px] uppercase font-bold mb-2"
          style={{ color: textTertiary, fontFamily: "'Fredoka', 'Nunito', sans-serif" }}
        >
          Your Explanation
        </p>
        <p 
          className="text-[14px] italic leading-relaxed"
          style={{ color: textSecondary }}
        >
          "{userExplanation}"
        </p>
      </div>

      {/* What You Got Right */}
      {rating.whatYouGotRight.length > 0 && (
        <div 
          className="rounded-2xl p-4 animate-slide-up opacity-0 animation-delay-100"
          style={{ 
            background: successBg,
            animationFillMode: 'forwards',
          }}
        >
          <p 
            className="text-[13px] font-bold mb-2.5 flex items-center gap-1.5"
            style={{ color: successColor, fontFamily: "'Fredoka', 'Nunito', sans-serif" }}
          >
            <Check size={14} strokeWidth={3} />
            What you got right
          </p>
          <ul className="space-y-1.5">
            {rating.whatYouGotRight.map((item, i) => (
              <li 
                key={i} 
                className="flex items-start gap-2 text-[13px]"
                style={{ color: textPrimary }}
              >
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: successColor }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* What You Missed */}
      {rating.whatYouMissed.length > 0 && (
        <div 
          className="rounded-2xl p-4 animate-slide-up opacity-0 animation-delay-200"
          style={{ 
            background: errorBg,
            animationFillMode: 'forwards',
          }}
        >
          <p 
            className="text-[13px] font-bold mb-2.5 flex items-center gap-1.5"
            style={{ color: errorColor, fontFamily: "'Fredoka', 'Nunito', sans-serif" }}
          >
            <X size={14} strokeWidth={3} />
            What you missed
          </p>
          <ul className="space-y-1.5">
            {rating.whatYouMissed.map((item, i) => (
              <li 
                key={i} 
                className="flex items-start gap-2 text-[13px]"
                style={{ color: textPrimary }}
              >
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: errorColor }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Full Definition */}
      <div 
        className="rounded-2xl p-4 animate-slide-up opacity-0 animation-delay-300"
        style={{ 
          background: warmBg,
          animationFillMode: 'forwards',
        }}
      >
        <p 
          className="text-[13px] font-bold mb-2.5 flex items-center gap-1.5"
          style={{ color: brandColor, fontFamily: "'Fredoka', 'Nunito', sans-serif" }}
        >
          <Lightbulb size={14} />
          The full picture
        </p>
        
        <div className="flex items-center gap-2 mb-2.5">
          <span 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[13px] font-semibold"
            style={{
              background: '#fff',
              color: textPrimary,
            }}
          >
            <CategoryIcon icon={category.icon} size={13} />
            {word.word}
          </span>
        </div>
        
        <p 
          className="text-[13px] leading-relaxed"
          style={{ color: textSecondary }}
        >
          {rating.fullExplanation}
        </p>
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        onMouseEnter={() => setIsHoveredNext(true)}
        onMouseLeave={() => setIsHoveredNext(false)}
        className="w-full py-4 rounded-2xl font-semibold text-[15px] transition-all duration-200 animate-slide-up opacity-0 animation-delay-400"
        style={{ 
          background: brandColor,
          color: '#fff',
          border: 'none',
          fontFamily: "'Fredoka', 'Nunito', 'DM Sans', sans-serif",
          opacity: isHoveredNext ? 0.92 : 1,
          transform: isHoveredNext ? 'translateY(-1px)' : 'none',
          boxShadow: isHoveredNext 
            ? '0 8px 24px rgba(182,119,206,0.35)'
            : '0 4px 16px rgba(182,119,206,0.25)',
          animationFillMode: 'forwards',
        }}
      >
        Next Word
      </button>
    </div>
  );
}
