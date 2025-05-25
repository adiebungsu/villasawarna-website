export type Theme = 'light' | 'dark' | 'system' | 'auto';

// Fungsi untuk mengecek apakah sekarang malam hari (18:00 - 06:00)
export const isNightTime = () => {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6;
};

// Fungsi untuk mendapatkan tema yang aktif berdasarkan pengaturan
export const getActiveTheme = (currentTheme: Theme): 'light' | 'dark' => {
  switch (currentTheme) {
    case 'system':
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    case 'auto':
      return isNightTime() ? 'dark' : 'light';
    default:
      return currentTheme as 'light' | 'dark';
  }
}; 