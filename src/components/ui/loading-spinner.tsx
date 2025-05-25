import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const LoadingSpinner = ({ size = 'md', className, text }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-4 border-gray-200",
          "border-t-primary",
          sizeClasses[size]
        )}
      />
      {text && (
        <p className="mt-2 text-sm text-gray-500">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner; 