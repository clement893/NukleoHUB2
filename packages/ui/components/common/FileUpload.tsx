import React from 'react';
import { cn } from '../lib/utils/cn';

export interface FileUploadProps {
  onFileSelect?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  dragAndDrop?: boolean;
  showPreview?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept,
  multiple = false,
  maxSize,
  label,
  error,
  helperText,
  disabled = false,
  dragAndDrop = true,
  showPreview = true,
  className,
  children,
}) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const dropZoneRef = React.useRef<HTMLDivElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File ${file.name} exceeds maximum size of ${(maxSize / 1024 / 1024).toFixed(2)}MB`;
    }
    return null;
  };

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newFiles = Array.from(fileList);
    const errors: string[] = [];

    newFiles.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(error);
      }
    });

    if (errors.length > 0) {
      setErrorMessage(errors.join(', '));
      return;
    }

    setErrorMessage('');
    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updatedFiles);
    onFileSelect?.(updatedFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFileSelect?.(updatedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFilePreview = (file: File): string | null => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    return null;
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-2">
          {label}
        </label>
      )}
      <div
        ref={dropZoneRef}
        onDragOver={dragAndDrop ? handleDragOver : undefined}
        onDragLeave={dragAndDrop ? handleDragLeave : undefined}
        onDrop={dragAndDrop ? handleDrop : undefined}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors cursor-pointer',
          isDragging && 'border-primary bg-primary/5',
          !isDragging && 'border-input hover:border-primary/50',
          disabled && 'cursor-not-allowed opacity-50',
          error && 'border-destructive'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />
        {children || (
          <>
            <svg
              className="h-12 w-12 text-muted-foreground mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm font-medium text-foreground mb-1">
              {dragAndDrop ? 'Drag and drop files here' : 'Click to upload'}
            </p>
            <p className="text-xs text-muted-foreground">
              {multiple ? 'Multiple files allowed' : 'Single file only'}
              {maxSize && ` • Max size: ${(maxSize / 1024 / 1024).toFixed(2)}MB`}
            </p>
          </>
        )}
      </div>
      {(error || errorMessage) && (
        <p className="text-sm text-destructive mt-1">{error || errorMessage}</p>
      )}
      {helperText && !error && !errorMessage && (
        <p className="text-sm text-muted-foreground mt-1">{helperText}</p>
      )}
      {showPreview && files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => {
            const preview = getFilePreview(file);
            return (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 rounded-md border p-3"
              >
                {preview ? (
                  <img src={preview} alt={file.name} className="h-12 w-12 rounded object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                    <svg className="h-6 w-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  className="rounded-md p-1 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

FileUpload.displayName = 'FileUpload';

export { FileUpload };

