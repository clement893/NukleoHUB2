'use client';

import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  CircularProgress,
  Skeleton,
  Tabs,
  Pagination,
  Breadcrumb,
  Tooltip,
  Avatar,
  AvatarGroup,
  Accordion,
  Divider,
  DropdownMenu,
  Dialog,
  ConfirmDialog,
  Drawer,
  DatePicker,
  TimePicker,
  FileUpload,
  Stepper,
} from '@nukleohub/ui';

export default function Home() {
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [switchChecked, setSwitchChecked] = useState(false);
  const [progress, setProgress] = useState(65);
  const [currentStep, setCurrentStep] = useState(1);

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2', group: 'Group 1' },
    { value: 'option3', label: 'Option 3', group: 'Group 1' },
  ];

  const dropdownItems = [
    { id: '1', label: 'Profile', icon: <span>👤</span> },
    { id: '2', label: 'Settings', icon: <span>⚙️</span> },
    { id: '3', label: 'Divider', divider: true },
    { id: '4', label: 'Logout', icon: <span>🚪</span> },
  ];

  const stepperSteps = [
    { id: '1', label: 'Step 1', description: 'First step' },
    { id: '2', label: 'Step 2', description: 'Second step' },
    { id: '3', label: 'Step 3', description: 'Final step' },
  ];

  const accordionItems = [
    {
      value: 'item1',
      header: 'What is this?',
      content: 'This is a comprehensive component library built with Next.js, TypeScript, and Tailwind CSS.',
    },
    {
      value: 'item2',
      header: 'How to use?',
      content: 'Simply import the components you need from @nukleohub/ui and use them in your pages.',
    },
    {
      value: 'item3',
      header: 'Features',
      content: 'All components are fully typed, accessible, and follow modern React patterns.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">NukleoHUB2</h1>
              <p className="text-sm text-muted-foreground">Component Library Showcase</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">26 Components</Badge>
              <Badge variant="outline">Ready to use</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-foreground">
            Component Library Showcase
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Explore our comprehensive collection of reusable UI components built with Next.js and Tailwind CSS
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View Docs
            </Button>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Components', href: '/components' },
              { label: 'Showcase' },
            ]}
          />
        </section>

        {/* Buttons Section */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>Various button styles and sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="link">Link</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button isLoading>Loading</Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Form Components */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>Input fields, selects, checkboxes, and more</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input label="Email" type="email" placeholder="Enter your email" />
                <Input label="Password" type="password" placeholder="Enter password" />
                <Textarea
                  label="Description"
                  placeholder="Enter description"
                  autoResize
                  maxLength={200}
                  showCharacterCount
                />
                <Select
                  label="Select Option"
                  options={selectOptions}
                  placeholder="Choose an option"
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <CheckboxGroup label="Preferences" orientation="horizontal">
                  <Checkbox label="Email notifications" checked={checkboxChecked} onChange={setCheckboxChecked} />
                  <Checkbox label="SMS notifications" />
                </CheckboxGroup>
                <RadioGroup
                  label="Payment Method"
                  value={radioValue}
                  onChange={setRadioValue}
                  orientation="horizontal"
                >
                  <Radio label="Credit Card" value="option1" />
                  <Radio label="PayPal" value="option2" />
                  <Radio label="Bank Transfer" value="option3" />
                </RadioGroup>
                <Switch
                  label="Enable notifications"
                  checked={switchChecked}
                  onChange={setSwitchChecked}
                />
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Feedback Components */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Components</CardTitle>
              <CardDescription>Alerts, badges, progress indicators</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Alert variant="success">
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>Your action was completed successfully.</AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>Please review your input before proceeding.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
                </Alert>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
              <div className="space-y-4">
                <Progress value={progress} max={100} showValue />
                <div className="flex items-center gap-4">
                  <CircularProgress value={progress} size="md" showValue />
                  <CircularProgress value={75} size="lg" showValue />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setProgress(Math.max(0, progress - 10))}>
                    -
                  </Button>
                  <Button size="sm" onClick={() => setProgress(Math.min(100, progress + 10))}>
                    +
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="60%" />
                <div className="flex gap-4">
                  <Skeleton variant="circle" size="lg" />
                  <Skeleton variant="rectangle" width={200} height={100} />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Navigation Components */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Components</CardTitle>
              <CardDescription>Tabs, pagination, breadcrumbs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs
                items={[
                  {
                    value: 'tab1',
                    label: 'Tab 1',
                    content: <div className="p-4">Content for Tab 1</div>,
                  },
                  {
                    value: 'tab2',
                    label: 'Tab 2',
                    content: <div className="p-4">Content for Tab 2</div>,
                  },
                  {
                    value: 'tab3',
                    label: 'Tab 3',
                    content: <div className="p-4">Content for Tab 3</div>,
                  },
                ]}
                value={selectedTab}
                onValueChange={setSelectedTab}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
                showFirstLast
                showPrevNext
                maxVisible={5}
              />
            </CardContent>
          </Card>
        </section>

        {/* Display Components */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Display Components</CardTitle>
              <CardDescription>Tooltips, avatars, accordions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Tooltip content="This is a helpful tooltip" position="top">
                  <Button>Hover me</Button>
                </Tooltip>
                <Tooltip content="Tooltip on bottom" position="bottom">
                  <Button variant="outline">Bottom tooltip</Button>
                </Tooltip>
              </div>
              <div className="flex items-center gap-4">
                <Avatar src="" fallback="JD" status="online" showStatus />
                <Avatar fallback="AB" size="lg" status="away" showStatus />
                <Avatar fallback="CD" size="xl" status="busy" showStatus />
                <AvatarGroup max={3} size="md">
                  <Avatar fallback="U1" />
                  <Avatar fallback="U2" />
                  <Avatar fallback="U3" />
                  <Avatar fallback="U4" />
                </AvatarGroup>
              </div>
              <Accordion items={accordionItems} type="single" showIcon />
            </CardContent>
          </Card>
        </section>

        {/* Advanced Components */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Components</CardTitle>
              <CardDescription>Dropdowns, dialogs, drawers, pickers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <DropdownMenu
                  trigger={<Button>Open Menu</Button>}
                  items={dropdownItems}
                  align="left"
                />
                <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
                <Button onClick={() => setIsConfirmOpen(true)} variant="danger">
                  Confirm Dialog
                </Button>
                <Button onClick={() => setIsDrawerOpen(true)}>Open Drawer</Button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={setSelectedTime}
                  format="24h"
                />
              </div>
              <FileUpload
                label="Upload Files"
                multiple
                dragAndDrop
                showPreview
                maxSize={5 * 1024 * 1024}
                onFileSelect={(files) => console.log('Files selected:', files)}
              />
              <Stepper
                steps={stepperSteps}
                currentStep={currentStep}
                orientation="horizontal"
                showLabels
                showDescriptions
                onStepClick={setCurrentStep}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
                  Previous
                </Button>
                <Button size="sm" onClick={() => setCurrentStep(Math.min(stepperSteps.length - 1, currentStep + 1))}>
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dividers */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Dividers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Divider />
              <Divider text="OR" textPosition="center" />
              <Divider text="Left" textPosition="left" />
              <Divider text="Right" textPosition="right" />
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t py-8 text-center text-muted-foreground">
          <p>NukleoHUB2 Component Library - Built with Next.js, TypeScript & Tailwind CSS</p>
        </footer>
      </div>

      {/* Dialogs */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Example Dialog"
        description="This is an example dialog component"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>This is the dialog content. You can put anything here.</p>
      </Dialog>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          console.log('Confirmed!');
          setIsConfirmOpen(false);
        }}
        title="Confirm Action"
        message="Are you sure you want to proceed with this action?"
        confirmVariant="danger"
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Example Drawer"
        position="right"
        size="400px"
      >
        <div className="p-4">
          <p className="mb-4">This is drawer content. You can add any content here.</p>
          <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
        </div>
      </Drawer>
    </div>
  );
}
