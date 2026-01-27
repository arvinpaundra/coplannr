# Component Design System

## Design Tokens

```ts
Colors:
  brand-red: #ff3333
  brand-neon: #ccff00
  border: #000 (always black)

Shadows:
  hard-sm: 2px 2px 0 0 #000
  hard: 4px 4px 0 0 #000

Fonts:
  sans: Space Grotesk
  mono: Space Mono
```

## UI Primitives

### Button

**Variants**: primary (black bg), secondary (white bg), action
**Usage**: `<Button variant="primary">Text</Button>`
**POV**: Shadow animation increases repaint cost. Fine until 50+ buttons re-rendering per scroll.

### Input

**Features**: Right icon slot, focus neon shadow, monospace font
**Usage**: `<Input type="email" icon={<iconify-icon />} />`
**POV**: Custom focus state. Ensure 3:1 contrast ratio for accessibility.

### Card

**Props**: shadow (bool), hover (bool)
**Usage**: `<Card shadow hover>Content</Card>`
**POV**: 100+ cards in list → use react-window for virtualization.

### Checkbox

**Style**: Custom SVG checkmark, neon fill
**Usage**: `<Checkbox label="Remember me" />`
**POV**: Custom styling. Native input underneath for accessibility.

## Layout Components

### Navigation

Top bar, sticky, links to pages.
**POV**: `z-50` for sticky. Reserve `z-[100]` for modals.

### Sidebar

Dashboard left nav (desktop only).
**POV**: Hidden mobile. Needs hamburger menu (not implemented).

### Footer

Static, legal links.
**POV**: If adding newsletter → extract form component.

## Composition Rules

1. Single responsibility per component
2. Max 3 levels prop drilling
3. Use forwardRef for inputs/buttons
4. All props TypeScript typed
5. Semantic HTML (button not div onClick)

## Performance

- Re-renders: `React.memo()` for 100+ list items
- Icons: Iconify ~50KB each. 20+ icons → use SVG sprites
- TailwindCSS: Auto-purged in prod. Verify: `npm run build && du -sh dist/`

Structure survives to ~100 components.
