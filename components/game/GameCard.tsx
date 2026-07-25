"use client";

import { motion } from 'framer-motion';
import { GameObject } from '@/types/game';
import { formatNumber } from '@/lib/game/engine';
import { ImageOff } from 'lucide-react';
import { useState } from 'react';

interface GameCardProps {
  object: GameObject;
  side: 'left' | 'right';
  isRevealed: boolean;
  isSelected: boolean;
  isCorrect: boolean | null;
  onSelect: () => void;
  disabled: boolean;
  isWinner: boolean;
}

export function GameCard({
  object,
  side,
  isRevealed,
  isSelected,
  isCorrect,
  onSelect,
  disabled,
  isWinner,
}: GameCardProps) {
  const [imgError, setImgError] = useState(false);

  const borderColor = isRevealed
    ? isWinner
      ? 'border-success'
      : isSelected && !isCorrect
      ? 'border-danger'
      : 'border-gray-300'
    : isSelected
    ? 'border-primary-500'
    : 'border-gray-200';

  const bgColor = isRevealed
    ? isWinner
      ? 'bg-green-50'
      : isSelected && !isCorrect
      ? 'bg-red-50'
      : 'bg-gray-50'
    : 'bg-white';

  return (
    <motion.div
      className={`relative flex flex-col rounded-2xl border-2 ${borderColor} ${bgColor} overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-[0.98]`}
      onClick={!disabled ? onSelect : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        {!imgError ? (
          <img
            src={object.image}
            alt={object.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <ImageOff className="w-12 h-12 text-gray-400" />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
          <span className="text-xs font-medium text-white capitalize">
            {object.category}
          </span>
        </div>

        {/* Winner/Loser badge */}
        {isRevealed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${
              isWinner
                ? 'bg-success text-white'
                : 'bg-danger text-white'
            }`}
          >
            {isWinner ? 'HIGHER' : 'LOWER'}
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 gap-1 flex-1">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {object.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {object.description}
        </p>

        {/* Value display */}
        <div className="mt-auto pt-3">
          {isRevealed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <div className="text-2xl font-black text-gray-900">
                {formatNumber(object.value)}
              </div>
              <div className="text-xs text-gray-500 font-medium">
                {object.valueLabel}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="h-8 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-3 bg-gray-100 rounded w-2/3 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Selection overlay */}
      {isSelected && !isRevealed && (
        <motion.div
          className="absolute inset-0 bg-primary-500/10 border-2 border-primary-500 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
}
