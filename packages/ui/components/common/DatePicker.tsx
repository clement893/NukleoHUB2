import React from 'react';
import { cn } from '../lib/utils/cn';

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showTime?: boolean;
  className?: string;
  format?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  error,
  helperText,
  disabled = false,
  minDate,
  maxDate,
  showTime = false,
  className,
  format,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(value || null);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const inputRef = React.useRef<HTMLInputElement>(null);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setSelectedDate(value || null);
    if (value) {
      setCurrentMonth(new Date(value));
    }
  }, [value]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
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

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    if (format) {
      // Simple format implementation
      return format
        .replace('YYYY', date.getFullYear().toString())
        .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
        .replace('DD', String(date.getDate()).padStart(2, '0'));
    }
    return date.toLocaleDateString();
  };

  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (date1: Date | null, date2: Date | null): boolean => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (!isDateDisabled(newDate)) {
      setSelectedDate(newDate);
      onChange?.(newDate);
      if (!showTime) {
        setIsOpen(false);
      }
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
          value={selectedDate ? formatDate(selectedDate) : ''}
          placeholder={placeholder}
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
          aria-invalid={!!error}
          aria-describedby={error ? 'datepicker-error' : helperText ? 'datepicker-helper' : undefined}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute z-50 mt-2 w-80 rounded-md border bg-background p-4 shadow-lg"
        >
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="rounded-md p-1 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-sm font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              type="button"
              onClick={handleNextMonth}
              className="rounded-md p-1 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map((_, index) => (
              <div key={`empty-${index}`} />
            ))}
            {days.map((day) => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isSelected = isSameDay(selectedDate, date);
              const isDisabled = isDateDisabled(date);
              const isToday = isSameDay(date, new Date());

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  disabled={isDisabled}
                  className={cn(
                    'h-9 w-9 rounded-md text-sm transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    'focus:outline-none focus:ring-2 focus:ring-ring',
                    isSelected && 'bg-primary text-primary-foreground',
                    isToday && !isSelected && 'border border-primary',
                    isDisabled && 'cursor-not-allowed opacity-50'
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {error && (
        <p id="datepicker-error" className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id="datepicker-helper" className="text-sm text-muted-foreground mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';

export { DatePicker };

