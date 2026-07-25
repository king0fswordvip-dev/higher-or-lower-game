"use client";

import { GameState } from '@/types/game';
import { GameCard } from './GameCard';
import { ScoreBar } from './ScoreBar';
import { RoundHeader } from './RoundHeader';
import { RevealPanel } from './RevealPanel';
import { GameOverModal } from './GameOverModal';
import { getRoundResult } from '@/lib/game/engine';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GameScreenProps {
  state: GameState;
  isRevealing: boolean;
  onSelect: (side: 'left' | 'right') => void;
  onRestart: () => void;
  onHome: () => void;
}

export function GameScreen({
  state,
  isRevealing,
  onSelect,
  onRestart,
  onHome,
}: GameScreenProps) {
  if (!state.leftObject || !state.rightObject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const isRevealed = state.status === 'reveal' || state.status === 'gameover';

  let result = null;
  if (isRevealed && state.selectedSide) {
    result = getRoundResult(state.leftObject, state.rightObject, state.selectedSide);
  }

  const leftWins = state.leftObject.value > state.rightObject.value;
  const isTie = state.leftObject.value === state.rightObject.value;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md px-4 pt-4 pb-2">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onHome}
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <ScoreBar
            streak={state.streak}
            bestStreak={state.bestStreak}
            round={state.round}
          />
          <div className="w-10" /> {/* Spacer for balance */}
        </div>

        <RoundHeader
          round={state.round}
          valueLabel={state.leftObject.valueLabel}
        />
      </div>

      {/* Cards */}
      <div className="flex-1 flex flex-col justify-center px-4 py-4 gap-4 max-w-lg mx-auto w-full">
        <div className="grid grid-cols-2 gap-3">
          <GameCard
            object={state.leftObject}
            side="left"
            isRevealed={isRevealed}
            isSelected={state.selectedSide === 'left'}
            isCorrect={result?.isCorrect ?? null}
            onSelect={() => onSelect('left')}
            disabled={isRevealing || state.status !== 'playing'}
            isWinner={isRevealed ? (isTie ? true : leftWins) : false}
          />

          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-500">VS</span>
            </div>
          </div>

          <GameCard
            object={state.rightObject}
            side="right"
            isRevealed={isRevealed}
            isSelected={state.selectedSide === 'right'}
            isCorrect={result?.isCorrect ?? null}
            onSelect={() => onSelect('right')}
            disabled={isRevealing || state.status !== 'playing'}
            isWinner={isRevealed ? (isTie ? true : !leftWins) : false}
          />
        </div>

        {/* Reveal Panel */}
        <AnimatePresence>
          {isRevealed && result && (
            <RevealPanel result={result} />
          )}
        </AnimatePresence>

        {/* Hint text */}
        {!isRevealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-gray-400 font-medium"
          >
            Tap a card to choose
          </motion.p>
        )}
      </div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {state.status === 'gameover' && (
          <GameOverModal
            state={state}
            onRestart={onRestart}
            onHome={onHome}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
