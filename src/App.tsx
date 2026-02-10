import { useState } from 'react';
import { GameProvider, useGame } from '@/context/GameContext';
import { Logo } from '@/components/Logo';
import { StartScreen } from '@/components/StartScreen';
import { GameScreen } from '@/components/GameScreen';
import { ScoreStreak } from '@/components/ScoreStreak';
import { BackgroundPattern } from '@/components/BackgroundPattern';

type Screen = 'start' | 'game';

function AppContent() {
  const [screen, setScreen] = useState<Screen>('start');
  const { stats } = useGame();

  const handleStart = () => {
    setScreen('game');
  };

  const handleBackToStart = () => {
    setScreen('start');
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center"
      style={{ 
        background: '#F2E8D9',
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        position: 'relative',
      }}
    >
      {/* Playful background pattern */}
      <BackgroundPattern />

      {/* Main Content Card */}
      <main 
        className="w-full flex-1 flex flex-col"
        style={{ 
          maxWidth: 480, 
          padding: '16px 16px 32px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div 
          className="bg-white rounded-3xl flex-1 flex flex-col"
          style={{
            boxShadow: '0 2px 24px rgba(0, 0, 0, 0.06)',
          }}
        >
          {/* Header - inside the card */}
          <header 
            className="w-full flex justify-between items-center"
            style={{ 
              padding: '20px 24px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
            }}
          >
            <button 
              onClick={handleBackToStart}
              className="hover:opacity-80 transition-opacity"
            >
              <Logo size="md" showText={true} />
            </button>
            
            <ScoreStreak stats={stats} compact />
          </header>

          {/* Content */}
          <div style={{ padding: '24px 24px 32px', flex: 1 }}>
            {screen === 'start' && <StartScreen onStart={handleStart} />}
            {screen === 'game' && <GameScreen />}
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default App;
