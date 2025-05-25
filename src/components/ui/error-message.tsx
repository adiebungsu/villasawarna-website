import { AlertCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onDismiss?: () => void;
  className?: string;
  variant?: 'default' | 'destructive' | 'warning';
}

const ErrorMessage = ({
  title = 'Terjadi Kesalahan',
  message,
  onDismiss,
  className,
  variant = 'default'
}: ErrorMessageProps) => {
  const variantClasses = {
    default: 'bg-red-50 text-red-800 border-red-200',
    destructive: 'bg-red-100 text-red-900 border-red-300',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200'
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-4',
        variantClasses[variant],
        className
      )}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">{title}</h3>
          )}
          <div className="mt-2 text-sm">
            <p>{message}</p>
          </div>
        </div>
        {onDismiss && (
          <div className="ml-auto pl-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onDismiss}
              className="h-5 w-5"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Tutup</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage; 