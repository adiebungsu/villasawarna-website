// Utility untuk menambahkan data kunjungan demo
// Hapus file ini setelah testing selesai

export const addDemoVisits = () => {
  if (typeof window === 'undefined') return;

  const demoVisits = [
    {
      propertyId: 'villa-sinar-pelangi',
      visitCount: 3,
      lastVisited: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 jam yang lalu
    },
    {
      propertyId: 'villa-arizky-sawarna',
      visitCount: 5,
      lastVisited: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 hari yang lalu
    },
    {
      propertyId: 'villa-cempaka',
      visitCount: 2,
      lastVisited: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 hari yang lalu
    },
    {
      propertyId: 'villa-mega-aura',
      visitCount: 1,
      lastVisited: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 hari yang lalu
    },
    {
      propertyId: 'villa-sunset-beach',
      visitCount: 4,
      lastVisited: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 hari yang lalu
    }
  ];

  localStorage.setItem('property_visits', JSON.stringify(demoVisits));
  console.log('Demo visits added successfully!');
  
  // Reload page untuk melihat perubahan
  window.location.reload();
};

// Fungsi untuk menghapus data demo
export const clearDemoVisits = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('property_visits');
  console.log('Demo visits cleared!');
  
  // Reload page untuk melihat perubahan
  window.location.reload();
};

// Fungsi untuk melihat data kunjungan saat ini
export const viewCurrentVisits = () => {
  if (typeof window === 'undefined') return;
  
  const visits = localStorage.getItem('property_visits');
  console.log('Current visits:', visits ? JSON.parse(visits) : 'No visits data');
};

