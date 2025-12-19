import React from 'react';
import { cn } from '@/lib/utils/cn';

export interface DropdownMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  divider?: boolean;
  children?: DropdownMenuItem[];
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItem[];
  align?: 'left' | 'right' | 'center';
  position?: 'top' | 'bottom';
  className?: string;
  itemClassName?: string;
  onOpenChange?: (open: boolean) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  items,
  align = 'left',
  position = 'bottom',
  className,
  itemClassName,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setExpandedItems(new Set());
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onOpenChange]);

  const handleItemClick = (item: DropdownMenuItem) => {
    if (item.disabled) return;

    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
      return;
    }

    if (item.onClick) {
      item.onClick();
    }

    setIsOpen(false);
    setExpandedItems(new Set());
    onOpenChange?.(false);
  };

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
  };

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  const renderMenuItem = (item: DropdownMenuItem, level = 0): React.ReactNode => {
    if (item.divider) {
      return <div key={item.id} className="my-1 h-px bg-border" />;
    }

    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);

    return (
      <div key={item.id}>
        <button
          type="button"
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
          className={cn(
            'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            'focus:bg-accent focus:text-accent-foreground focus:outline-none',
            item.disabled && 'cursor-not-allowed opacity-50',
            level > 0 && 'pl-6',
            itemClassName
          )}
        >
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <span className="flex-1 text-left">{item.label}</span>
          {hasChildren && (
            <svg
              className={cn('h-4 w-4 transition-transform', isExpanded && 'rotate-90')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="ml-2 mt-1 space-y-1 border-l border-border pl-2">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        ref={triggerRef}
        onClick={() => {
          setIsOpen(!isOpen);
          onOpenChange?.(!isOpen);
        }}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            'absolute z-50 min-w-[200px] rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
            positionClasses[position],
            alignClasses[align]
          )}
          role="menu"
          aria-orientation="vertical"
        >
          {items.map((item) => renderMenuItem(item))}
        </div>
      )}
    </div>
  );
};

DropdownMenu.displayName = 'DropdownMenu';

export { DropdownMenu };

