# Higher or Lower - Endless Game

A sleek, mobile-first endless comparison game built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Guess which item has the higher number and build your streak!

## Features

- **Endless Solo Mode** - Play alone, no login required
- **80+ Game Objects** across 10 categories (Sports, Music, Movies, Tech, Gaming, Social Media, Streaming, Brands, Countries, Food, Animals, Cars)
- **Adaptive Difficulty** - Easy rounds first, getting harder as your streak grows
- **Smart Matchmaking** - Loser stays, challenger gets closer in value
- **Local Persistence** - Best streak saved via localStorage
- **Smooth Animations** - Framer Motion powered transitions
- **Mobile-First Design** - Optimized for touch, no zoom, no scroll bounce
- **Zero External APIs** - All data is local, works offline after build

## Tech Stack

- Next.js 15 (App Router, Static Export)
- React 19
- TypeScript 5.7
- Tailwind CSS 3.4
- Framer Motion 11
- Lucide React Icons

## Project Structure

```
higher-or-lower-game/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page (home + game)
│   └── globals.css         # Global styles
├── components/
│   └── game/
│       ├── HomeScreen.tsx       # Landing page
│       ├── GameScreen.tsx       # Main gameplay screen
│       ├── GameCard.tsx         # Individual card component
│       ├── ScoreBar.tsx         # Streak/round/best display
│       ├── RoundHeader.tsx      # "Which has more?" header
│       ├── RevealPanel.tsx      # Correct/Wrong feedback
│       ├── GameOverModal.tsx    # Game over overlay
│       └── HowToPlayModal.tsx   # Tutorial modal
├── lib/
│   └── game/
│       └── engine.ts       # All game logic (state machine, matchmaking, scoring)
├── hooks/
│   └── useGame.ts          # React hook for game state management
├── data/
│   └── gameObjects.ts      # 80+ sample game objects
├── types/
│   └── game.ts             # TypeScript interfaces
├── public/
│   └── images/             # Static images (if needed)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── package.json
```

## Quick Start (Local Development)

### 1. Install Dependencies

```bash
cd higher-or-lower-game
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
```

This creates a static export in the `dist/` folder.

## How to Deploy

### Option A: Deploy to Vercel (Recommended)

#### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Higher or Lower game"

# Create a new repository on GitHub (via web or CLI)
# Then push:
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/higher-or-lower-game.git
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel auto-detects Next.js - keep default settings
5. Click **"Deploy"**
6. Done! Your game is live at `https://your-project.vercel.app`

### Option B: Deploy to Netlify

1. Build the project: `npm run build`
2. Drag the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop)
3. Or connect your GitHub repo to Netlify

### Option C: Deploy to GitHub Pages

1. Update `next.config.ts`:
```ts
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/higher-or-lower-game', // your repo name
  images: { unoptimized: true },
};
```

2. Build and push the `dist` folder to `gh-pages` branch, or use GitHub Actions.

## How to Zip the Project

```bash
# From the parent directory of your project:
zip -r higher-or-lower-game.zip higher-or-lower-game/ -x "*/node_modules/*" -x "*/.next/*" -x "*/dist/*"

# Or using tar:
tar -czvf higher-or-lower-game.tar.gz --exclude="node_modules" --exclude=".next" --exclude="dist" higher-or-lower-game/
```

## Game Rules

1. Each round shows two items (A vs B)
2. Guess which one has the **higher** number
3. Correct → +1 streak, loser stays for next round
4. Wrong → Game Over, see your streak and best streak
5. Streak saves automatically via localStorage

## Customizing Data

Edit `data/gameObjects.ts` to add your own items:

```typescript
{
  id: 'your-id',
  name: 'Item Name',
  description: 'Short description',
  category: 'your-category',
  value: 123456,
  valueLabel: 'What this number means',
  tags: ['tag1', 'tag2'],
  image: 'https://image-url.jpg',
  popularityLevel: 'easy', // 'easy' | 'medium' | 'hard'
}
```

## Game Engine Logic

The core logic lives in `lib/game/engine.ts`:

- `startGame()` - Creates first round with two easy objects
- `handleAnswer()` - Validates choice, updates streak, determines game over
- `getNextChallenger()` - Picks a new object with value close to the loser
- `getDifficultyForRound()` - Escalates difficulty based on round number
- `saveProgress()` / `loadProgress()` - localStorage persistence

## Adding New Categories

1. Add objects to `data/gameObjects.ts` with the new category
2. The game automatically picks from all categories
3. To filter by category, modify `getNextChallenger()` in `lib/game/engine.ts`

## Browser Support

- Chrome/Edge 90+
- Firefox 90+
- Safari 14+
- iOS Safari 14+
- Chrome Android 90+

## License

MIT - Feel free to use, modify, and deploy!

## Credits

Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.
