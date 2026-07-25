"use client";

import { motion } from 'framer-motion';
import { ArrowUpDown } from 'lucide-react';

interface RoundHeaderProps {
  round: number;
  valueLabel: string;
}

export function RoundHeader({ round, valueLabel }: RoundHeaderProps) {
  return (
    <motion.div
      key={round}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-1"
    >
      <div className="flex items-center justify-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-primary-500" />
        <span className="text-xs font-semibold uppercase tracking-widest text-primary-600">
          Which has more?
        </span>
      </div>
      <h2 className="text-sm font-medium text-gray-600">
        {valueLabel}
      </h2>
    </motion.div>
  );
}
