# Styling Strategy

## Brutalist Design System

Hard edges, high contrast, no gradients, bold borders.
**Why**: Fast to implement, visually distinct, scales without complex design system.

## Tailwind Config

**Custom classes**:

```css
.border-hard → border-2 border-black .shadow-hard → 4px 4px 0 0 #000;
```

**Usage**: Apply directly in JSX.
**POV**: Utility classes = inline styles with design constraints. Prevents magic values.

## Color Palette (Minimal)

```
brand-red: #ff3333   → Alerts, accents
brand-neon: #ccff00  → Hover, active, success
black: #000          → Borders, text
white: #fff          → Backgrounds
neutral-*: Grays     → Secondary text
```

**POV**: Limited palette = consistency. Complexity scales with color count.

## Responsive Breakpoints

```
sm: 640px, md: 768px, lg: 1024px, xl: 1280px
```

**Mobile-first**: Write for mobile, add `md:`, `lg:` for larger.
**POV**: Mobile-first safer. 60%+ web traffic mobile.

## Font Strategy

- **Space Grotesk** (sans): Headings, body
- **Space Mono** (mono): Code, labels, technical UI
- Loaded via Google Fonts: ~30KB per font

**POV**: Monospace = readability for emails/IDs. Don't use for long paragraphs.

## Shadow System

**Brutalist hard shadows** (no blur):

```css
shadow-hard-sm: 2px 2px 0 0 #000
shadow-hard:    4px 4px 0 0 #000
```

**POV**: Hard shadows = more repaints than blur. 100+ animated shadows = jank on low-end devices.

## Animation Rules

**Transitions**: `duration-100` (0.1s), `duration-150` (0.15s)
**Why fast**: Immediate feedback.

**POV**: `transition-all` triggers more GPU work than specific properties. For buttons OK. For 100+ cards use `transition-transform`.

## Grid Layouts

**Example**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`
**POV**: CSS Grid simpler than flexbox for card layouts.

## Dark Mode

Not implemented. Brutalist design = high contrast works in light.
If needed: add `darkMode: 'class'` to tailwind.config.js
**POV**: 2x styling work. Only add if users request.

## Accessibility

**Focus states**: All interactive elements have visible focus rings.
**Contrast**: Black/white = 21:1 (WCAG AAA)
**Test**: Chrome DevTools → Lighthouse

**POV**: Keyboard nav non-negotiable. 10% users rely on it.

## Performance Budget

- Critical CSS: First paint <1s on 3G
- Tailwind bundle: ~10KB gzipped
- Font loading: `font-display: swap`

**POV**: JIT + PurgeCSS = only ships used classes. If >50KB audit unused classes.

## Refactor Triggers

- 3+ identical class combos → extract to `@apply` utility
- Inline styles 3+ places → create utility class
- Custom CSS >100 lines → consider Tailwind plugin

Works to ~50 components. Beyond that consider design tokens in JS.
