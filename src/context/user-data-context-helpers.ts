export interface UserBooking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  bookingDate: string;
  paymentStatus: 'paid' | 'pending' | 'failed';
  specialRequests?: string;
}

export interface UserReview {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  rating: number;
  comment: string;
  reviewDate: string;
  helpful: number;
  verified: boolean;
}

export interface UserNotification {
  id: string;
  type: 'booking' | 'review' | 'wishlist' | 'search' | 'payment' | 'support' | 'promo' | 'reminder' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  action?: string;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface UserSearchFilter {
  id: string;
  name: string;
  filters: {
    location?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    propertyType?: string[];
  };
  createdAt: string;
  lastUsed?: string;
}

export interface UserDashboardStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalReviews: number;
  averageRating: number;
  wishlistItems: number;
  savedSearches: number;
  unreadNotifications: number;
  totalSpent: number;
  memberSince: string;
  memberLevel: string;
  loyaltyPoints: number;
}

export interface UserRecentActivity {
  id: string;
  type: 'booking' | 'review' | 'wishlist' | 'search' | 'payment' | 'support';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  status?: 'success' | 'pending' | 'failed';
  relatedId?: string;
}

export interface UserDataContextType {
  // Data
  bookings: UserBooking[];
  reviews: UserReview[];
  notifications: UserNotification[];
  searchFilters: UserSearchFilter[];
  stats: UserDashboardStats;
  recentActivities: UserRecentActivity[];
  
  // Actions
  addBooking: (booking: Omit<UserBooking, 'id'>) => void;
  updateBooking: (id: string, updates: Partial<UserBooking>) => void;
  cancelBooking: (id: string) => void;
  
  addReview: (review: Omit<UserReview, 'id'>) => void;
  updateReview: (id: string, updates: Partial<UserReview>) => void;
  deleteReview: (id: string) => void;
  
  addNotification: (notification: Omit<UserNotification, 'id' | 'timestamp'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  deleteNotification: (id: string) => void;
  
  saveSearchFilter: (filter: Omit<UserSearchFilter, 'id' | 'createdAt'>) => void;
  deleteSearchFilter: (id: string) => void;
  
  // Utilities
  refreshStats: () => void;
  clearAllData: () => void;
  clearDemoData: () => void;
}

