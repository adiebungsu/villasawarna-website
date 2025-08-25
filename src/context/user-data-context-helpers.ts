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

export interface UserMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  messageType: 'text' | 'image' | 'file' | 'booking_request';
  attachments?: string[];
}

export interface UserConversation {
  id: string;
  type: 'property_chat' | 'support_chat' | 'booking_chat';
  participants: string[];
  propertyId?: string;
  propertyName?: string;
  propertyImage?: string;
  bookingId?: string;
  lastMessage: UserMessage;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface UserSupportTicket {
  id: string;
  category: 'booking' | 'payment' | 'technical' | 'general';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  subject: string;
  description: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  messages: UserMessage[];
}

export interface TravelPlan {
  id: string;
  title: string;
  description?: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  budget: {
    min: number;
    max: number;
    currency: 'IDR' | 'USD';
  };
  travelers: {
    adults: number;
    children: number;
    infants: number;
  };
  status: 'planning' | 'booked' | 'completed' | 'cancelled';
  accommodations: TravelAccommodation[];
  activities: TravelActivity[];
  transportation: TravelTransportation[];
  notes: string[];
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  sharedWith: string[];
}

export interface TravelAccommodation {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'planned' | 'booked' | 'confirmed';
  bookingId?: string;
  notes?: string;
}

export interface TravelActivity {
  id: string;
  name: string;
  type: 'attraction' | 'restaurant' | 'adventure' | 'culture' | 'relaxation';
  location: string;
  date: string;
  time?: string;
  duration: number; // in hours
  price: number;
  description: string;
  image?: string;
  bookingRequired: boolean;
  status: 'planned' | 'booked' | 'completed';
  notes?: string;
}

export interface TravelTransportation {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'car' | 'boat' | 'motorcycle';
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  provider: string;
  bookingReference?: string;
  price: number;
  status: 'planned' | 'booked' | 'confirmed';
  notes?: string;
}

export interface UserDataContextType {
  // Data
  bookings: UserBooking[];
  reviews: UserReview[];
  notifications: UserNotification[];
  searchFilters: UserSearchFilter[];
  stats: UserDashboardStats;
  recentActivities: UserRecentActivity[];
  conversations: UserConversation[];
  supportTickets: UserSupportTicket[];
  travelPlans: TravelPlan[];
  
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
  
  // Messaging Actions
  addConversation: (conversation: Omit<UserConversation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateConversation: (id: string, updates: Partial<UserConversation>) => void;
  deleteConversation: (id: string) => void;
  addMessage: (conversationId: string, message: Omit<UserMessage, 'id' | 'timestamp'>) => void;
  markMessageAsRead: (conversationId: string, messageId: string) => void;
  
  // Support Ticket Actions
  addSupportTicket: (ticket: Omit<UserSupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages'>) => void;
  updateSupportTicket: (id: string, updates: Partial<UserSupportTicket>) => void;
  addTicketMessage: (ticketId: string, message: Omit<UserMessage, 'id' | 'timestamp'>) => void;
  
  // Travel Planning Actions
  addTravelPlan: (plan: Omit<TravelPlan, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTravelPlan: (id: string, updates: Partial<TravelPlan>) => void;
  deleteTravelPlan: (id: string) => void;
  addAccommodation: (planId: string, accommodation: Omit<TravelAccommodation, 'id'>) => void;
  updateAccommodation: (planId: string, accommodationId: string, updates: Partial<TravelAccommodation>) => void;
  removeAccommodation: (planId: string, accommodationId: string) => void;
  addActivity: (planId: string, activity: Omit<TravelActivity, 'id'>) => void;
  updateActivity: (planId: string, activityId: string, updates: Partial<TravelActivity>) => void;
  removeActivity: (planId: string, activityId: string) => void;
  addTransportation: (planId: string, transportation: Omit<TravelTransportation, 'id'>) => void;
  updateTransportation: (planId: string, transportationId: string, updates: Partial<TravelTransportation>) => void;
  removeTransportation: (planId: string, transportationId: string) => void;
  
  // Utilities
  refreshStats: () => void;
  clearAllData: () => void;
  clearDemoData: () => void;
  emergencyCleanup: () => void;
}

