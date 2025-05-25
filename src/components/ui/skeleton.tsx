import { cn } from "@/lib/utils"

export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={className + ' bg-gray-200 animate-pulse'} />
);
