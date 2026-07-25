"use client";

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { RoundResult } from '@/types/game';
import { formatNumber } from '@/lib/game/engine';

interface RevealPanelProps {
  result: RoundResult;
}

export function RevealPanel({ result }: RevealPanelProps) {
  const isCorrect = result.isCorrect;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full rounded-2xl p-4 text-center border-2 ${
        isCorrect
          ? 'bg-green-50 border-success'
          : 'bg-red-50 border-danger'
      }`}
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        {isCorrect ? (
          <CheckCircle2 className="w-6 h-6 text-success" />
        ) : (
          <XCircle className="w-6 h-6 text-danger" />
        )}
        <span
          className={`text-lg font-bold ${
            isCorrect ? 'text-success' : 'text-danger'
          }`}
        >
          {isCorrect ? 'Correct!' : 'Wrong!'}
        </span>
      </div>

      {isCorrect && (
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <span>Next round starting</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </div>
      )}

      {!isCorrect && (
        <div className="text-sm text-gray-600">
          Difference:{' '}
          <span className="font-bold text-gray-900">
            {formatNumber(result.difference)}
          </span>
        </div>
      )}
    </motion.div>
  );
}
