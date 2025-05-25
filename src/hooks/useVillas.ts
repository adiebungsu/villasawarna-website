import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getVillasData } from '@/data/properties';
import type { Property } from '@/types/property';

// Query keys
export const villaKeys = {
  all: ['villas'] as const,
  lists: () => [...villaKeys.all, 'list'] as const,
  list: (filters: string) => [...villaKeys.lists(), { filters }] as const,
  details: () => [...villaKeys.all, 'detail'] as const,
  detail: (id: string) => [...villaKeys.details(), id] as const,
};

// Custom hook untuk mendapatkan semua villa
export function useVillas() {
  return useQuery<Property[]>({
    queryKey: villaKeys.lists(),
    queryFn: () => getVillasData(),
    staleTime: 1000 * 60 * 5, // Data dianggap fresh selama 5 menit
    gcTime: 1000 * 60 * 30, // Cache disimpan selama 30 menit
  });
}

// Custom hook untuk mendapatkan villa berdasarkan ID
export function useVilla(id: string) {
  return useQuery<Property>({
    queryKey: villaKeys.detail(id),
    queryFn: () => {
      const villas = getVillasData();
      const villa = villas.find(v => v.id === id);
      if (!villa) throw new Error('Villa tidak ditemukan');
      return villa;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

// Custom hook untuk mendapatkan villa yang difilter
export function useFilteredVillas(filters: {
  priceMin?: number;
  priceMax?: number;
  capacity?: number;
  amenities?: string[];
  rating?: number;
}) {
  const queryClient = useQueryClient();
  
  return useQuery<Property[]>({
    queryKey: villaKeys.list(JSON.stringify(filters)),
    queryFn: () => {
      const villas = getVillasData();
      return villas.filter(villa => {
        if (filters.priceMin && villa.price < filters.priceMin) return false;
        if (filters.priceMax && villa.price > filters.priceMax) return false;
        if (filters.capacity && villa.capacity < filters.capacity) return false;
        if (filters.rating && villa.rating < filters.rating) return false;
        if (filters.amenities?.length) {
          return filters.amenities.every(amenity => 
            villa.amenities?.includes(amenity)
          );
        }
        return true;
      });
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
}

// Prefetch villa data
export function prefetchVilla(queryClient: ReturnType<typeof useQueryClient>, id: string) {
  return queryClient.prefetchQuery<Property>({
    queryKey: villaKeys.detail(id),
    queryFn: () => {
      const villas = getVillasData();
      const villa = villas.find(v => v.id === id);
      if (!villa) throw new Error('Villa tidak ditemukan');
      return villa;
    },
  });
} 