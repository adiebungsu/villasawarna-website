import React from 'react';
import { cn } from '@/lib/utils';
import { Hotel, Home, Building2, Tent } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
}

const categories = [
  {
    id: 'all',
    name: 'Semua',
    icon: <Hotel className="w-5 h-5" />
  },
  {
    id: 'villa',
    name: 'Villa',
    icon: <Home className="w-5 h-5" />
  },
  {
    id: 'hotel',
    name: 'Hotel',
    icon: <Building2 className="w-5 h-5" />
  },
  {
    id: 'penginapan',
    name: 'Penginapan',
    icon: <Tent className="w-5 h-5" />
  }
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  className
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            "border border-gray-200 dark:border-gray-700",
            "hover:bg-gray-50 dark:hover:bg-gray-800",
            selectedCategory === category.id
              ? "bg-ocean text-white border-ocean hover:bg-ocean/90 dark:bg-ocean dark:text-white dark:border-ocean"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          )}
        >
          {category.icon}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter; 