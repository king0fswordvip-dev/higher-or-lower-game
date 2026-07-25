"use client";

import { motion } from 'framer-motion';
import { Play, Calendar, Trophy, HelpCircle, ArrowUpDown, TrendingUp, Users, Sparkles } from 'lucide-react';

interface HomeScreenProps {
  onPlay: () => void;
  onHowToPlay: () => void;
  bestStreak: number;
}

export function HomeScreen({ onPlay, onHowToPlay, bestStreak }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, delay: 0.1 }}
          className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl flex items-center justify-center shadow-xl mb-6"
        >
          <ArrowUpDown className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-gray-900 tracking-tight"
        >
          Higher or Lower
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 mt-3 max-w-xs mx-auto text-base"
        >
          Can you guess which one has more? Build your streak and beat your best score.
        </motion.p>

        {/* Best Streak Badge */}
        {bestStreak > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-full"
          >
            <Trophy className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-bold text-yellow-700">
              Best Streak: {bestStreak}
            </span>
          </motion.div>
        )}

        {/* Play Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onPlay}
          className="mt-8 w-full max-w-xs py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-3"
        >
          <Play className="w-5 h-5 fill-white" />
          Play Now
        </motion.button>

        {/* Secondary Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 flex gap-3 w-full max-w-xs"
        >
          <button
            onClick={onHowToPlay}
            className="flex-1 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            How to Play
          </button>
        </motion.div>
      </div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="px-6 pb-8"
      >
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          <FeatureCard
            icon={<TrendingUp className="w-5 h-5 text-primary-500" />}
            label="Endless"
          />
          <FeatureCard
            icon={<Users className="w-5 h-5 text-success" />}
            label="80+ Items"
          />
          <FeatureCard
            icon={<Sparkles className="w-5 h-5 text-amber-500" />}
            label="10 Categories"
          />
        </div>
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
      {icon}
      <span className="text-xs font-semibold text-gray-600">{label}</span>
    </div>
  );
}
