import React from 'react';
import { cn } from '../lib/utils/cn';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  accessor?: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  render?: (value: any, row: T, index: number) => React.ReactNode;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  sortable?: boolean;
  onSort?: (column: string, direction: SortDirection) => void;
  sortColumn?: string;
  sortDirection?: SortDirection;
  selectable?: boolean;
  selectedRows?: Set<string | number>;
  onRowSelect?: (row: T, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  rowKey?: (row: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  onRowClick?: (row: T, index: number) => void;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  sortable = false,
  onSort,
  sortColumn,
  sortDirection,
  selectable = false,
  selectedRows = new Set(),
  onRowSelect,
  onSelectAll,
  rowKey,
  emptyMessage = 'No data available',
  className,
  headerClassName,
  rowClassName,
  onRowClick,
  searchable = false,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
}: TableProps<T>) => {
  const handleSort = (columnKey: string) => {
    if (!sortable || !onSort) return;

    let newDirection: SortDirection = 'asc';
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        newDirection = 'desc';
      } else if (sortDirection === 'desc') {
        newDirection = null;
      }
    }

    onSort(columnKey, newDirection);
  };

  const getRowKey = (row: T, index: number): string | number => {
    if (rowKey) {
      return rowKey(row, index);
    }
    return (row as any).id || index;
  };

  const isRowSelected = (row: T, index: number): boolean => {
    const key = getRowKey(row, index);
    return selectedRows.has(key);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSelectAll) {
      onSelectAll(e.target.checked);
    }
  };

  const allSelected = data.length > 0 && data.every((row, index) => isRowSelected(row, index));
  const someSelected = data.some((row, index) => isRowSelected(row, index));

  const getCellValue = (column: TableColumn<T>, row: T, index: number): React.ReactNode => {
    if (column.render) {
      return column.render(column.accessor ? (typeof column.accessor === 'function' ? column.accessor(row) : row[column.accessor]) : undefined, row, index);
    }

    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }

    if (column.accessor) {
      return row[column.accessor];
    }

    return null;
  };

  return (
    <div className={cn('w-full', className)}>
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            value={searchValue || ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full max-w-sm h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      )}
      <div className="rounded-md border overflow-x-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className={cn('border-b', headerClassName)}>
            <tr>
              {selectable && (
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someSelected && !allSelected;
                    }}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-input"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'h-12 px-4 text-left align-middle font-medium text-muted-foreground',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.sortable && sortable && 'cursor-pointer hover:bg-muted/50',
                    column.width && `w-[${column.width}]`
                  )}
                  style={column.width ? { width: typeof column.width === 'number' ? `${column.width}px` : column.width } : undefined}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {column.sortable && sortable && (
                      <span className="flex flex-col">
                        <svg
                          className={cn(
                            'h-3 w-3',
                            sortColumn === column.key && sortDirection === 'asc' ? 'text-foreground' : 'text-muted-foreground opacity-30'
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        <svg
                          className={cn(
                            'h-3 w-3 -mt-1',
                            sortColumn === column.key && sortDirection === 'desc' ? 'text-foreground' : 'text-muted-foreground opacity-30'
                          )}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                const key = getRowKey(row, rowIndex);
                const isSelected = isRowSelected(row, rowIndex);
                const rowClass = typeof rowClassName === 'function' ? rowClassName(row, rowIndex) : rowClassName;

                return (
                  <tr
                    key={key}
                    className={cn(
                      'border-b transition-colors',
                      onRowClick && 'cursor-pointer hover:bg-muted/50',
                      isSelected && 'bg-muted/50',
                      rowClass
                    )}
                    onClick={() => onRowClick?.(row, rowIndex)}
                  >
                    {selectable && (
                      <td className="px-4 py-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => onRowSelect?.(row, e.target.checked)}
                          onClick={(e) => e.stopPropagation()}
                          className="h-4 w-4 rounded border-input"
                          aria-label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          'px-4 py-2 align-middle',
                          column.align === 'center' && 'text-center',
                          column.align === 'right' && 'text-right'
                        )}
                      >
                        {getCellValue(column, row, rowIndex)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.displayName = 'Table';

export { Table };

