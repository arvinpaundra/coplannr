# Architecture

## Environment Reality

**Local Dev**

- Vite dev server: instant hot reload
- TailwindCSS JIT: compiles only used classes
- No backend needed: works standalone

**Production**

- Static SPA build → CDN-ready
- Client-side routing (TanStack Router)
- If SEO needed → add SSR layer

**Scaling**

- Pure SPA = horizontal scaling (static files)
- State: TanStack Query (server cache) + Zustand (global state if needed)
- Multi-user collab → WebSocket layer required

## Stack Rationale

- **TypeScript**: Compile-time safety
- **React 18**: Industry standard, concurrent features
- **TanStack Router**: Type-safe routing
- **TanStack Query**: Server state management
- **Tailwind**: Utility-first, small bundle (JIT)

## File Structure

```
src/
  components/
    ui/          → Pure UI primitives (Button, Input, Card)
    layout/      → Page structure (Navigation, Sidebar, Footer)
    features/    → Domain-specific components (future)
  pages/         → Route components
  hooks/         → Custom React hooks
  lib/           → Pure utilities
  styles/        → Global CSS, theme tokens
  routes/        → TanStack Router config
```

**Logic**: Easy to locate code, scales independently, testable

## State Strategy

- **Local**: useState
- **Server**: TanStack Query
- **Global**: Zustand (only if truly needed)
- Avoid Redux unless coordinating 10+ async flows

## What Breaks First

**As users grow**:

1. Static hosting fine until SSR needed
2. Client routing needs auth guards
3. TailwindCSS auto-purges in prod

**Operations**:

- Deploy: `npm run build` → upload dist/
- Errors: Add Sentry (2-line setup)
- Performance: React DevTools Profiler

## Refactor Triggers

- Props drilling >5 levels → lift state
- Component >200 lines → split
- Duplicated logic in 3+ places → extract hook
- API calls scattered → centralize

Structure survives to ~50 components easily.
