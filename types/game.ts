export interface GameObject {
  id: string;
  name: string;
  description: string;
  category: string;
  value: number;
  valueLabel: string;
  tags: string[];
  image: string;
  popularityLevel: 'easy' | 'medium' | 'hard';
}

export type GameStatus = 'idle' | 'playing' | 'reveal' | 'gameover';

export interface GameState {
  status: GameStatus;
  round: number;
  streak: number;
  bestStreak: number;
  leftObject: GameObject | null;
  rightObject: GameObject | null;
  selectedSide: 'left' | 'right' | null;
  isCorrect: boolean | null;
  visitedIds: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface RoundResult {
  winner: 'left' | 'right';
  loser: 'left' | 'right';
  leftValue: number;
  rightValue: number;
  difference: number;
  isCorrect: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  streak: number;
  date: string;
  category?: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}
