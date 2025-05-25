import React, { memo, useCallback } from 'react';
import { FixedSizeList } from 'react-window';

interface FilterListProps {
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  itemHeight?: number;
}

const FilterList: React.FC<FilterListProps> = memo(({
  items,
  selectedItems,
  onToggle,
  itemHeight = 40
}) => {
  const Row = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    const item = items[index];
    const isSelected = selectedItems.includes(item);

    return (
      <button
        type="button"
        onClick={() => onToggle(item)}
        style={{
          ...style,
          width: '100%',
          padding: '8px 16px',
          textAlign: 'left',
          backgroundColor: isSelected ? '#f3f4f6' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#374151',
          transition: 'background-color 0.2s',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = isSelected ? '#e5e7eb' : '#f9fafb';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = isSelected ? '#f3f4f6' : 'transparent';
        }}
      >
        {item}
      </button>
    );
  }, [items, selectedItems, onToggle]);

  return (
    <FixedSizeList
      height={Math.min(items.length * itemHeight, 200)}
      width="100%"
      itemCount={items.length}
      itemSize={itemHeight}
    >
      {Row}
    </FixedSizeList>
  );
});

FilterList.displayName = 'FilterList';

export default FilterList; 