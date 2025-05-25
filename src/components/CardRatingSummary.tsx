import React from "react";

// Perluas interface RatingSummary untuk mencakup breakdown per bintang
interface StarRatingBreakdown {
  star: number; // 1, 2, 3, 4, 5
  count: number;
}

interface RatingBreakdown {
  label: string;
  value: number; // Skala 1-10
}

interface CardRatingSummaryProps {
  score: number; // Overall score
  totalReviews: number;
  // Menambah prop untuk breakdown per bintang
  starBreakdown?: StarRatingBreakdown[]; 
  breakdown: RatingBreakdown[]; // Breakdown per kategori (skala 1-10)
}

const CardRatingSummary: React.FC<CardRatingSummaryProps> = ({ score, totalReviews, starBreakdown, breakdown }) => {
  // Data dummy atau fallback jika starBreakdown tidak tersedia
  const defaultStarBreakdown = [
    { star: 5, count: 0 },
    { star: 4, count: 0 },
    { star: 3, count: 0 },
    { star: 2, count: 0 },
    { star: 1, count: 0 },
  ];

  const effectiveStarBreakdown = starBreakdown && starBreakdown.length > 0 ? starBreakdown : defaultStarBreakdown;

  return (
    <div className="mb-6 rounded-2xl bg-white dark:bg-gray-800/90 border border-ocean/20 dark:border-ocean-dark/20 shadow-md p-6">
      <div className="text-xl font-bold mb-4 text-ocean dark:text-ocean-light">Ulasan & Rating</div>
      
      {/* Kontainer utama flexbox - selalu flex-col */}
      <div className="flex flex-col gap-6">
        {/* Total Overall Rating di paling atas */}
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-ocean dark:bg-ocean-dark text-white w-16 h-16 flex items-center justify-center text-3xl font-bold flex-shrink-0">
             {score.toFixed(1)}
          </div>
          <div>
            <div className="text-ocean dark:text-ocean-light font-bold text-lg">Mengesankan</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Dari {totalReviews} review</div>
          </div>
        </div>

        {/* Average Customer Ratings (skor per kategori) */}
        <div className="w-full space-y-3">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Average Customer Ratings</h3>
          
          {/* Breakdown per Kategori */}
          {breakdown.map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              {/* Label Kategori */}
              <div className="w-32 md:w-36 text-gray-700 dark:text-gray-300 text-sm font-medium flex-shrink-0">{item.label}</div>
              {/* Progress Bar Container */}
              <div className="flex-1 bg-gray-300 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden">
                {/* Actual Progress Bar */}
                <div
                  className="bg-yellow-400 h-3 rounded-full transition-all duration-300 ease-in-out"
                   // Skala 1-10, pastikan 0 jika value 0
                  style={{ width: `${item.value === 0 ? 0 : (item.value / 10) * 100}%` }}
                ></div>
              </div>
              {/* Nilai Rating */}
              <div className="w-10 text-ocean dark:text-ocean-light font-semibold text-sm text-right flex-shrink-0">{item.value.toFixed(1)}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* TODO: Tambahkan bagian Most Helpful Reviews jika diperlukan */}
    </div>
  );
};

export default CardRatingSummary; 