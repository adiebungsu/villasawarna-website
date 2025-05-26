import React from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  // onRangeChange: (min: number, max: number) => void;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max /*, onRangeChange*/ }) => {
  // Ini adalah placeholder sederhana.
  // Untuk fungsionalitas slider yang sebenarnya, pertimbangkan menggunakan library seperti react-range atau @headlessui/react.
  return (
    <div className="mt-2 mb-4">
      <p className="text-sm text-gray-700 mb-2">Range Harga: Rp {min.toLocaleString('id-ID')} - Rp {max.toLocaleString('id-ID')}</p>
      {/* Placeholder for the actual slider input */}
      <div className="h-4 bg-gray-200 rounded-full">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
      </div>
      {/* Input fields for min/max if needed */}
      {/* <div className="flex justify-between mt-2 text-xs">
        <span>Min: {min}</span>
        <span>Max: {max}</span>
      </div> */}
    </div>
  );
};

export default PriceRangeSlider; 