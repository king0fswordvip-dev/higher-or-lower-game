"use client";

import { useState } from 'react';
import { useGame } from '@/hooks/useGame';
import { HomeScreen } from '@/components/game/HomeScreen';
import { GameScreen } from '@/components/game/GameScreen';
import { HowToPlayModal } from '@/components/game/HowToPlayModal';

export default function Home() {
  const { state, isRevealing, start, selectAnswer, restart, goHome } = useGame();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  // Idle state - show home screen
  if (state.status === 'idle') {
    return (
      <>
        <HomeScreen
          onPlay={start}
          onHowToPlay={() => setShowHowToPlay(true)}
          bestStreak={state.bestStreak}
        />
        <HowToPlayModal
          isOpen={showHowToPlay}
          onClose={() => setShowHowToPlay(false)}
        />
      </>
    );
  }

  // Playing, reveal, or gameover - show game screen
  return (
    <GameScreen
      state={state}
      isRevealing={isRevealing}
      onSelect={selectAnswer}
      onRestart={restart}
      onHome={goHome}
    />
  );
}
