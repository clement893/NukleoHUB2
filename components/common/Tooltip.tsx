import React from 'react';
import { cn } from '@/lib/utils/cn';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  children: React.ReactElement;
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  showArrow?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 200,
  disabled = false,
  className,
  contentClassName,
  showArrow = true,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;
    timeoutRef.current = setTimeout(() => {
      setIsMounted(true);
      setTimeout(() => setIsVisible(true), 10);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
    setTimeout(() => setIsMounted(false), 200);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-background border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-background border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-background border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-background border-t-transparent border-b-transparent border-l-transparent',
  };

  const childElement = React.cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent) => {
      showTooltip();
      if (children.props.onMouseEnter) {
        children.props.onMouseEnter(e);
      }
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hideTooltip();
      if (children.props.onMouseLeave) {
        children.props.onMouseLeave(e);
      }
    },
    onFocus: (e: React.FocusEvent) => {
      showTooltip();
      if (children.props.onFocus) {
        children.props.onFocus(e);
      }
    },
    onBlur: (e: React.FocusEvent) => {
      hideTooltip();
      if (children.props.onBlur) {
        children.props.onBlur(e);
      }
    },
  } as any);

  return (
    <div className={cn('relative inline-block', className)}>
      {childElement}
      {isMounted && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute z-50 px-3 py-1.5 text-sm text-background bg-foreground rounded-md shadow-md pointer-events-none transition-opacity',
            positionClasses[position],
            isVisible ? 'opacity-100' : 'opacity-0',
            contentClassName
          )}
          role="tooltip"
        >
          {content}
          {showArrow && (
            <div
              className={cn(
                'absolute w-0 h-0 border-4',
                arrowClasses[position]
              )}
            />
          )}
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = 'Tooltip';

export { Tooltip };

