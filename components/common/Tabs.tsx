import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const tabsListVariants = cva('inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const tabTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      orientation: {
        horizontal: 'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        vertical: 'w-full justify-start data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  content?: React.ReactNode;
}

export interface TabsProps extends VariantProps<typeof tabsListVariants> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  defaultValue,
  value: controlledValue,
  onValueChange,
  orientation = 'horizontal',
  className,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || items[0]?.value || '');
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  const currentTab = items.find((item) => item.value === currentValue);

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(tabsListVariants({ orientation }))} role="tablist" aria-orientation={orientation}>
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={currentValue === item.value}
            aria-controls={`tab-content-${item.value}`}
            disabled={item.disabled}
            onClick={() => !item.disabled && handleValueChange(item.value)}
            data-state={currentValue === item.value ? 'active' : 'inactive'}
            className={cn(tabTriggerVariants({ orientation }))}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>
      {currentTab?.content && (
        <div
          id={`tab-content-${currentValue}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentValue}`}
          className="mt-4"
        >
          {currentTab.content}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = 'Tabs';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

const TabsContent: React.FC<TabsContentProps> = ({ value, children, className, ...props }) => {
  return (
    <div
      className={cn('mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}
      role="tabpanel"
      {...props}
    >
      {children}
    </div>
  );
};

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsContent, tabsListVariants, tabTriggerVariants };

