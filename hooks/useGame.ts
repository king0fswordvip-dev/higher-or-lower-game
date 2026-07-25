"use client";

import { useState, useCallback, useEffect } from 'react';
import { GameState, GameObject, RoundResult } from '@/types/game';
import {
  createInitialState,
  startGame,
  handleAnswer,
  advanceToNextRound,
  restartGame,
  loadProgress,
} from '@/lib/game/engine';

const REVEAL_DELAY_MS = 1500;

export function useGame() {
  const [state, setState] = useState<GameState>(createInitialState);
  const [nextRoundData, setNextRoundData] = useState<{ left: GameObject; right: GameObject } | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  // Load best streak on mount
  useEffect(() => {
    const progress = loadProgress();
    setState((prev) => ({ ...prev, bestStreak: progress.bestStreak }));
  }, []);

  const start = useCallback(() => {
    const { state: newState, roundData } = startGame();
    if (roundData) {
      setState(newState);
      setNextRoundData(null);
      setIsRevealing(false);
    }
  }, []);

  const selectAnswer = useCallback(
    (side: 'left' | 'right') => {
      if (state.status !== 'playing' || isRevealing) return;

      const { newState, result, nextRoundData: nextRound } = handleAnswer(state, side);

      if (!result) return;

      setState(newState);
      setIsRevealing(true);

      if (result.isCorrect && nextRound) {
        setNextRoundData(nextRound);
        // Auto-advance after reveal delay
        setTimeout(() => {
          setState((prev) => advanceToNextRound(prev, nextRound));
          setNextRoundData(null);
          setIsRevealing(false);
        }, REVEAL_DELAY_MS);
      } else if (!result.isCorrect) {
        // Game over - stay on gameover screen
        setTimeout(() => {
          setIsRevealing(false);
        }, REVEAL_DELAY_MS);
      }
    },
    [state, isRevealing]
  );

  const restart = useCallback(() => {
    const { state: newState, roundData } = restartGame();
    if (roundData) {
      setState(newState);
      setNextRoundData(null);
      setIsRevealing(false);
    }
  }, []);

  const goHome = useCallback(() => {
    setState(createInitialState);
    setNextRoundData(null);
    setIsRevealing(false);
  }, []);

  return {
    state,
    isRevealing,
    start,
    selectAnswer,
    restart,
    goHome,
  };
}
