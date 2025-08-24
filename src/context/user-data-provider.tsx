import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './use-auth';
import { useWishlist } from './use-wishlist';
import { useVisitHistory } from './use-visit-history';
import { 
  UserDataContextType, 
  UserBooking, 
  UserReview, 
  UserNotification, 
  UserSearchFilter, 
  UserDashboardStats, 
  UserRecentActivity 
} from './user-data-context-helpers';
import { useToast } from '@/components/ui/use-toast';
import { 
  Calendar, 
  Star, 
  Heart, 
  Search, 
  CreditCard, 
  MessageSquare,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

interface UserDataProviderProps {
  children: ReactNode;
}

export const UserDataProvider: React.FC<UserDataProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { wishlistFolders } = useWishlist();
  const { visitHistory } = useVisitHistory();
  const { toast } = useToast();

  // State for user data
  const [bookings, setBookings] = useState<UserBooking[]>([]);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [searchFilters, setSearchFilters] = useState<UserSearchFilter[]>([]);
  const [stats, setStats] = useState<UserDashboardStats>({
    totalBookings: 0,
    completedBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    totalReviews: 0,
    averageRating: 0,
    wishlistItems: 0,
    savedSearches: 0,
    unreadNotifications: 0,
    totalSpent: 0,
    memberSince: '',
    memberLevel: 'Bronze',
    loyaltyPoints: 0
  });
  const [recentActivities, setRecentActivities] = useState<UserRecentActivity[]>([]);
  
  // Flag to prevent auto-generation during cleanup
  const [isClearingData, setIsClearingData] = useState(false);

  // Load user data from localStorage when user changes
  useEffect(() => {
    if (user) {
      loadUserData();
      // Don't auto-initialize demo data - let users start with clean slate
      // Demo data can be added manually if needed for testing
    } else {
      clearAllData();
    }
  }, [user]);

  // Update stats when data changes
  useEffect(() => {
    if (user) {
      refreshStats();
    }
  }, [bookings, reviews, notifications, searchFilters, wishlistFolders, user]);

  // Load user data from localStorage
  const loadUserData = () => {
    if (!user) return;

    try {
      const userBookings = localStorage.getItem(`user_bookings_${user.id}`);
      const userReviews = localStorage.getItem(`user_reviews_${user.id}`);
      const userNotifications = localStorage.getItem(`user_notifications_${user.id}`);
      const userSearchFilters = localStorage.getItem(`user_search_filters_${user.id}`);
      const userStats = localStorage.getItem(`user_stats_${user.id}`);
      const userActivities = localStorage.getItem(`user_activities_${user.id}`);

      if (userBookings) setBookings(JSON.parse(userBookings));
      if (userReviews) setReviews(JSON.parse(userReviews));
      if (userNotifications) setNotifications(JSON.parse(userNotifications));
      if (userSearchFilters) setSearchFilters(JSON.parse(userSearchFilters));
      if (userStats) setStats(JSON.parse(userStats));
      if (userActivities) setRecentActivities(JSON.parse(userActivities));
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  // Save user data to localStorage
  const saveUserData = (key: string, data: any) => {
    if (!user) return;
    localStorage.setItem(`user_${key}_${user.id}`, JSON.stringify(data));
  };

  // Initialize demo data for new users
  const initializeDemoData = () => {
    if (!user) return;

    const demoBookings: UserBooking[] = [
      {
        id: '1',
        propertyId: 'villa-sinar-pelangi',
        propertyName: 'Villa Sinar Pelangi',
        propertyImage: 'https://i.imgur.com/KNZs2rS.jpeg',
        checkIn: '2024-03-20',
        checkOut: '2024-03-22',
        guests: 8,
        totalPrice: 2500000,
        status: 'confirmed',
        bookingDate: '2024-03-15',
        paymentStatus: 'paid'
      },
      {
        id: '2',
        propertyId: 'villa-arizky-sawarna',
        propertyName: 'Villa Arizky Sawarna',
        propertyImage: 'https://i.imgur.com/KNZs2rS.jpeg',
        checkIn: '2024-02-15',
        checkOut: '2024-02-17',
        guests: 6,
        totalPrice: 1800000,
        status: 'completed',
        bookingDate: '2024-02-10',
        paymentStatus: 'paid'
      },
      {
        id: '3',
        propertyId: 'villa-cempaka',
        propertyName: 'Villa Cempaka',
        propertyImage: 'https://i.imgur.com/KNZs2rS.jpeg',
        checkIn: '2024-04-10',
        checkOut: '2024-04-12',
        guests: 10,
        totalPrice: 3200000,
        status: 'pending',
        bookingDate: '2024-03-18',
        paymentStatus: 'pending'
      }
    ];

    const demoReviews: UserReview[] = [
      {
        id: '1',
        propertyId: 'villa-arizky-sawarna',
        propertyName: 'Villa Arizky Sawarna',
        propertyImage: 'https://i.imgur.com/KNZs2rS.jpeg',
        rating: 5,
        comment: 'Villa yang sangat nyaman dan bersih. Staff ramah dan lokasi strategis dekat pantai.',
        reviewDate: '2024-02-18',
        helpful: 12,
        verified: true
      },
      {
        id: '2',
        propertyId: 'villa-sinar-pelangi',
        propertyName: 'Villa Sinar Pelangi',
        propertyImage: 'https://i.imgur.com/KNZs2rS.jpeg',
        rating: 4,
        comment: 'Fasilitas lengkap dan view yang indah. Hanya sedikit masalah dengan AC di kamar utama.',
        reviewDate: '2024-01-25',
        helpful: 8,
        verified: true
      }
    ];

    const demoNotifications: UserNotification[] = [
      {
        id: '1',
        type: 'booking',
        title: 'Booking Dikonfirmasi',
        message: 'Booking Anda untuk Villa Sinar Pelangi telah dikonfirmasi',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 jam yang lalu
        isRead: false,
        action: 'Lihat Detail',
        actionUrl: '/dashboard/bookings',
        priority: 'high'
      },
      {
        id: '2',
        type: 'promo',
        title: 'Promo Spesial',
        message: 'Dapatkan diskon 20% untuk booking minimal 3 hari',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 hari yang lalu
        isRead: true,
        action: 'Lihat Promo',
        actionUrl: '/promos',
        priority: 'medium'
      },
      {
        id: '3',
        type: 'review',
        title: 'Review Anda Membantu',
        message: 'Review Anda untuk Villa Arizky telah membantu 5 traveler lain',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 hari yang lalu
        isRead: true,
        priority: 'low'
      }
    ];

    const demoSearchFilters: UserSearchFilter[] = [
      {
        id: '1',
        name: 'Pencarian Pantai',
        filters: {
          location: 'Sawarna',
          guests: 4,
          minPrice: 1000000,
          maxPrice: 3000000,
          amenities: ['kolam renang', 'pantai']
        },
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    setBookings(demoBookings);
    setReviews(demoReviews);
    setNotifications(demoNotifications);
    setSearchFilters(demoSearchFilters);

    // Save to localStorage
    saveUserData('bookings', demoBookings);
    saveUserData('reviews', demoReviews);
    saveUserData('notifications', demoNotifications);
    saveUserData('search_filters', demoSearchFilters);
  };

  // Refresh dashboard statistics
  const refreshStats = () => {
    if (!user) return;

    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews 
      : 0;
    const wishlistItems = wishlistFolders.reduce((total, folder) => total + folder.items.length, 0);
    const savedSearches = searchFilters.length;
    const unreadNotifications = notifications.filter(n => !n.isRead).length;
    const totalSpent = bookings
      .filter(b => b.status === 'completed' || b.status === 'confirmed')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    const newStats: UserDashboardStats = {
      totalBookings,
      completedBookings,
      pendingBookings,
      cancelledBookings,
      totalReviews,
      averageRating: Math.round(averageRating * 10) / 10,
      wishlistItems,
      savedSearches,
      unreadNotifications,
      totalSpent,
      memberSince: user.createdAt || new Date().toISOString(),
      memberLevel: totalSpent > 10000000 ? 'Gold' : totalSpent > 5000000 ? 'Silver' : 'Bronze',
      loyaltyPoints: Math.floor(totalSpent / 100000)
    };

    setStats(newStats);
    saveUserData('stats', newStats);
  };

  // Generate recent activities based on current data
  const generateRecentActivities = () => {
    const activities: UserRecentActivity[] = [];

    // Add recent bookings
    bookings.slice(0, 3).forEach(booking => {
      activities.push({
        id: `booking-${booking.id}`,
        type: 'booking',
        title: `Booking ${booking.status === 'confirmed' ? 'Dikonfirmasi' : booking.status === 'completed' ? 'Selesai' : 'Pending'}`,
        description: `${booking.propertyName} untuk ${booking.checkIn}-${booking.checkOut}`,
        timestamp: booking.bookingDate,
        icon: <Calendar className="w-4 h-4 text-blue-500" />,
        status: booking.status === 'confirmed' || booking.status === 'completed' ? 'success' : 'pending',
        relatedId: booking.id
      });
    });

    // Add recent reviews
    reviews.slice(0, 2).forEach(review => {
      activities.push({
        id: `review-${review.id}`,
        type: 'review',
        title: 'Review Dikirim',
        description: `Memberikan review ${review.rating} bintang untuk ${review.propertyName}`,
        timestamp: review.reviewDate,
        icon: <Star className="w-4 h-4 text-yellow-500" />,
        status: 'success',
        relatedId: review.id
      });
    });

    // Add recent wishlist activities
    if (wishlistFolders.length > 0) {
      const totalItems = wishlistFolders.reduce((sum, folder) => sum + folder.items.length, 0);
      if (totalItems > 0) {
        activities.push({
          id: 'wishlist-update',
          type: 'wishlist',
          title: 'Wishlist Diperbarui',
          description: `${totalItems} properti dalam wishlist Anda`,
          timestamp: new Date().toISOString(),
          icon: <Heart className="w-4 h-4 text-red-500" />,
          status: 'success'
        });
      }
    }

    // Add recent visit activities
    if (visitHistory.length > 0) {
      activities.push({
        id: 'visit-activity',
        type: 'search',
        title: 'Melihat Properti',
        description: `Anda telah melihat ${visitHistory.length} properti`,
        timestamp: visitHistory[0]?.visitDate || new Date().toISOString(),
        icon: <Search className="w-4 h-4 text-green-500" />,
        status: 'success'
      });
    }

    // Sort by timestamp and take latest 5
    const sortedActivities = activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);

    setRecentActivities(sortedActivities);
    saveUserData('activities', sortedActivities);
  };

  // Update activities when data changes
  useEffect(() => {
    if (user && !isClearingData) {
      generateRecentActivities();
    }
  }, [bookings, reviews, wishlistFolders, visitHistory, user, isClearingData]);

  // Booking actions
  const addBooking = (booking: Omit<UserBooking, 'id'>) => {
    const newBooking: UserBooking = {
      ...booking,
      id: Date.now().toString()
    };
    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    saveUserData('bookings', updatedBookings);
    
    // Add notification
    addNotification({
      type: 'booking',
      title: 'Booking Baru Dibuat',
      message: `Booking untuk ${booking.propertyName} telah dibuat dan sedang menunggu konfirmasi`,
      isRead: false,
      action: 'Lihat Detail',
      actionUrl: '/dashboard/bookings',
      priority: 'high'
    });

    toast({
      title: "Booking Berhasil",
      description: "Booking Anda telah dibuat dan sedang menunggu konfirmasi.",
    });
  };

  const updateBooking = (id: string, updates: Partial<UserBooking>) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, ...updates } : booking
    );
    setBookings(updatedBookings);
    saveUserData('bookings', updatedBookings);
  };

  const cancelBooking = (id: string) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'cancelled' as const } : booking
    );
    setBookings(updatedBookings);
    saveUserData('bookings', updatedBookings);
    
    toast({
      title: "Booking Dibatalkan",
      description: "Booking Anda telah berhasil dibatalkan.",
    });
  };

  // Review actions
  const addReview = (review: Omit<UserReview, 'id'>) => {
    const newReview: UserReview = {
      ...review,
      id: Date.now().toString()
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    saveUserData('reviews', updatedReviews);
    
    toast({
      title: "Review Berhasil",
      description: "Review Anda telah berhasil ditambahkan.",
    });
  };

  const updateReview = (id: string, updates: Partial<UserReview>) => {
    const updatedReviews = reviews.map(review => 
      review.id === id ? { ...review, ...updates } : review
    );
    setReviews(updatedReviews);
    saveUserData('reviews', updatedReviews);
  };

  const deleteReview = (id: string) => {
    const updatedReviews = reviews.filter(review => review.id !== id);
    setReviews(updatedReviews);
    saveUserData('reviews', updatedReviews);
    
    toast({
      title: "Review Dihapus",
      description: "Review Anda telah berhasil dihapus.",
    });
  };

  // Notification actions
  const addNotification = (notification: Omit<UserNotification, 'id' | 'timestamp'>) => {
    const newNotification: UserNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    saveUserData('notifications', updatedNotifications);
  };

  const markNotificationAsRead = (id: string) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    );
    setNotifications(updatedNotifications);
    saveUserData('notifications', updatedNotifications);
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({ ...notification, isRead: true }));
    setNotifications(updatedNotifications);
    saveUserData('notifications', updatedNotifications);
  };

  const deleteNotification = (id: string) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    saveUserData('notifications', updatedNotifications);
  };

  // Search filter actions
  const saveSearchFilter = (filter: Omit<UserSearchFilter, 'id' | 'createdAt'>) => {
    const newFilter: UserSearchFilter = {
      ...filter,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedFilters = [newFilter, ...searchFilters];
    setSearchFilters(updatedFilters);
    saveUserData('search_filters', updatedFilters);
    
    toast({
      title: "Filter Tersimpan",
      description: "Filter pencarian Anda telah berhasil disimpan.",
    });
  };

  const deleteSearchFilter = (id: string) => {
    const updatedFilters = searchFilters.filter(filter => filter.id !== id);
    setSearchFilters(updatedFilters);
    saveUserData('search_filters', updatedFilters);
  };

  // Utility actions
  const clearAllData = () => {
    // Set flag to prevent auto-generation
    setIsClearingData(true);
    
    setBookings([]);
    setReviews([]);
    setNotifications([]);
    setSearchFilters([]);
    setStats({
      totalBookings: 0,
      completedBookings: 0,
      pendingBookings: 0,
      cancelledBookings: 0,
      totalReviews: 0,
      averageRating: 0,
      wishlistItems: 0,
      savedSearches: 0,
      unreadNotifications: 0,
      totalSpent: 0,
      memberSince: user?.createdAt || new Date().toISOString(),
      memberLevel: 'Bronze',
      loyaltyPoints: 0
    });
    setRecentActivities([]);
    
    // Reset flag after a short delay
    setTimeout(() => {
      setIsClearingData(false);
    }, 100);
  };

  // Clear demo data and start fresh
  const clearDemoData = () => {
    if (!user) return;
    
    console.log('🔄 Clearing demo data for user:', user.id);
    
    // Set flag to prevent auto-generation
    setIsClearingData(true);
    
    // Clear from localStorage first
    localStorage.removeItem(`user_bookings_${user.id}`);
    localStorage.removeItem(`user_reviews_${user.id}`);
    localStorage.removeItem(`user_notifications_${user.id}`);
    localStorage.removeItem(`user_search_filters_${user.id}`);
    localStorage.removeItem(`user_stats_${user.id}`);
    localStorage.removeItem(`user_activities_${user.id}`);
    
    console.log('🗑️ localStorage cleared');
    
    // Reset state completely
    setBookings([]);
    setReviews([]);
    setNotifications([]);
    setSearchFilters([]);
    setRecentActivities([]);
    
    console.log('🔄 State reset completed');
    
    // Reset stats to initial values
    setStats({
      totalBookings: 0,
      completedBookings: 0,
      pendingBookings: 0,
      cancelledBookings: 0,
      totalReviews: 0,
      averageRating: 0,
      wishlistItems: 0,
      savedSearches: 0,
      unreadNotifications: 0,
      totalSpent: 0,
      memberSince: user.createdAt || new Date().toISOString(),
      memberLevel: 'Bronze',
      loyaltyPoints: 0
    });
    
    console.log('📊 Stats reset completed');
    
    // Reset flag after a short delay to allow state updates to complete
    setTimeout(() => {
      setIsClearingData(false);
      console.log('✅ Demo data cleanup completed');
    }, 100);
    
    toast({
      title: "Demo Data Dihapus",
      description: "Data demo telah dihapus. Dashboard sekarang menampilkan data real Anda.",
    });
  };

  const value: UserDataContextType = {
    bookings,
    reviews,
    notifications,
    searchFilters,
    stats,
    recentActivities,
    addBooking,
    updateBooking,
    cancelBooking,
    addReview,
    updateReview,
    deleteReview,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    saveSearchFilter,
    deleteSearchFilter,
    refreshStats,
    clearAllData,
    clearDemoData
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};

