export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-ocean border-t-transparent rounded-full animate-spin dark:border-ocean-light" />
        <p className="mt-4 text-foreground dark:text-gray-300">Memuat...</p>
      </div>
    </div>
  );
} 