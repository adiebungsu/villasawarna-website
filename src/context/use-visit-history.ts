import { useState, useEffect } from 'react';
import { getAllProperties, Property } from '@/data/properties';

export interface VisitHistoryItem {
  id: string;
  propertyId: string;
  villaName: string;
  villaImage: string;
  villaUrl: string;
  visitDate: string;
  visitDuration: string;
  lastViewed: string;
  viewCount: number;
  isBookmarked: boolean;
}

interface PropertyVisit {
  propertyId: string;
  visitCount: number;
  lastVisited: string;
}

const VISIT_STORAGE_KEY = 'property_visits';

export const useVisitHistory = () => {
  const [visitHistory, setVisitHistory] = useState<VisitHistoryItem[]>([]);

  // Fungsi untuk mendapatkan data kunjungan dari localStorage
  const getPropertyVisits = (): PropertyVisit[] => {
    if (typeof window === 'undefined') return [];
    const visits = localStorage.getItem(VISIT_STORAGE_KEY);
    return visits ? JSON.parse(visits) : [];
  };

  // Fungsi untuk menambah kunjungan
  const incrementPropertyVisit = (propertyId: string) => {
    if (typeof window === 'undefined') return;
    
    const visits = getPropertyVisits();
    const existingVisit = visits.find(v => v.propertyId === propertyId);
    
    if (existingVisit) {
      existingVisit.visitCount += 1;
      existingVisit.lastVisited = new Date().toISOString();
    } else {
      visits.push({
        propertyId,
        visitCount: 1,
        lastVisited: new Date().toISOString()
      });
    }
    
    localStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(visits));
    loadVisitHistory(); // Reload data setelah update
  };

  // Fungsi untuk memuat riwayat kunjungan
  const loadVisitHistory = () => {
    const visits = getPropertyVisits();
    const allProperties = getAllProperties();
    
    // Filter hanya properti yang pernah dikunjungi
    const visitedProperties = visits
      .filter(visit => visit.visitCount > 0)
      .map(visit => {
        const property = allProperties.find(p => p.id === visit.propertyId);
        if (!property) return null;

        // Hitung durasi kunjungan (simulasi)
        const lastVisited = new Date(visit.lastVisited);
        const now = new Date();
        const timeDiff = now.getTime() - lastVisited.getTime();
        const minutesDiff = Math.floor(timeDiff / (1000 * 60));
        
        let visitDuration = '';
        if (minutesDiff < 60) {
          visitDuration = `${minutesDiff} menit`;
        } else if (minutesDiff < 1440) {
          const hours = Math.floor(minutesDiff / 60);
          visitDuration = `${hours} jam`;
        } else {
          const days = Math.floor(minutesDiff / 1440);
          visitDuration = `${days} hari`;
        }

        // Hitung waktu terakhir dilihat
        let lastViewed = '';
        if (minutesDiff < 60) {
          lastViewed = `${minutesDiff} menit yang lalu`;
        } else if (minutesDiff < 1440) {
          const hours = Math.floor(minutesDiff / 60);
          lastViewed = `${hours} jam yang lalu`;
        } else {
          const days = Math.floor(minutesDiff / 1440);
          lastViewed = `${days} hari yang lalu`;
        }

        // Cek apakah ada di wishlist (dari localStorage)
        const wishlistData = localStorage.getItem('wishlist_data');
        let isBookmarked = false;
        if (wishlistData) {
          try {
            const wishlist = JSON.parse(wishlistData);
            isBookmarked = wishlist.some((folder: any) => 
              folder.items.some((item: any) => item.propertyId === visit.propertyId)
            );
          } catch (e) {
            console.error('Error parsing wishlist data:', e);
          }
        }

        return {
          id: visit.propertyId,
          propertyId: visit.propertyId,
          villaName: property.name,
          villaImage: property.images?.[0] || property.image || 'https://i.imgur.com/KNZs2rS.jpeg',
          villaUrl: `/villas/${visit.propertyId}`,
          visitDate: visit.lastVisited,
          visitDuration,
          lastViewed,
          viewCount: visit.visitCount,
          isBookmarked
        };
      })
      .filter(Boolean) as VisitHistoryItem[];

    // Urutkan berdasarkan kunjungan terbaru
    const sortedHistory = visitedProperties.sort((a, b) => 
      new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime()
    );

    setVisitHistory(sortedHistory);
  };

  // Load data saat hook pertama kali digunakan
  useEffect(() => {
    loadVisitHistory();
  }, []);

  // Reload data setiap kali localStorage berubah
  useEffect(() => {
    const handleStorageChange = () => {
      loadVisitHistory();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    visitHistory,
    incrementPropertyVisit,
    loadVisitHistory,
    totalVisits: visitHistory.reduce((sum, visit) => sum + visit.viewCount, 0),
    uniquePropertiesVisited: visitHistory.length
  };
};

