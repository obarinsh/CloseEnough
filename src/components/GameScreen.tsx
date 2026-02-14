import { useEffect, useRef } from 'react';
import { Info, AlertTriangle, Loader, HelpCircle } from 'lucide-react';
import { useGame } from '@/context/GameContext';
import { WordCard } from './WordCard';
import { ExplanationInput } from './ExplanationInput';
import { FeedbackDisplay } from './FeedbackDisplay';

export function GameScreen() {
  const { 
    gameState, 
    error,
    isApiReady,
    startNewRound, 
    submitExplanation 
  } = useGame();

  // Track if we've already started to prevent double-calling
  const hasStartedRef = useRef(false);

  // Start first round on mount
  useEffect(() => {
    if (!hasStartedRef.current && gameState.phase === 'loading' && !gameState.currentWord) {
      hasStartedRef.current = true;
      startNewRound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.phase, gameState.currentWord]);

  const { phase, currentWord, rating, userExplanation, difficulty } = gameState;
  
  const brandColor = '#b677ce';
  const textPrimary = '#2D2D2F';
  const textSecondary = '#6E6E73';
  const textTertiary = '#AEAEB2';

  return (
    <div className="space-y-5">
      {/* API Status Warning */}
      {!isApiReady && (
        <div 
          className="flex items-start gap-3 p-4 rounded-2xl text-sm"
          style={{ background: '#F8F4EF' }}
        >
          <Info size={16} className="flex-shrink-0 mt-0.5" color={textSecondary} />
          <p style={{ color: textSecondary }}>
            <strong>Demo Mode:</strong> Add your Gemini API key to unlock AI features.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div 
          className="flex items-start gap-3 p-4 rounded-2xl text-sm"
          style={{ background: '#FEF0ED' }}
        >
          <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" color="#E8654A" />
          <p style={{ color: '#E8654A' }}>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {phase === 'loading' && (
        <div className="py-16 flex flex-col items-center justify-center">
          <Loader size={32} className="mb-4 animate-spin" color={brandColor} />
          <p 
            className="text-sm"
            style={{ color: textSecondary }}
          >
            Finding a word for you...
          </p>
        </div>
      )}

      {/* Explaining Phase */}
      {phase === 'explaining' && currentWord && (
        <div className="space-y-5 animate-fade-in">
          <WordCard word={currentWord} difficulty={difficulty} isRevealing />
          
          <div className="space-y-3">
            <div className="text-center">
              <h2 
                style={{ 
                  fontFamily: "'Fredoka', 'Nunito', sans-serif",
                  fontWeight: 500,
                  fontSize: '1.15rem',
                  color: textPrimary,
                  marginBottom: 4,
                }}
              >
                Explain it in your own words
              </h2>
              <p 
                className="text-[13px]"
                style={{ color: textTertiary, fontStyle: 'italic' }}
              >
                Don't overthink it — just write what you think it means!
              </p>
            </div>
            <ExplanationInput onSubmit={submitExplanation} />
          </div>
        </div>
      )}

      {/* Rating Phase (Loading) */}
      {phase === 'rating' && currentWord && (
        <div className="space-y-5">
          <WordCard word={currentWord} difficulty={difficulty} />
          
          <div className="py-12 flex flex-col items-center justify-center">
            <HelpCircle size={28} className="mb-4 animate-pulse" color={brandColor} />
            <p className="text-sm" style={{ color: textSecondary }}>
              Checking your explanation...
            </p>
          </div>
        </div>
      )}

      {/* Feedback Phase */}
      {phase === 'feedback' && currentWord && rating && (
        <FeedbackDisplay
          word={currentWord}
          rating={rating}
          userExplanation={userExplanation}
          onNext={startNewRound}
        />
      )}
    </div>
  );
}
