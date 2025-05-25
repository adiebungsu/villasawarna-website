import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { 
  getAllDestinations, 
  getDestinationById, 
  getDestinationsByType,
  getFeaturedDestinations,
  type Destination 
} from '@/data/destinations';

// Query keys
export const destinationKeys = {
  all: ['destinations'] as const,
  lists: () => [...destinationKeys.all, 'list'] as const,
  list: (filters: string) => [...destinationKeys.lists(), { filters }] as const,
  details: () => [...destinationKeys.all, 'detail'] as const,
  detail: (id: string) => [...destinationKeys.details(), id] as const,
  featured: () => [...destinationKeys.all, 'featured'] as const,
  byType: (type: string) => [...destinationKeys.all, 'type', type] as const,
};

const ITEMS_PER_PAGE = 6;

interface PaginatedResponse {
  items: Destination[];
  nextPage: number | undefined;
  total: number;
}

type DestinationQueryKey = readonly ['destinations', 'list'] | readonly ['destinations', 'type', string];

// Custom hooks
export function useDestinations() {
  return useInfiniteQuery<PaginatedResponse, Error, PaginatedResponse, DestinationQueryKey, number>({
    queryKey: destinationKeys.lists(),
    queryFn: ({ pageParam = 0 }) => {
      const start = pageParam * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const destinations = getAllDestinations();
      return {
        items: destinations.slice(start, end),
        nextPage: end < destinations.length ? pageParam + 1 : undefined,
        total: destinations.length
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });
}

export function useDestination(id: string) {
  return useQuery({
    queryKey: destinationKeys.detail(id),
    queryFn: () => getDestinationById(id),
    enabled: !!id,
  });
}

export function useFeaturedDestinations() {
  return useQuery({
    queryKey: destinationKeys.featured(),
    queryFn: getFeaturedDestinations,
  });
}

export function useDestinationsByType(type: string) {
  return useInfiniteQuery<PaginatedResponse, Error, PaginatedResponse, DestinationQueryKey, number>({
    queryKey: destinationKeys.byType(type),
    queryFn: ({ pageParam = 0 }) => {
      const start = pageParam * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const destinations = getDestinationsByType(type);
      return {
        items: destinations.slice(start, end),
        nextPage: end < destinations.length ? pageParam + 1 : undefined,
        total: destinations.length
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    enabled: !!type,
  });
} 