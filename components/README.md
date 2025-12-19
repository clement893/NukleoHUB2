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

### Textarea
Multi-line text input component with auto-resize and character count support.

```tsx
import { Textarea } from '@/components/common';

<Textarea
  label="Description"
  placeholder="Enter description"
  autoResize
  maxLength={500}
  showCharacterCount
  error="Description is required"
/>
```

**Props:** `label`, `error`, `helperText`, `autoResize`, `maxLength`, `showCharacterCount`

### Select
Dropdown select component with search and grouped options support.

```tsx
import { Select } from '@/components/common';

<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'fr', label: 'France', group: 'Europe' },
  ]}
  placeholder="Select a country"
  searchable
/>
```

**Props:** `label`, `options`, `placeholder`, `searchable`, `error`, `helperText`

### Checkbox
Checkbox component with group support and indeterminate state.

```tsx
import { Checkbox, CheckboxGroup } from '@/components/common';

<Checkbox label="Accept terms" />
<CheckboxGroup label="Preferences" orientation="horizontal">
  <Checkbox label="Email notifications" />
  <Checkbox label="SMS notifications" />
</CheckboxGroup>
```

**Props:** `label`, `error`, `helperText`, `indeterminate`

### Radio
Radio button component with group support.

```tsx
import { Radio, RadioGroup } from '@/components/common';

<RadioGroup
  label="Payment method"
  value={selected}
  onChange={setSelected}
  orientation="horizontal"
>
  <Radio label="Credit Card" value="card" />
  <Radio label="PayPal" value="paypal" />
</RadioGroup>
```

**Props:** `label`, `error`, `helperText`, `orientation`

### Switch
Toggle switch component.

```tsx
import { Switch } from '@/components/common';

<Switch
  label="Enable notifications"
  checked={enabled}
  onChange={setEnabled}
/>
```

**Props:** `label`, `error`, `helperText`, `checked`, `onChange`

### Toast
Notification/toast component with multiple variants and positions.

```tsx
import { Toast, ToastContainer } from '@/components/common';

<ToastContainer position="top-right">
  <Toast
    variant="success"
    title="Success"
    description="Operation completed"
    onClose={() => {}}
  />
</ToastContainer>
```

**Variants:** `default`, `success`, `error`, `warning`, `info`
**Positions:** `top-right`, `top-left`, `bottom-right`, `bottom-left`, `top-center`, `bottom-center`

### Skeleton
Loading placeholder component with multiple variants.

```tsx
import { Skeleton } from '@/components/common';

<Skeleton variant="text" width="100%" />
<Skeleton variant="circle" size="lg" />
<Skeleton variant="rectangle" width={200} height={100} />
```

**Variants:** `text`, `circle`, `rectangle`
**Sizes:** `sm`, `md`, `lg`

### Progress
Progress bar component with linear and circular variants.

```tsx
import { Progress, CircularProgress } from '@/components/common';

<Progress value={75} max={100} showValue variant="success" />
<CircularProgress value={50} size="lg" showValue />
```

**Variants:** `default`, `success`, `warning`, `error`
**Sizes:** `sm`, `md`, `lg`

### Badge
Label/tag component with multiple variants.

```tsx
import { Badge } from '@/components/common';

<Badge variant="success" size="md">Active</Badge>
<Badge variant="outline" icon={<Icon />}>New</Badge>
```

**Variants:** `default`, `secondary`, `success`, `warning`, `error`, `outline`
**Sizes:** `sm`, `md`, `lg`

### Sidebar
Collapsible sidebar navigation component with nested items.

```tsx
import { Sidebar } from '@/components/common';

<Sidebar
  items={[
    { id: '1', label: 'Dashboard', icon: <Icon />, active: true },
    { id: '2', label: 'Settings', children: [...] },
  ]}
  isCollapsed={false}
  onToggleCollapse={() => {}}
/>
```

**Props:** `items`, `isCollapsed`, `onToggleCollapse`, `onItemClick`

### Header
Page header component with logo, navigation, and user menu.

```tsx
import { Header, HeaderNavItem } from '@/components/common';

<Header
  logo={<Logo />}
  navigation={
    <>
      <HeaderNavItem active>Home</HeaderNavItem>
      <HeaderNavItem href="/about">About</HeaderNavItem>
    </>
  }
  userMenu={<UserMenu />}
  sticky
/>
```

**Props:** `logo`, `logoHref`, `navigation`, `userMenu`, `actions`, `sticky`

### Tabs
Tab navigation component with horizontal and vertical orientations.

```tsx
import { Tabs } from '@/components/common';

<Tabs
  items={[
    { value: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { value: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  defaultValue="tab1"
  orientation="horizontal"
/>
```

**Props:** `items`, `defaultValue`, `value`, `onValueChange`, `orientation`

### Pagination
Page navigation component with customizable display.

```tsx
import { Pagination } from '@/components/common';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => {}}
  showFirstLast
  showPrevNext
  maxVisible={5}
/>
```

**Props:** `currentPage`, `totalPages`, `onPageChange`, `showFirstLast`, `showPrevNext`, `maxVisible`

### Breadcrumb
Navigation breadcrumb component with customizable separator.

```tsx
import { Breadcrumb } from '@/components/common';

<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', onClick: () => {} },
    { label: 'Current Page' },
  ]}
/>
```

**Props:** `items`, `separator`

### Table
Data table component with sortable columns, row selection, and search functionality.

```tsx
import { Table } from '@/components/common';

<Table
  data={users}
  columns={[
    { key: 'name', header: 'Name', accessor: 'name', sortable: true },
    { key: 'email', header: 'Email', accessor: 'email' },
    { key: 'actions', header: 'Actions', render: (_, row) => <Button>Edit</Button> },
  ]}
  sortable
  selectable
  searchable
  onSort={(column, direction) => {}}
  onRowSelect={(row, selected) => {}}
/>
```

**Props:** `data`, `columns`, `sortable`, `selectable`, `searchable`, `onSort`, `onRowSelect`, `rowKey`

### Tooltip
Contextual help tooltip component with multiple positions.

```tsx
import { Tooltip } from '@/components/common';

<Tooltip content="This is a helpful tooltip" position="top" showArrow>
  <Button>Hover me</Button>
</Tooltip>
```

**Positions:** `top`, `bottom`, `left`, `right`
**Props:** `content`, `position`, `delay`, `showArrow`, `disabled`

### Avatar
User avatar component with image, initials, icon, and status indicator.

```tsx
import { Avatar, AvatarGroup } from '@/components/common';

<Avatar src="/user.jpg" alt="User" fallback="JD" status="online" showStatus />
<Avatar fallback="John Doe" size="lg" />
<Avatar icon={<UserIcon />} />
<AvatarGroup max={3} size="md">
  <Avatar src="/user1.jpg" />
  <Avatar src="/user2.jpg" />
  <Avatar src="/user3.jpg" />
</AvatarGroup>
```

**Sizes:** `sm`, `md`, `lg`, `xl`
**Status:** `online`, `offline`, `away`, `busy`
**Props:** `src`, `alt`, `fallback`, `icon`, `status`, `showStatus`

### Accordion
Collapsible sections component with single or multiple open items.

```tsx
import { Accordion } from '@/components/common';

<Accordion
  type="multiple"
  items={[
    {
      value: 'item1',
      header: 'Section 1',
      content: <div>Content 1</div>,
      icon: <Icon />,
    },
    {
      value: 'item2',
      header: 'Section 2',
      content: <div>Content 2</div>,
    },
  ]}
  showIcon
  iconPosition="right"
/>
```

**Type:** `single`, `multiple`
**Props:** `items`, `type`, `defaultValue`, `value`, `onValueChange`, `showIcon`, `iconPosition`

### Divider
Horizontal or vertical divider component with optional text.

```tsx
import { Divider } from '@/components/common';

<Divider />
<Divider text="OR" textPosition="center" />
<Divider orientation="vertical" />
```

**Orientation:** `horizontal`, `vertical`
**Text Position:** `left`, `center`, `right`
**Props:** `orientation`, `text`, `textPosition`

### DropdownMenu
Dropdown menu component with nested items, dividers, and icons.

```tsx
import { DropdownMenu } from '@/components/common';

<DropdownMenu
  trigger={<Button>Menu</Button>}
  items={[
    { id: '1', label: 'Item 1', icon: <Icon />, onClick: () => {} },
    { id: '2', label: 'Item 2', divider: true },
    { id: '3', label: 'Submenu', children: [
      { id: '3-1', label: 'Sub Item 1' },
    ]},
  ]}
  align="left"
  position="bottom"
/>
```

**Props:** `trigger`, `items`, `align`, `position`, `onOpenChange`

### Dialog
Modal dialog component with customizable size and footer.

```tsx
import { Dialog, ConfirmDialog } from '@/components/common';

<Dialog
  isOpen={isOpen}
  onClose={onClose}
  title="Dialog Title"
  description="Dialog description"
  size="md"
  footer={<Button>Close</Button>}
>
  <p>Dialog content</p>
</Dialog>

<ConfirmDialog
  isOpen={isOpen}
  onClose={onClose}
  onConfirm={handleConfirm}
  title="Delete Item"
  message="Are you sure you want to delete this item?"
  confirmVariant="danger"
/>
```

**Sizes:** `sm`, `md`, `lg`, `xl`, `full`
**Props:** `isOpen`, `onClose`, `title`, `description`, `size`, `footer`, `closeOnOverlayClick`, `closeOnEscape`

### Drawer
Side drawer component with multiple positions.

```tsx
import { Drawer } from '@/components/common';

<Drawer
  isOpen={isOpen}
  onClose={onClose}
  title="Drawer Title"
  position="right"
  size="400px"
  showOverlay
>
  <p>Drawer content</p>
</Drawer>
```

**Positions:** `left`, `right`, `top`, `bottom`
**Props:** `isOpen`, `onClose`, `position`, `size`, `showOverlay`, `closeOnOverlayClick`, `closeOnEscape`

### DatePicker
Date selection component with calendar view.

```tsx
import { DatePicker } from '@/components/common';

<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  label="Select Date"
  minDate={new Date()}
  maxDate={new Date('2025-12-31')}
  showTime={false}
  format="YYYY-MM-DD"
/>
```

**Props:** `value`, `onChange`, `label`, `minDate`, `maxDate`, `showTime`, `format`, `error`, `helperText`

### TimePicker
Time selection component with 12/24 hour format.

```tsx
import { TimePicker } from '@/components/common';

<TimePicker
  value={selectedTime}
  onChange={setSelectedTime}
  label="Select Time"
  format="12h"
  step={15}
/>
```

**Format:** `12h`, `24h`
**Props:** `value`, `onChange`, `label`, `format`, `step`, `error`, `helperText`

### FileUpload
File upload component with drag & drop and preview.

```tsx
import { FileUpload } from '@/components/common';

<FileUpload
  onFileSelect={(files) => {}}
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024} // 5MB
  dragAndDrop
  showPreview
  label="Upload Files"
/>
```

**Props:** `onFileSelect`, `accept`, `multiple`, `maxSize`, `dragAndDrop`, `showPreview`, `error`, `helperText`

### Stepper
Step indicator component for multi-step processes.

```tsx
import { Stepper } from '@/components/common';

<Stepper
  steps={[
    { id: '1', label: 'Step 1', description: 'Description 1' },
    { id: '2', label: 'Step 2', description: 'Description 2' },
    { id: '3', label: 'Step 3', disabled: true },
  ]}
  currentStep={1}
  orientation="horizontal"
  showLabels
  showDescriptions
  onStepClick={(index) => {}}
/>
```

**Orientation:** `horizontal`, `vertical`
**Props:** `steps`, `currentStep`, `orientation`, `showLabels`, `showDescriptions`, `onStepClick`

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
