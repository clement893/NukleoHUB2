# Components

This directory contains all React components for the NukleoHUB2 application.

## Structure

```
components/
├── common/          # Reusable UI components
├── layout/          # Layout components (Sidebar, Header, etc.)
├── forms/           # Form-specific components
├── commercial/      # Commercial module components
├── projects/        # Projects module components
├── team/            # Team module components
├── billing/         # Billing module components
├── communication/   # Communication module components
├── contracts/       # Contracts module components
├── admin/           # Admin module components
└── portal/          # Portal components
```

## Common Components

### Button
Versatile button component with multiple variants and states.

```tsx
import { Button } from '@/components/common';

<Button variant="primary" size="md">Click me</Button>
<Button variant="outline" isLoading>Loading...</Button>
<Button variant="danger" icon={<TrashIcon />}>Delete</Button>
```

**Variants:** `primary`, `secondary`, `outline`, `ghost`, `danger`, `link`
**Sizes:** `sm`, `md`, `lg`, `icon`

### Card
Container component for grouping content.

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/common';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Input
Text input component with label, error, and helper text support.

```tsx
import { Input } from '@/components/common';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error="Invalid email"
  required
/>
```

### Modal
Modal dialog component.

```tsx
import { Modal } from '@/components/common';

<Modal
  isOpen={isOpen}
  onClose={onClose}
  title="Modal Title"
  size="md"
>
  <p>Modal content</p>
</Modal>
```

**Sizes:** `sm`, `md`, `lg`, `xl`

### Loader
Loading spinner component.

```tsx
import { Loader } from '@/components/common';

<Loader size="md" />
<Loader size="lg" text="Loading..." />
```

**Sizes:** `sm`, `md`, `lg`

### Alert
Alert message component.

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/common';

<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your action was completed successfully.</AlertDescription>
</Alert>
```

**Variants:** `default`, `destructive`, `success`, `warning`

## Guidelines

1. **Use TypeScript** - All components must be fully typed
2. **Use Tailwind CSS** - No inline styles or CSS modules
3. **Use `cn()` utility** - For merging Tailwind classes
4. **Use `cva`** - For component variants
5. **Accessibility** - Include ARIA attributes
6. **Documentation** - Document props and usage examples

## Adding New Components

1. Create component file in appropriate directory
2. Export from `index.ts`
3. Add documentation to this README
4. Add usage examples
