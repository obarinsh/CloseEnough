import type { UserStats } from '@/lib/types';

interface ScoreStreakProps {
  stats: UserStats;
  compact?: boolean;
}

export function ScoreStreak({ stats }: ScoreStreakProps) {
  const brandColor = '#b677ce';
  const textSecondary = '#999';
  
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
    </div>
  );
}
