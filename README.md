# Coplannr

Production-ready social media scheduler built with TypeScript, React, TanStack Router/Query.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
  components/ui/       # Reusable primitives
  components/layout/   # Page structure
  pages/               # Route components
  routes/              # Router config
  styles/              # Global CSS + theme
  lib/                 # Utilities
```

## Stack

- **Vite**: Build tool, instant HMR
- **React 18**: UI framework
- **TypeScript**: Type safety
- **TanStack Router**: Type-safe routing
- **TanStack Query**: Server state
- **TailwindCSS**: Utility-first styling

## Pages

- `/` → Landing page
- `/login` → Authentication
- `/register` → Sign up
- `/dashboard` → Command center

## Build

```bash
npm run build    # → dist/ folder
npm run preview  # Test prod build
```

Deploy `dist/` to Vercel/Netlify/Cloudflare Pages.

## Adding Features

**New component**: `src/components/ui/ComponentName.tsx`
**New page**: `src/pages/PageName.tsx` + add route in `src/routes/index.tsx`
**Styling**: Tailwind classes or add to `src/styles/index.css`

## Design System

Brutalist: hard edges, black borders, neon accents.
See `docs/COMPONENTS.md` for usage.

## State Management

- Local state: `useState`
- Server state: TanStack Query
- Global state: Zustand (if needed)

## Performance

- Icons: Iconify loaded via CDN (consider sprites if >20 icons)
- Tailwind: Auto-purged in prod
- Images: Add to `public/` folder

## Production Considerations

**If scaling**:

- Add auth guards in router
- Centralize API calls: `src/lib/api.ts`
- Add error tracking: Sentry
- Virtualize long lists: react-window

**Current capacity**: 50-100 components without refactor.

## Docs

- `docs/ARCHITECTURE.md` → Environment, scaling, state
- `docs/COMPONENTS.md` → UI primitives, usage
- `docs/STYLING.md` → Tailwind config, design tokens

## License

MIT

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
