import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface TimePickerProps {
  value?: string | Date | null;
  onChange?: (time: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  format?: '12h' | '24h';
  className?: string;
  step?: number;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
  placeholder,
  error,
  helperText,
  disabled = false,
  format = '24h',
  className,
  step = 1,
}) => {
  const [hours, setHours] = React.useState<number>(0);
  const [minutes, setMinutes] = React.useState<number>(0);
  const [ampm, setAmpm] = React.useState<'AM' | 'PM'>('AM');
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const pickerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (value) {
      let date: Date;
      if (typeof value === 'string') {
        const [h, m] = value.split(':').map(Number);
        date = new Date();
        date.setHours(h || 0, m || 0);
      } else {
        date = value;
      }

      if (format === '12h') {
        const h = date.getHours();
        setHours(h === 0 ? 12 : h > 12 ? h - 12 : h);
        setAmpm(h >= 12 ? 'PM' : 'AM');
      } else {
        setHours(date.getHours());
      }
      setMinutes(date.getMinutes());
    }
  }, [value, format]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const formatTime = (h: number, m: number, ampm?: 'AM' | 'PM'): string => {
    const formattedHours = format === '12h' 
      ? (h === 0 ? 12 : h > 12 ? h - 12 : h).toString().padStart(2, '0')
      : h.toString().padStart(2, '0');
    const formattedMinutes = m.toString().padStart(2, '0');
    return format === '12h' 
      ? `${formattedHours}:${formattedMinutes} ${ampm || 'AM'}`
      : `${formattedHours}:${formattedMinutes}`;
  };

  const handleTimeChange = (newHours: number, newMinutes: number, newAmpm?: 'AM' | 'PM') => {
    let finalHours = newHours;
    if (format === '12h' && newAmpm) {
      if (newAmpm === 'PM' && newHours !== 12) {
        finalHours = newHours + 12;
      } else if (newAmpm === 'AM' && newHours === 12) {
        finalHours = 0;
      }
    }

    const timeString = `${finalHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    onChange?.(timeString);
  };

  const handleHoursChange = (newHours: number) => {
    setHours(newHours);
    handleTimeChange(newHours, minutes, format === '12h' ? ampm : undefined);
  };

  const handleMinutesChange = (newMinutes: number) => {
    setMinutes(newMinutes);
    handleTimeChange(hours, newMinutes, format === '12h' ? ampm : undefined);
  };

  const handleAmpmChange = (newAmpm: 'AM' | 'PM') => {
    setAmpm(newAmpm);
    handleTimeChange(hours, minutes, newAmpm);
  };

  const displayValue = formatTime(hours, minutes, format === '12h' ? ampm : undefined);

  const hourOptions = format === '12h' 
    ? Array.from({ length: 12 }, (_, i) => i + 1)
    : Array.from({ length: 24 }, (_, i) => i);

  const minuteOptions = Array.from({ length: 60 / step }, (_, i) => i * step);

  return (
    <div className={cn('relative w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          readOnly
          value={displayValue}
          placeholder={placeholder || 'Select time'}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? 'timepicker-error' : helperText ? 'timepicker-helper' : undefined}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute z-50 mt-2 w-64 rounded-md border bg-background p-4 shadow-lg"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <label className="text-xs font-medium text-muted-foreground mb-2">Hours</label>
              <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                {hourOptions.map((h) => {
                  const displayHour = format === '12h' ? h : h;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleHoursChange(displayHour)}
                      className={cn(
                        'w-12 rounded-md px-3 py-1 text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-ring',
                        hours === displayHour && 'bg-primary text-primary-foreground'
                      )}
                    >
                      {displayHour.toString().padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            </div>
            <span className="text-2xl font-bold mt-6">:</span>
            <div className="flex flex-col items-center">
              <label className="text-xs font-medium text-muted-foreground mb-2">Minutes</label>
              <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                {minuteOptions.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleMinutesChange(m)}
                    className={cn(
                      'w-12 rounded-md px-3 py-1 text-sm transition-colors',
                      'hover:bg-accent hover:text-accent-foreground',
                      'focus:outline-none focus:ring-2 focus:ring-ring',
                      minutes === m && 'bg-primary text-primary-foreground'
                    )}
                  >
                    {m.toString().padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
            {format === '12h' && (
              <div className="flex flex-col items-center">
                <label className="text-xs font-medium text-muted-foreground mb-2">AM/PM</label>
                <div className="flex flex-col gap-1">
                  {(['AM', 'PM'] as const).map((ap) => (
                    <button
                      key={ap}
                      type="button"
                      onClick={() => handleAmpmChange(ap)}
                      className={cn(
                        'w-12 rounded-md px-3 py-1 text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:outline-none focus:ring-2 focus:ring-ring',
                        ampm === ap && 'bg-primary text-primary-foreground'
                      )}
                    >
                      {ap}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {error && (
        <p id="timepicker-error" className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id="timepicker-helper" className="text-sm text-muted-foreground mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

TimePicker.displayName = 'TimePicker';

export { TimePicker };

