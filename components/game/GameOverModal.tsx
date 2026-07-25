"use client";

import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Home, Flame, Target } from 'lucide-react';
import { GameState } from '@/types/game';

interface GameOverModalProps {
  state: GameState;
  onRestart: () => void;
  onHome: () => void;
}

export function GameOverModal({ state, onRestart, onHome }: GameOverModalProps) {
  const isNewBest = state.streak > 0 && state.streak >= state.bestStreak;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-red-500 to-orange-500 p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 mx-auto mb-3 bg-white rounded-full flex items-center justify-center shadow-lg"
          >
            <Flame className="w-8 h-8 text-red-500" />
          </motion.div>
          <h2 className="text-2xl font-black text-white">Game Over</h2>
          <p className="text-white/80 text-sm mt-1">
            You made it to round {state.round}
          </p>
        </div>

        {/* Stats */}
        <div className="p-6 space-y-4">
          {/* Streak */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Streak</p>
                <p className="text-xl font-black text-gray-900">{state.streak}</p>
              </div>
            </div>
          </div>

          {/* Best Streak */}
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Best Streak</p>
                <p className="text-xl font-black text-gray-900">{state.bestStreak}</p>
              </div>
            </div>
            {isNewBest && (
              <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                NEW!
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onHome}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
