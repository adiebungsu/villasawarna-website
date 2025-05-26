import React from 'react';

interface FilterItem {
  label: string;
  count?: number;
}

interface FilterGroupProps {
  title: string;
  items: FilterItem[];
}

const FilterGroup: React.FC<FilterGroupProps> = ({ title, items }) => {
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center mb-1">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              {item.label}
            </label>
            {item.count !== undefined && <span className="text-gray-600 text-sm">({item.count})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterGroup; 