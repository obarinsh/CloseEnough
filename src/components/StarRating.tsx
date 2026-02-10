import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  animated = true 
}: StarRatingProps) {
  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 32,
  };

  const gaps = {
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
  };

  const iconSize = iconSizes[size];
  const gapSize = gaps[size];
  const filledColor = '#F5A623';
  const emptyColor = '#D9D9D9';

  return (
    <div className={`flex items-center ${gapSize}`}>
      {Array.from({ length: maxRating }, (_, i) => {
        const isFilled = i < rating;
        const delay = animated ? `${i * 80}ms` : '0ms';

        return (
          <span
            key={i}
            className={`${animated ? 'animate-star-pop opacity-0' : ''}`}
            style={{ 
              animationDelay: delay, 
              animationFillMode: 'forwards',
            }}
          >
            <Star
              size={iconSize}
              fill={isFilled ? filledColor : 'none'}
              color={isFilled ? filledColor : emptyColor}
              strokeWidth={isFilled ? 0 : 1.5}
            />
          </span>
        );
      })}
    </div>
  );
}
