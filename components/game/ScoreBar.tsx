"use client";

import { motion } from 'framer-motion';
import { Trophy, Zap, Hash } from 'lucide-react';

interface ScoreBarProps {
  streak: number;
  bestStreak: number;
  round: number;
}

export function ScoreBar({ streak, bestStreak, round }: ScoreBarProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-sm">
      {/* Round */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Hash className="w-4 h-4 text-gray-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Round</span>
          <span className="text-sm font-bold text-gray-900 leading-none">{round}</span>
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <Zap className="w-4 h-4 text-amber-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Streak</span>
          <motion.span
            key={streak}
            initial={{ scale: 1.3, color: '#f59e0b' }}
            animate={{ scale: 1, color: '#111827' }}
            className="text-sm font-bold text-gray-900 leading-none"
          >
            {streak}
          </motion.span>
        </div>
      </div>

      {/* Best Streak */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <Trophy className="w-4 h-4 text-yellow-600" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Best</span>
          <span className="text-sm font-bold text-gray-900 leading-none">{bestStreak}</span>
        </div>
      </div>
    </div>
  );
}
