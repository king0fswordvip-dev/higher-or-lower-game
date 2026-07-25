import { GameObject, GameState, RoundResult } from '@/types/game';
import { gameObjects } from '@/data/gameObjects';

// ─── Constants ──────────────────────────────────────────────
const STORAGE_KEY = 'hol-game-progress';
const MAX_VISITED_HISTORY = 50;

// ─── Helpers ────────────────────────────────────────────────

/**
 * Safe localStorage wrapper
 */
export function safeStorage<T>(key: string, value?: T): T | null {
  try {
    if (typeof window === 'undefined') return null;
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    }
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Format large numbers for display
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString();
}

/**
 * Get difficulty based on current round
 */
export function getDifficultyForRound(round: number): 'easy' | 'medium' | 'hard' {
  if (round <= 3) return 'easy';
  if (round <= 7) return 'medium';
  return 'hard';
}

/**
 * Get objects filtered by difficulty
 */
export function getObjectsByDifficulty(
  difficulty: 'easy' | 'medium' | 'hard',
  excludeIds: string[] = []
): GameObject[] {
  const filtered = gameObjects.filter(
    (obj) =>
      obj.popularityLevel === difficulty && !excludeIds.includes(obj.id)
  );
  return filtered;
}

/**
 * Get a random object from a list
 */
export function getRandomObject(list: GameObject[]): GameObject | null {
  if (list.length === 0) return null;
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Get next challenger based on difficulty and the "loser" object
 * Logic: pick an object with value close to the loser to make it interesting
 */
export function getNextChallenger(
  loser: GameObject,
  visitedIds: string[],
  round: number
): GameObject | null {
  const difficulty = getDifficultyForRound(round);

  // Try same difficulty first
  let candidates = getObjectsByDifficulty(difficulty, visitedIds);

  // If not enough, include easier/harder
  if (candidates.length < 5) {
    const allLevels: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    const otherLevels = allLevels.filter((l) => l !== difficulty);
    for (const level of otherLevels) {
      const more = getObjectsByDifficulty(level, visitedIds);
      candidates = [...candidates, ...more];
    }
  }

  if (candidates.length === 0) {
    // Fallback: reset visited and try again
    candidates = gameObjects.filter((obj) => obj.id !== loser.id);
  }

  // Sort by how close their value is to the loser (ascending difference)
  // For harder rounds, make it closer (smaller difference)
  const closenessWeight = round > 7 ? 0.3 : round > 3 ? 0.6 : 1.0;

  candidates.sort((a, b) => {
    const diffA = Math.abs(a.value - loser.value);
    const diffB = Math.abs(b.value - loser.value);
    return diffA - diffB;
  });

  // Pick from top candidates with some randomness
  const topCandidates = candidates.slice(0, Math.max(5, Math.floor(candidates.length * closenessWeight)));
  return getRandomObject(topCandidates);
}

/**
 * Build the first round
 */
export function buildFirstRound(): { left: GameObject; right: GameObject } | null {
  const easyObjects = getObjectsByDifficulty('easy');
  if (easyObjects.length < 2) return null;

  // Pick two different easy objects with a reasonable gap
  const shuffled = [...easyObjects].sort(() => Math.random() - 0.5);
  const left = shuffled[0];
  let right = shuffled[1];

  // Ensure they're not too close for the first round
  let attempts = 0;
  while (Math.abs(left.value - right.value) / Math.max(left.value, right.value) < 0.2 && attempts < 10) {
    right = shuffled[(shuffled.indexOf(right) + 1) % shuffled.length];
    attempts++;
  }

  return { left, right };
}

/**
 * Build subsequent round keeping the loser
 */
export function buildNextRound(
  loser: GameObject,
  visitedIds: string[],
  round: number
): { left: GameObject; right: GameObject } | null {
  const challenger = getNextChallenger(loser, visitedIds, round);
  if (!challenger) return null;

  // Randomly assign loser to left or right
  const isLeft = Math.random() > 0.5;
  return {
    left: isLeft ? loser : challenger,
    right: isLeft ? challenger : loser,
  };
}

/**
 * Check if the selected side is correct
 */
export function isCorrectChoice(
  left: GameObject,
  right: GameObject,
  selectedSide: 'left' | 'right'
): boolean {
  const leftWins = left.value > right.value;
  if (left.value === right.value) return true; // tie = win
  if (selectedSide === 'left') return leftWins;
  return !leftWins;
}

/**
 * Get round result details
 */
export function getRoundResult(
  left: GameObject,
  right: GameObject,
  selectedSide: 'left' | 'right'
): RoundResult {
  const leftWins = left.value > right.value;
  const winner: 'left' | 'right' = leftWins ? 'left' : 'right';
  const loser: 'left' | 'right' = leftWins ? 'right' : 'left';
  const isCorrect = selectedSide === winner;

  return {
    winner,
    loser,
    leftValue: left.value,
    rightValue: right.value,
    difference: Math.abs(left.value - right.value),
    isCorrect,
  };
}

/**
 * Get the losing object
 */
export function getLoserObject(
  left: GameObject,
  right: GameObject
): GameObject {
  return left.value <= right.value ? left : right;
}

/**
 * Save progress to localStorage
 */
export function saveProgress(bestStreak: number): void {
  safeStorage(STORAGE_KEY, { bestStreak, lastSaved: Date.now() });
}

/**
 * Load progress from localStorage
 */
export function loadProgress(): { bestStreak: number } {
  const data = safeStorage<{ bestStreak: number }>(STORAGE_KEY);
  return data || { bestStreak: 0 };
}

/**
 * Reset progress
 */
export function resetProgress(): void {
  safeStorage(STORAGE_KEY, { bestStreak: 0, lastSaved: Date.now() });
}

/**
 * Get all unique categories
 */
export function getCategories(): string[] {
  const cats = new Set(gameObjects.map((obj) => obj.category));
  return Array.from(cats);
}

/**
 * Get objects by category
 */
export function getObjectsByCategory(category: string): GameObject[] {
  return gameObjects.filter((obj) => obj.category === category);
}

/**
 * Initial game state
 */
export function createInitialState(): GameState {
  const progress = loadProgress();
  return {
    status: 'idle',
    round: 0,
    streak: 0,
    bestStreak: progress.bestStreak,
    leftObject: null,
    rightObject: null,
    selectedSide: null,
    isCorrect: null,
    visitedIds: [],
    difficulty: 'easy',
  };
}

/**
 * Start a new game
 */
export function startGame(): { state: GameState; roundData: { left: GameObject; right: GameObject } | null } {
  const firstRound = buildFirstRound();
  if (!firstRound) {
    return { state: createInitialState(), roundData: null };
  }

  const progress = loadProgress();
  const state: GameState = {
    status: 'playing',
    round: 1,
    streak: 0,
    bestStreak: progress.bestStreak,
    leftObject: firstRound.left,
    rightObject: firstRound.right,
    selectedSide: null,
    isCorrect: null,
    visitedIds: [firstRound.left.id, firstRound.right.id],
    difficulty: 'easy',
  };

  return { state, roundData: firstRound };
}

/**
 * Handle answer selection
 */
export function handleAnswer(
  state: GameState,
  selectedSide: 'left' | 'right'
): {
  newState: GameState;
  result: RoundResult | null;
  nextRoundData: { left: GameObject; right: GameObject } | null;
} {
  if (!state.leftObject || !state.rightObject || state.status !== 'playing') {
    return { newState: state, result: null, nextRoundData: null };
  }

  const result = getRoundResult(state.leftObject, state.rightObject, selectedSide);

  if (!result.isCorrect) {
    // Game over
    const newBestStreak = Math.max(state.streak, state.bestStreak);
    saveProgress(newBestStreak);

    const newState: GameState = {
      ...state,
      status: 'gameover',
      selectedSide,
      isCorrect: false,
      bestStreak: newBestStreak,
    };

    return { newState, result, nextRoundData: null };
  }

  // Correct answer - reveal state first
  const revealState: GameState = {
    ...state,
    status: 'reveal',
    selectedSide,
    isCorrect: true,
    streak: state.streak + 1,
  };

  // Prepare next round
  const loser = getLoserObject(state.leftObject, state.rightObject);
  const nextRound = buildNextRound(loser, revealState.visitedIds, revealState.round + 1);

  return {
    newState: revealState,
    result,
    nextRoundData: nextRound,
  };
}

/**
 * Advance to next round after reveal
 */
export function advanceToNextRound(
  state: GameState,
  nextRoundData: { left: GameObject; right: GameObject }
): GameState {
  const newVisited = [...state.visitedIds, nextRoundData.left.id, nextRoundData.right.id];

  // Trim visited history to prevent memory bloat
  const trimmedVisited = newVisited.slice(-MAX_VISITED_HISTORY);

  return {
    ...state,
    status: 'playing',
    round: state.round + 1,
    leftObject: nextRoundData.left,
    rightObject: nextRoundData.right,
    selectedSide: null,
    isCorrect: null,
    visitedIds: trimmedVisited,
    difficulty: getDifficultyForRound(state.round + 1),
  };
}

/**
 * Restart game
 */
export function restartGame(): { state: GameState; roundData: { left: GameObject; right: GameObject } | null } {
  return startGame();
}
