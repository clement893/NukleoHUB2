import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/cn';

const selectVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        error: 'border-destructive focus:ring-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: SelectOption[];
  placeholder?: string;
  searchable?: boolean;
  onChange?: (value: string) => void;
  renderOption?: (option: SelectOption) => React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      fullWidth = true,
      options,
      placeholder = 'Select an option...',
      searchable = false,
      variant,
      onChange,
      value,
      renderOption,
      ...props
  },
    ref
  ) => {
    const selectId = props.id || React.useId();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLSelectElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const combinedRef = React.useCallback(
      (node: HTMLSelectElement | null) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLSelectElement | null>).current = node;
        }
        selectRef.current = node;
      },
      [ref]
    );

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchTerm) return options;
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm, searchable]);

    const groupedOptions = React.useMemo(() => {
      const groups: Record<string, SelectOption[]> = {};
      const ungrouped: SelectOption[] = [];

      filteredOptions.forEach((option) => {
        if (option.group) {
          if (!groups[option.group]) {
            groups[option.group] = [];
          }
          groups[option.group].push(option);
        } else {
          ungrouped.push(option);
        }
      });

      return { groups, ungrouped };
    }, [filteredOptions]);

    const selectedOption = options.find((opt) => opt.value === value);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm('');
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      if (onChange) {
        onChange(newValue);
      }
      setIsOpen(false);
      setSearchTerm('');
    };

    if (searchable) {
      return (
        <div className={cn('relative', fullWidth && 'w-full')}>
          {label && (
            <label htmlFor={selectId} className="block text-sm font-medium text-foreground mb-2">
              {label}
              {props.required && <span className="text-destructive">*</span>}
            </label>
          )}
          <div className="relative">
            <select
              id={selectId}
              ref={combinedRef}
              className={cn(selectVariants({ variant: error ? 'error' : variant, className }))}
              value={value}
              onChange={handleSelectChange}
              aria-invalid={!!error}
              aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
              {...props}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {Object.entries(groupedOptions.groups).map(([groupName, groupOptions]) => (
                <optgroup key={groupName} label={groupName}>
                  {groupOptions.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                      {renderOption ? renderOption(option) : option.label}
                    </option>
                  ))}
                </optgroup>
              ))}
              {groupedOptions.ungrouped.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {renderOption ? renderOption(option) : option.label}
                </option>
              ))}
            </select>
            {error && (
              <p id={`${selectId}-error`} className="text-sm text-destructive mt-1">
                {error}
              </p>
            )}
            {helperText && !error && (
              <p id={`${selectId}-helper`} className="text-sm text-muted-foreground mt-1">
                {helperText}
              </p>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-foreground mb-2">
            {label}
            {props.required && <span className="text-destructive">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={combinedRef}
            className={cn(selectVariants({ variant: error ? 'error' : variant, className }))}
            value={value}
            onChange={handleSelectChange}
            aria-invalid={!!error}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {Object.entries(groupedOptions.groups).map(([groupName, groupOptions]) => (
              <optgroup key={groupName} label={groupName}>
                {groupOptions.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {renderOption ? renderOption(option) : option.label}
                  </option>
                ))}
              </optgroup>
            ))}
            {groupedOptions.ungrouped.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {renderOption ? renderOption(option) : option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p id={`${selectId}-error`} className="text-sm text-destructive mt-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${selectId}-helper`} className="text-sm text-muted-foreground mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select, selectVariants };

