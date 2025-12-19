import React from 'react';
import { cn } from '../lib/utils/cn';

export interface AccordionItem {
  value: string;
  header: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  itemClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  showIcon?: boolean;
  iconPosition?: 'left' | 'right';
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  type = 'single',
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  itemClassName,
  headerClassName,
  contentClassName,
  showIcon = true,
  iconPosition = 'right',
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = React.useState<string | string[]>(() => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    if (type === 'multiple') {
      return items.filter((item) => item.defaultOpen).map((item) => item.value);
    }
    return items.find((item) => item.defaultOpen)?.value || '';
  });

  const currentValue = isControlled ? controlledValue : internalValue;

  const isItemOpen = (itemValue: string): boolean => {
    if (type === 'multiple') {
      const values = Array.isArray(currentValue) ? currentValue : [];
      return values.includes(itemValue);
    }
    return currentValue === itemValue;
  };

  const handleToggle = (itemValue: string) => {
    let newValue: string | string[];

    if (type === 'multiple') {
      const currentValues = Array.isArray(currentValue) ? currentValue : [];
      if (currentValues.includes(itemValue)) {
        newValue = currentValues.filter((v) => v !== itemValue);
      } else {
        newValue = [...currentValues, itemValue];
      }
    } else {
      newValue = isItemOpen(itemValue) ? '' : itemValue;
    }

    if (!isControlled) {
      setInternalValue(newValue);
    }

    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className={cn('w-full space-y-2', className)}>
      {items.map((item) => {
        const isOpen = isItemOpen(item.value);
        const isDisabled = item.disabled;

        return (
          <div
            key={item.value}
            className={cn('border rounded-md overflow-hidden', itemClassName)}
          >
            <button
              type="button"
              onClick={() => !isDisabled && handleToggle(item.value)}
              disabled={isDisabled}
              className={cn(
                'flex w-full items-center justify-between px-4 py-3 text-left font-medium transition-colors',
                'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isDisabled && 'cursor-not-allowed opacity-50',
                headerClassName
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.value}`}
              id={`accordion-header-${item.value}`}
            >
              <div className="flex items-center gap-3 flex-1">
                {showIcon && iconPosition === 'left' && item.icon && (
                  <span className="flex-shrink-0">{item.icon}</span>
                )}
                <span className="flex-1">{item.header}</span>
              </div>
              {showIcon && (
                <svg
                  className={cn(
                    'h-4 w-4 flex-shrink-0 transition-transform',
                    isOpen && 'rotate-180',
                    iconPosition === 'left' && 'ml-2'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {showIcon && iconPosition === 'right' && item.icon && (
                <span className="ml-2 flex-shrink-0">{item.icon}</span>
              )}
            </button>
            <div
              id={`accordion-content-${item.value}`}
              role="region"
              aria-labelledby={`accordion-header-${item.value}`}
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className={cn('px-4 py-3', contentClassName)}>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = 'Accordion';

export { Accordion };

