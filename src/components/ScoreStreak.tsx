import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import type { UserStats } from '@/lib/types';

interface ScoreStreakProps {
  stats: UserStats;
  compact?: boolean;
  onReset?: () => void;
}

export function ScoreStreak({ stats, onReset }: ScoreStreakProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const brandColor = '#b677ce';
  const textSecondary = '#999';
  
  const handleResetClick = () => {
    if (showConfirm) {
      onReset?.();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };
  
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ 
          fontSize: 10, 
          letterSpacing: 1, 
          textTransform: 'uppercase', 
          color: textSecondary, 
          marginBottom: 1,
          fontFamily: "'Fredoka', 'Nunito', sans-serif",
          fontWeight: 500,
        }}>
          Score
        </p>
        <p style={{ 
          fontSize: 17, 
          fontWeight: 600, 
          color: brandColor,
          fontFamily: "'Fredoka', 'Nunito', sans-serif",
        }}>
          {stats.totalScore}
        </p>
      </div>
      <div style={{ width: 1, height: 24, background: 'rgba(0,0,0,0.08)' }} />
      <div style={{ textAlign: 'center' }}>
        <p style={{ 
          fontSize: 10, 
          letterSpacing: 1, 
          textTransform: 'uppercase', 
          color: textSecondary, 
          marginBottom: 1,
          fontFamily: "'Fredoka', 'Nunito', sans-serif",
          fontWeight: 500,
        }}>
          Streak
        </p>
        <p style={{ 
          fontSize: 17, 
          fontWeight: 600, 
          color: brandColor,
          fontFamily: "'Fredoka', 'Nunito', sans-serif",
        }}>
          {stats.currentStreak}
        </p>
      </div>
      {onReset && (
        <>
          <div style={{ width: 1, height: 24, background: 'rgba(0,0,0,0.08)' }} />
          <button
            onClick={handleResetClick}
            title={showConfirm ? "Click again to confirm reset" : "Reset progress"}
            style={{
              background: showConfirm ? '#FEF0ED' : 'transparent',
              border: 'none',
              padding: 6,
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <RotateCcw 
              size={14} 
              color={showConfirm ? '#D1242F' : textSecondary}
              style={{ 
                transition: 'transform 0.2s',
                transform: showConfirm ? 'rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </>
      )}
    </div>
  );
}
