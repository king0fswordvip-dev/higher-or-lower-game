"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, MousePointerClick, Trophy, ArrowRight, Zap } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HowToPlayModal({ isOpen, onClose }: HowToPlayModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-center relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <h2 className="text-2xl font-black text-white">How to Play</h2>
            </div>

            {/* Steps */}
            <div className="p-6 space-y-5">
              <Step
                icon={<MousePointerClick className="w-5 h-5 text-primary-600" />}
                title="Compare Two Items"
                description="Each round shows two items. Guess which one has the higher number."
              />
              <Step
                icon={<Zap className="w-5 h-5 text-amber-500" />}
                title="Build Your Streak"
                description="Get it right and your streak goes up. The loser stays for the next round."
              />
              <Step
                icon={<ArrowRight className="w-5 h-5 text-success" />}
                title="It Gets Harder"
                description="As your streak grows, the numbers get closer and closer."
              />
              <Step
                icon={<Trophy className="w-5 h-5 text-yellow-500" />}
                title="Beat Your Best"
                description="Try to get the longest streak possible. Your best is saved automatically."
              />
            </div>

            {/* CTA */}
            <div className="p-6 pt-0">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-colors"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Step({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}
