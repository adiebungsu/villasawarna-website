import { propertyRoomTypes } from '@/data/roomTypes';

// Fungsi untuk mengambil harga termurah dari roomTypes jika ada
export function getLowestRoomPrice(propertyId: string, fallbackPrice: number) {
  const roomTypes = propertyRoomTypes[propertyId];
  if (roomTypes && roomTypes.length > 0) {
    return Math.min(...roomTypes.map(room => room.price));
  }
  return fallbackPrice;
} 