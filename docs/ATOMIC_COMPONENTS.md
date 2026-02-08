# Atomic Components Documentation

## Overview

This project follows **Atomic Design** methodology, organizing components into three hierarchical levels:

- **Atoms**: Basic building blocks (Badge, Label, Divider, etc.)
- **Molecules**: Simple combinations of atoms (StatCard, Alert, FormField, etc.)
- **Organisms**: Complex components (FormSection, PlatformSelector, etc.)

## Component Structure

```
src/components/
├── atoms/          # Basic UI elements (Badge, Label, BackgroundGrid, BrandLogo, etc.)
├── molecules/      # Component combinations (StatCard, Alert, FormField, etc.)
├── organisms/       # Complex components (FormSection, Navigation, Header, Sidebar, etc.)
└── ui/             # Legacy UI primitives (Button, Input, Card, etc.)
```

## Atoms

Basic building blocks that cannot be broken down further.

### Badge

Status badges, version badges, and category labels.

**Location**: `src/components/atoms/Badge.tsx`

**Props**:
- `variant?: 'default' | 'neon' | 'red' | 'black' | 'neutral'` - Visual style
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- Standard HTML span attributes

**Usage**:
```tsx
import { Badge } from '@/components/atoms/Badge';

<Badge variant="neon" size="sm">BETA</Badge>
<Badge variant="red">ERROR</Badge>
```

**When to use**: Status indicators, version labels, category tags

---

### Label

Form labels with consistent styling and optional required indicator.

**Location**: `src/components/atoms/Label.tsx`

**Props**:
- `required?: boolean` - Shows red asterisk if true
- Standard HTML label attributes

**Usage**:
```tsx
import { Label } from '@/components/atoms/Label';

<Label htmlFor="email" required>Email Address</Label>
```

**When to use**: Form field labels

---

### Divider

Section dividers with optional text.

**Location**: `src/components/atoms/Divider.tsx`

**Props**:
- `text?: string` - Optional centered text
- `orientation?: 'horizontal' | 'vertical'` - Divider direction

**Usage**:
```tsx
import { Divider } from '@/components/atoms/Divider';

<Divider text="Or continue with" />
<Divider orientation="vertical" />
```

**When to use**: Separating sections, form dividers

---

### LoadingSpinner

Loading indicators with size and color variants.

**Location**: `src/components/atoms/LoadingSpinner.tsx`

**Props**:
- `size?: 'sm' | 'md' | 'lg'` - Size variant
- `variant?: 'default' | 'neon' | 'red'` - Color variant

**Usage**:
```tsx
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner';

<LoadingSpinner size="md" variant="neon" />
```

**When to use**: Loading states, async operations

---

### EmptyState

Empty state displays with icon, title, and optional action.

**Location**: `src/components/atoms/EmptyState.tsx`

**Props**:
- `icon?: string` - Iconify icon name (default: 'solar:file-text-linear')
- `title: string` - Main message
- `description?: string` - Additional context
- `action?: { label: string; onClick: () => void }` - Optional action button

**Usage**:
```tsx
import { EmptyState } from '@/components/atoms/EmptyState';

<EmptyState
  icon="solar:link-circle-linear"
  title="No platforms available"
  description="Connect platforms in Settings to get started"
  action={{ label: 'Go to Settings', onClick: () => navigate('/settings') }}
/>
```

**When to use**: Empty lists, no results, initial states

---

## Molecules

Simple combinations of atoms that form functional units.

### Alert

Error, success, info, and warning messages.

**Location**: `src/components/molecules/Alert.tsx`

**Props**:
- `variant?: 'error' | 'success' | 'info' | 'warning'` - Alert type
- `message: string` - Alert message
- `icon?: string` - Custom icon (defaults based on variant)

**Usage**:
```tsx
import { Alert } from '@/components/molecules/Alert';

<Alert variant="error" message="Login failed. Please try again." />
<Alert variant="success" message="Profile updated successfully" />
```

**When to use**: Form errors, success messages, notifications

---

### StatCard

Metric display cards with icons, values, and change indicators.

**Location**: `src/components/molecules/StatCard.tsx`

**Props**:
- `label: string` - Metric label
- `value: string | number` - Main value
- `change?: { value: string; isPositive?: boolean }` - Change indicator
- `icon?: string` - Iconify icon name
- `variant?: 'default' | 'highlight' | 'danger'` - Visual variant
- `description?: string` - Additional context

**Usage**:
```tsx
import { StatCard } from '@/components/molecules/StatCard';

<StatCard
  label="Published (7d)"
  value={48}
  icon="solar:check-circle-linear"
  change={{ value: '+12% vs last wk', isPositive: true }}
/>
```

**When to use**: Dashboard metrics, analytics, KPIs

---

### PlatformBadge

Platform icon with name, selectable state.

**Location**: `src/components/molecules/PlatformBadge.tsx`

**Props**:
- `platform: string` - Platform name
- `icon: string` - Iconify icon name
- `selected?: boolean` - Selected state
- `onClick?: () => void` - Click handler
- `size?: 'sm' | 'md' | 'lg'` - Size variant

**Usage**:
```tsx
import { PlatformBadge } from '@/components/molecules/PlatformBadge';

<PlatformBadge
  platform="Twitter"
  icon="carbon:logo-x"
  selected={true}
  onClick={() => togglePlatform('twitter')}
/>
```

**When to use**: Platform selection, platform displays

---

### FormField

Complete form field with label, input, and error message.

**Location**: `src/components/molecules/FormField.tsx`

**Props**:
- `label?: string` - Field label
- `error?: string` - Error message
- `required?: boolean` - Required indicator
- `htmlFor?: string` - Label for attribute
- `children: ReactNode` - Input component

**Usage**:
```tsx
import { FormField } from '@/components/molecules/FormField';
import { Input } from '@/components/ui/Input';

<FormField
  label="Email Address"
  htmlFor="email"
  required
  error={fieldErrors.email}
>
  <Input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</FormField>
```

**When to use**: Form inputs with validation

---

### SectionHeader

Section titles with optional badge and icon.

**Location**: `src/components/molecules/SectionHeader.tsx`

**Props**:
- `title: string` - Section title
- `badge?: string` - Optional badge text
- `icon?: string` - Iconify icon name
- `action?: ReactNode` - Optional action element

**Usage**:
```tsx
import { SectionHeader } from '@/components/molecules/SectionHeader';

<SectionHeader
  title="Select Platforms"
  icon="solar:link-circle-linear"
  badge="MULTIPLE SELECT"
/>
```

**When to use**: Section headers, form section titles

---

### FeatureItem

Feature list items with icon and description.

**Location**: `src/components/molecules/FeatureItem.tsx`

**Props**:
- `icon: string` - Iconify icon name
- `title: string` - Feature title
- `description?: string` - Feature description
- `variant?: 'default' | 'negative'` - Visual variant

**Usage**:
```tsx
import { FeatureItem } from '@/components/molecules/FeatureItem';

<FeatureItem
  icon="solar:close-square-linear"
  title="You write the same post again and again."
  variant="negative"
/>
```

**When to use**: Feature lists, benefit lists

---

### PricingCard

Pricing plan cards with features and actions.

**Location**: `src/components/molecules/PricingCard.tsx`

**Props**:
- `plan: PricingPlan` - Plan data from API types
- `isPopular?: boolean` - Highlight popular plan
- `isCurrent?: boolean` - Mark current plan
- `onSelect?: () => void` - Selection handler
- `formatCurrency?: (amount: number, currency: string) => string` - Currency formatter
- `isAuthenticated?: boolean` - Auth state

**Usage**:
```tsx
import { PricingCard } from '@/components/molecules/PricingCard';

<PricingCard
  plan={plan}
  isPopular={plan.is_popular}
  isCurrent={subscription?.plan_code === plan.code}
  onSelect={() => handleSelect(plan.code)}
  isAuthenticated={isAuthenticated}
/>
```

**When to use**: Pricing pages, subscription selection

---

### PostQueueItem

Queue/post list items with status, platforms, and actions.

**Location**: `src/components/molecules/PostQueueItem.tsx`

**Props**:
- `post: PostQueueItemData` - Post data
- `onEdit?: () => void` - Edit handler
- `onDelete?: () => void` - Delete handler

**PostQueueItemData**:
```tsx
{
  id: string;
  title: string;
  subtitle: string;
  platforms: string[];
  time: string;
  status: 'queued' | 'scheduled' | 'error';
  error?: boolean;
}
```

**Usage**:
```tsx
import { PostQueueItem } from '@/components/molecules/PostQueueItem';

<PostQueueItem
  post={postData}
  onEdit={() => handleEdit(post.id)}
  onDelete={() => handleDelete(post.id)}
/>
```

**When to use**: Post queues, scheduled posts lists

---

### ActivityLogItem

Activity log entries with time, icon, and status.

**Location**: `src/components/molecules/ActivityLogItem.tsx`

**Props**:
- `log: ActivityLogData` - Log entry data

**ActivityLogData**:
```tsx
{
  time: string;
  icon: string;
  title: string;
  description: string;
  status: string;
  statusColor?: string;
  iconColor?: string;
  titleColor?: string;
  progress?: number;
  isAnimated?: boolean;
}
```

**Usage**:
```tsx
import { ActivityLogItem } from '@/components/molecules/ActivityLogItem';

<ActivityLogItem log={logEntry} />
```

**When to use**: Activity logs, event histories

---

### CalendarDayCell

Calendar day cells with events.

**Location**: `src/components/molecules/CalendarDayCell.tsx`

**Props**:
- `day: CalendarDay` - Day data

**CalendarDay**:
```tsx
{
  date: number;
  month: string;
  isPreviousMonth?: boolean;
  isToday?: boolean;
  events: CalendarEvent[];
}
```

**Usage**:
```tsx
import { CalendarDayCell } from '@/components/molecules/CalendarDayCell';

<CalendarDayCell day={dayData} />
```

**When to use**: Calendar views, schedule displays

---

### ConnectionCard

Platform connection cards with status and actions.

**Location**: `src/components/molecules/ConnectionCard.tsx`

**Props**:
- `platform: ConnectionPlatform` - Platform data
- `onConnect?: () => void` - Connect handler
- `onDisconnect?: () => void` - Disconnect handler
- `onSync?: () => void` - Sync handler

**ConnectionPlatform**:
```tsx
{
  name: string;
  icon: string;
  handle: string;
  status: 'connected' | 'disconnected';
  lastSync?: string | null;
  stats?: {
    postsThisWeek?: number;
    successRate?: number;
  };
}
```

**Usage**:
```tsx
import { ConnectionCard } from '@/components/molecules/ConnectionCard';

<ConnectionCard
  platform={platformData}
  onConnect={() => handleConnect(platform.id)}
  onDisconnect={() => handleDisconnect(platform.id)}
  onSync={() => handleSync(platform.id)}
/>
```

**When to use**: Platform connections, integration management

---

## Organisms

Complex components composed of molecules and atoms.

### FormSection

Form section wrapper with title and icon.

**Location**: `src/components/organisms/FormSection.tsx`

**Props**:
- `title: string` - Section title
- `icon?: string` - Iconify icon name
- `children: ReactNode` - Form content

**Usage**:
```tsx
import { FormSection } from '@/components/organisms/FormSection';

<FormSection title="Profile Information" icon="solar:user-circle-linear">
  {/* Form fields */}
</FormSection>
```

**When to use**: Form sections, settings sections

---

### MediaUploader

File upload component with preview and removal.

**Location**: `src/components/organisms/MediaUploader.tsx`

**Props**:
- `accept?: string` - File types (default: 'image/*,video/mp4')
- `multiple?: boolean` - Allow multiple files
- `onUpload?: (files: File[]) => void` - Upload handler
- `files?: File[]` - Current files
- `onRemove?: (index: number) => void` - Remove handler
- `maxSize?: number` - Max file size in MB (default: 50)

**Usage**:
```tsx
import { MediaUploader } from '@/components/organisms/MediaUploader';

<MediaUploader
  accept="image/*,video/mp4"
  multiple
  onUpload={(files) => setMediaFiles([...mediaFiles, ...files])}
  files={mediaFiles}
  onRemove={(index) => removeFile(index)}
  maxSize={50}
/>
```

**When to use**: File uploads, media attachments

---

### PlatformSelector

Platform selection grid with loading and error states.

**Location**: `src/components/organisms/PlatformSelector.tsx`

**Props**:
- `platforms: Platform[]` - Available platforms
- `selected: string[]` - Selected platform IDs
- `onToggle: (platformId: string) => void` - Toggle handler
- `isLoading?: boolean` - Loading state
- `error?: string | null` - Error message

**Usage**:
```tsx
import { PlatformSelector } from '@/components/organisms/PlatformSelector';

<PlatformSelector
  platforms={platforms}
  selected={selectedPlatforms}
  onToggle={togglePlatform}
  isLoading={isLoadingPlatforms}
  error={platformsError ? 'Failed to load platforms' : null}
/>
```

**When to use**: Platform selection, multi-select grids

---

### ContentEditor

Content textarea with character count and toolbar.

**Location**: `src/components/organisms/ContentEditor.tsx`

**Props**:
- `value: string` - Editor value
- `onChange: (value: string) => void` - Change handler
- `maxLength?: number` - Character limit (default: 280)
- `placeholder?: string` - Placeholder text
- `showToolbar?: boolean` - Show toolbar (default: true)
- `showCharCount?: boolean` - Show character count (default: true)

**Usage**:
```tsx
import { ContentEditor } from '@/components/organisms/ContentEditor';

<ContentEditor
  value={content}
  onChange={setContent}
  maxLength={280}
  placeholder="Type your update here..."
/>
```

**When to use**: Content creation, text editors

---

### SchedulePicker

Date/time picker component with scheduling toggle.

**Location**: `src/components/organisms/SchedulePicker.tsx`

**Props**:
- `isScheduled: boolean` - Scheduling enabled
- `onScheduledChange: (scheduled: boolean) => void` - Toggle handler
- `scheduleDate: ScheduleDate` - Date/time data
- `onDateChange: (date: ScheduleDate) => void` - Date change handler

**ScheduleDate**:
```tsx
{
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  period: 'AM' | 'PM';
}
```

**Usage**:
```tsx
import { SchedulePicker } from '@/components/organisms/SchedulePicker';

<SchedulePicker
  isScheduled={isScheduled}
  onScheduledChange={setIsScheduled}
  scheduleDate={scheduleDate}
  onDateChange={setScheduleDate}
/>
```

**When to use**: Post scheduling, date/time selection

---

## Organisms (continued)

### Navigation

Top navigation bar with brand logo and auth-aware actions.

**Location**: `src/components/organisms/Navigation.tsx`

**Props**: None (uses auth context internally)

**Usage**:
```tsx
import { Navigation } from '@/components/organisms/Navigation';

<Navigation />
```

**When to use**: Landing pages, public pages

---

### Header

Page header with breadcrumbs, title, and system status.

**Location**: `src/components/organisms/Header.tsx`

**Props**:
- `title: string` - Page title
- `badge?: string` - Optional badge text

**Usage**:
```tsx
import { Header } from '@/components/organisms/Header';

<Header title="DASHBOARD" badge="Overview" />
```

**When to use**: Authenticated pages, dashboard layouts

---

### Sidebar

Dashboard sidebar with navigation and user profile.

**Location**: `src/components/organisms/Sidebar.tsx`

**Props**: None (uses auth context internally)

**Usage**:
```tsx
import { Sidebar } from '@/components/organisms/Sidebar';

<Sidebar />
```

**When to use**: Dashboard layouts, authenticated pages

---

### Footer

Site footer with links and copyright.

**Location**: `src/components/organisms/Footer.tsx`

**Props**: None

**Usage**:
```tsx
import { Footer } from '@/components/organisms/Footer';

<Footer />
```

**When to use**: Landing pages, public pages

---

### PageFooter

Page footer with version info and utility links.

**Location**: `src/components/organisms/PageFooter.tsx`

**Props**:
- `version?: string` - Version string (default: 'v1.0.4-beta')
- `build?: string` - Build string (default: 'BUILD 2293')
- `links?: Array<{ label: string; href: string }>` - Footer links
- `className?: string` - Additional classes

**Usage**:
```tsx
import { PageFooter } from '@/components/organisms/PageFooter';

<PageFooter version="v2.0.0" build="BUILD 3000" />
```

**When to use**: Authenticated pages, dashboard pages

---

### StatsGrid

Grid of stat cards with responsive columns.

**Location**: `src/components/organisms/StatsGrid.tsx`

**Props**:
- `stats: StatData[]` - Array of stat data
- `columns?: 1 | 2 | 3 | 4` - Column count (default: 4)

**StatData**:
```tsx
{
  label: string;
  value: string | number;
  change?: { value: string; isPositive?: boolean };
  icon?: string;
  variant?: 'default' | 'highlight' | 'danger';
  description?: string;
}
```

**Usage**:
```tsx
import { StatsGrid } from '@/components/organisms/StatsGrid';

<StatsGrid
  stats={[
    { label: 'Queued', value: 12, icon: 'solar:hourglass-line-linear' },
    { label: 'Published', value: 48, change: { value: '+12%', isPositive: true } },
  ]}
  columns={4}
/>
```

**When to use**: Dashboard metrics, analytics grids

---

## Atoms (continued)

### BackgroundGrid

Reusable background pattern.

**Location**: `src/components/atoms/BackgroundGrid.tsx`

**Props**:
- `opacity?: number` - Grid opacity (default: 0.2)
- `size?: number` - Grid size in pixels (default: 20)

**Usage**:
```tsx
import { BackgroundGrid } from '@/components/atoms/BackgroundGrid';

<BackgroundGrid opacity={0.2} size={20} />
```

**When to use**: Page backgrounds, section backgrounds

---

### BrandLogo

Brand logo component with size and link variants.

**Location**: `src/components/atoms/BrandLogo.tsx`

**Props**:
- `size?: 'sm' | 'md' | 'lg'` - Logo size
- `variant?: 'default' | 'minimal'` - Visual variant
- `showText?: boolean` - Show text (default: true)
- `to?: string` - Link destination (makes it a link)

**Usage**:
```tsx
import { BrandLogo } from '@/components/atoms/BrandLogo';

<BrandLogo size="md" to="/" />
<BrandLogo size="sm" showText={false} />
```

**When to use**: Navigation, headers, branding

---

## Best Practices

### 1. Component Composition

Always prefer composition over duplication:

```tsx
// ✅ Good: Compose from atoms/molecules
<FormField label="Email" error={error}>
  <Input type="email" />
</FormField>

// ❌ Bad: Duplicate form field structure
<div>
  <label>Email</label>
  <input type="email" />
  {error && <p>{error}</p>}
</div>
```

### 2. Type Safety

All components are fully typed. Use TypeScript interfaces:

```tsx
import type { StatData } from '@/components/organisms/StatsGrid';

const stats: StatData[] = [
  { label: 'Posts', value: 100 },
];
```

### 3. Consistent Styling

Components follow the brutalist design system:
- Hard borders (`border-2 border-black`)
- Hard shadows (`shadow-hard`)
- Brand colors (`brand-red`, `brand-neon`)
- Monospace fonts for technical UI

### 4. Accessibility

- All form components use proper labels
- Interactive elements have focus states
- Semantic HTML throughout
- ARIA attributes where needed

### 5. Performance

- Use `React.memo()` for list items (100+ items)
- Lazy load heavy components
- Optimize icon usage (consider sprites for 20+ icons)

## Migration Guide

When refactoring existing code:

1. **Identify patterns**: Look for repeated UI structures
2. **Extract to atoms**: Basic elements (badges, labels)
3. **Combine to molecules**: Related atoms (form fields, cards)
4. **Build organisms**: Complex features (forms, selectors)
5. **Update imports**: Replace inline code with component imports

## Component Dependencies

```
Atoms → Molecules → Organisms
  ↓         ↓          ↓
Layout Components
  ↓
Pages
```

**Rule**: Components can only import from their level or below:
- Molecules can import atoms
- Organisms can import molecules and atoms
- Pages can import all levels

## File Naming

- PascalCase for component files: `StatCard.tsx`
- PascalCase for component names: `export const StatCard`
- kebab-case for directories: `molecules/`, `organisms/`

## Testing

Each component should be:
- **Isolated**: Testable without page context
- **Documented**: Props and usage examples
- **Type-safe**: Full TypeScript coverage
- **Accessible**: Keyboard navigation, screen readers

---

**Last Updated**: 2024
**Maintainer**: Development Team
