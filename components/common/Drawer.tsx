import React from 'react';
import { cn } from '@/lib/utils/cn';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  position?: DrawerPosition;
  size?: string | number;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  title,
  position = 'right',
  size,
  showOverlay = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  headerClassName,
  bodyClassName,
}) => {
  React.useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getSizeStyle = (): React.CSSProperties => {
    if (!size) return {};
    const sizeValue = typeof size === 'number' ? `${size}px` : size;
    
    if (position === 'left' || position === 'right') {
      return { width: sizeValue };
    }
    return { height: sizeValue };
  };

  const positionClasses = {
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
  };

  const defaultSizes = {
    left: 'w-80',
    right: 'w-80',
    top: 'h-80',
    bottom: 'h-80',
  };

  const animationClasses = {
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    top: isOpen ? 'translate-y-0' : '-translate-y-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full',
  };

  return (
    <>
      {showOverlay && (
        <div
          className="fixed inset-0 z-40 bg-black/50 transition-opacity"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />
      )}
      <div
        className={cn(
          'fixed z-50 bg-background shadow-lg transition-transform duration-300 ease-in-out',
          positionClasses[position],
          !size && defaultSizes[position],
          animationClasses[position],
          className
        )}
        style={getSizeStyle()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
      >
        {title && (
          <div className={cn('flex items-center justify-between border-b p-4', headerClassName)}>
            <h2 id="drawer-title" className="text-lg font-semibold text-foreground">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Close drawer"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className={cn('overflow-y-auto', title ? 'h-[calc(100%-73px)]' : 'h-full', bodyClassName)}>
          {children}
        </div>
      </div>
    </>
  );
};

Drawer.displayName = 'Drawer';

export { Drawer };

