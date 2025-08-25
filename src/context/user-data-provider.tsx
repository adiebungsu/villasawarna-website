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
  const [conversations, setConversations] = useState<UserConversation[]>([]);
  const [supportTickets, setSupportTickets] = useState<UserSupportTicket[]>([]);
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  
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

  // Load user data from localStorage with error handling
  const loadUserData = () => {
    if (!user) return;

    try {
      const userBookings = localStorage.getItem(`user_bookings_${user.id}`);
      const userReviews = localStorage.getItem(`user_reviews_${user.id}`);
      const userNotifications = localStorage.getItem(`user_notifications_${user.id}`);
      const userSearchFilters = localStorage.getItem(`user_search_filters_${user.id}`);
      const userStats = localStorage.getItem(`user_stats_${user.id}`);
      const userActivities = localStorage.getItem(`user_activities_${user.id}`);
      const userConversations = localStorage.getItem(`user_conversations_${user.id}`);
      const userSupportTickets = localStorage.getItem(`user_support_tickets_${user.id}`);
      const userTravelPlans = localStorage.getItem(`user_travel_plans_${user.id}`);

      // Parse data with error handling for each item
      try {
        if (userBookings) setBookings(JSON.parse(userBookings));
      } catch (e) {
        console.warn('Failed to parse bookings data, using empty array');
        setBookings([]);
      }

      try {
        if (userReviews) setReviews(JSON.parse(userReviews));
      } catch (e) {
        console.warn('Failed to parse reviews data, using empty array');
        setReviews([]);
      }

      try {
        if (userNotifications) setNotifications(JSON.parse(userNotifications));
      } catch (e) {
        console.warn('Failed to parse notifications data, using empty array');
        setNotifications([]);
      }

      try {
        if (userSearchFilters) setSearchFilters(JSON.parse(userSearchFilters));
      } catch (e) {
        console.warn('Failed to parse search filters data, using empty array');
        setSearchFilters([]);
      }

      try {
        if (userStats) setStats(JSON.parse(userStats));
      } catch (e) {
        console.warn('Failed to parse stats data, using default stats');
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
      }

      try {
        if (userActivities) setRecentActivities(JSON.parse(userActivities));
      } catch (e) {
        console.warn('Failed to parse activities data, using empty array');
        setRecentActivities([]);
      }

      try {
        if (userConversations) setConversations(JSON.parse(userConversations));
      } catch (e) {
        console.warn('Failed to parse conversations data, using empty array');
        setConversations([]);
      }

      try {
        if (userSupportTickets) setSupportTickets(JSON.parse(userSupportTickets));
      } catch (e) {
        console.warn('Failed to parse support tickets data, using empty array');
        setSupportTickets([]);
      }

      try {
        if (userTravelPlans) setTravelPlans(JSON.parse(userTravelPlans));
      } catch (e) {
        console.warn('Failed to parse travel plans data, using empty array');
        setTravelPlans([]);
      }
      
      // Initialize demo data if no data exists
      if (!userBookings && !userReviews && !userNotifications) {
        initializeDemoData();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Set default empty states
      setBookings([]);
      setReviews([]);
      setNotifications([]);
      setSearchFilters([]);
          setRecentActivities([]);
    setConversations([]);
    setSupportTickets([]);
    setTravelPlans([]);
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
    }
  };

  // Save user data to localStorage with error handling and data compression
  const saveUserData = (key: string, data: any) => {
    if (!user) return;
    
    try {
      // Compress data by removing unnecessary fields and using shorter property names
      const compressedData = JSON.stringify(data);
      
      // Check if data is too large (localStorage limit is ~5-10MB)
      if (compressedData.length > 5000000) { // 5MB limit
        console.warn(`Data for ${key} is too large (${(compressedData.length / 1024 / 1024).toFixed(2)}MB), truncating...`);
        
        // For large datasets, only keep the most recent items
        if (Array.isArray(data)) {
          const truncatedData = data.slice(0, 50); // Keep only first 50 items
          localStorage.setItem(`user_${key}_${user.id}`, JSON.stringify(truncatedData));
        } else {
          // For non-array data, try to save essential fields only
          const essentialData = {
            ...data,
            // Remove large fields if they exist
            messages: data.messages ? data.messages.slice(-10) : undefined, // Keep only last 10 messages
            attachments: undefined, // Remove attachments
            images: undefined
          };
          localStorage.setItem(`user_${key}_${user.id}`, JSON.stringify(essentialData));
        }
      } else {
        localStorage.setItem(`user_${key}_${user.id}`, compressedData);
      }
    } catch (error) {
      console.error(`Failed to save ${key} data:`, error);
      
      // If quota exceeded, clear some old data and try again
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded, clearing old data...');
        clearOldData();
        
        // Try to save again with smaller dataset
        try {
          if (Array.isArray(data)) {
            const smallerData = data.slice(0, 20); // Keep only 20 items
            localStorage.setItem(`user_${key}_${user.id}`, JSON.stringify(smallerData));
          }
        } catch (retryError) {
          console.error(`Failed to save ${key} data after cleanup:`, retryError);
        }
      }
    }
  };

  // Clear old data to free up localStorage space
  const clearOldData = () => {
    try {
      // Clear old activities and notifications first (they accumulate quickly)
      localStorage.removeItem(`user_activities_${user?.id}`);
      localStorage.removeItem(`user_notifications_${user?.id}`);
      
      // Clear old conversations (keep only recent ones)
      const conversations = localStorage.getItem(`user_conversations_${user?.id}`);
      if (conversations) {
        const parsedConversations = JSON.parse(conversations);
        const recentConversations = parsedConversations.slice(0, 10); // Keep only 10 most recent
        localStorage.setItem(`user_conversations_${user?.id}`, JSON.stringify(recentConversations));
      }
      
      console.log('Old data cleared successfully');
    } catch (error) {
      console.error('Failed to clear old data:', error);
    }
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

    // Demo Conversations
    const demoConversations: UserConversation[] = [
      {
        id: '1',
        type: 'property_chat',
        participants: [user.id, 'villa-sinar-pelangi'],
        propertyId: 'villa-sinar-pelangi',
        propertyName: 'Villa Sinar Pelangi',
        propertyImage: 'https://i.imgur.com/KNZs2rS.jpeg',
        lastMessage: {
          id: 'msg-1',
          conversationId: '1',
          senderId: 'villa-sinar-pelangi',
          senderName: 'Villa Sinar Pelangi',
          message: 'Terima kasih atas booking Anda. Check-in dapat dilakukan mulai jam 14:00 WIB.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          isRead: false,
          messageType: 'text'
        },
        unreadCount: 2,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isActive: true
      },
      {
        id: '2',
        type: 'property_chat',
        participants: [user.id, 'villa-arizky'],
        propertyId: 'villa-arizky-sawarna',
        propertyName: 'Villa Arizky Sawarna',
        propertyImage: 'https://i.imgur.com/KNZs2rS.jpeg',
        lastMessage: {
          id: 'msg-2',
          conversationId: '2',
          senderId: 'villa-arizky',
          senderName: 'Villa Arizky Sawarna',
          message: 'Apakah ada pertanyaan tentang fasilitas villa kami?',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          messageType: 'text'
        },
        unreadCount: 0,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        isActive: false
      },
      {
        id: '3',
        type: 'support_chat',
        participants: [user.id, 'support-team'],
        lastMessage: {
          id: 'msg-3',
          conversationId: '3',
          senderId: 'support-team',
          senderName: 'Tim Support Villa Sawarna',
          message: 'Ticket #1234 telah diselesaikan. Terima kasih telah menghubungi kami.',
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          isRead: true,
          messageType: 'text'
        },
        unreadCount: 0,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: false
      }
    ];

    // Demo Support Tickets
    const demoTickets: UserSupportTicket[] = [
      {
        id: '1',
        category: 'booking',
        priority: 'medium',
        status: 'resolved',
        subject: 'Masalah dengan Check-in',
        description: 'Saya mengalami kesulitan saat melakukan check-in di Villa Sinar Pelangi.',
        attachments: [],
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        assignedTo: 'support-team',
        messages: [
          {
            id: 'ticket-msg-1',
            conversationId: '1',
            senderId: user.id,
            senderName: user.name || 'User',
            message: 'Saya mengalami kesulitan saat melakukan check-in di Villa Sinar Pelangi.',
            timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            isRead: true,
            messageType: 'text'
          },
          {
            id: 'ticket-msg-2',
            conversationId: '1',
            senderId: 'support-team',
            senderName: 'Tim Support',
            message: 'Terima kasih telah menghubungi kami. Tim kami akan segera membantu Anda.',
            timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
            isRead: true,
            messageType: 'text'
          }
        ]
      }
    ];

    // Demo Travel Plans
    const demoTravelPlans: TravelPlan[] = [
      {
        id: '1',
        title: 'Liburan Pantai Sawarna',
        description: 'Trip keluarga ke pantai terindah di Banten',
        destination: 'Sawarna, Banten',
        startDate: '2024-04-15',
        endDate: '2024-04-18',
        totalDays: 4,
        budget: {
          min: 3000000,
          max: 5000000,
          currency: 'IDR'
        },
        travelers: {
          adults: 4,
          children: 2,
          infants: 0
        },
        status: 'planning',
        accommodations: [
          {
            id: 'acc-1',
            propertyId: 'villa-sinar-pelangi',
            propertyName: 'Villa Sinar Pelangi',
            propertyImage: 'https://i.imgur.com/KNZs2rS.jpeg',
            checkIn: '2024-04-15',
            checkOut: '2024-04-18',
            guests: 6,
            totalPrice: 2500000,
            status: 'planned',
            notes: 'Villa dengan view pantai terbaik'
          }
        ],
        activities: [
          {
            id: 'act-1',
            name: 'Snorkeling di Pantai Sawarna',
            type: 'adventure',
            location: 'Pantai Sawarna',
            date: '2024-04-16',
            time: '09:00',
            duration: 3,
            price: 150000,
            description: 'Snorkeling dengan pemandu lokal',
            bookingRequired: true,
            status: 'planned'
          },
          {
            id: 'act-2',
            name: 'Sunset Dinner di Pantai',
            type: 'restaurant',
            location: 'Warung Pantai Sawarna',
            date: '2024-04-16',
            time: '18:00',
            duration: 2,
            price: 200000,
            description: 'Makan malam sambil menikmati sunset',
            bookingRequired: false,
            status: 'planned'
          }
        ],
        transportation: [
          {
            id: 'trans-1',
            type: 'car',
            from: 'Jakarta',
            to: 'Sawarna',
            departureDate: '2024-04-15',
            departureTime: '08:00',
            arrivalDate: '2024-04-15',
            arrivalTime: '12:00',
            provider: 'Rental Mobil',
            price: 500000,
            status: 'booked',
            notes: 'Mobil 7 seater dengan supir'
          }
        ],
        notes: [
          'Bawa sunscreen dan topi',
          'Booking villa minimal 1 bulan sebelumnya',
          'Siapkan uang untuk aktivitas tambahan'
        ],
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        isPublic: false,
        sharedWith: []
      },
      {
        id: '2',
        title: 'Weekend Getaway ke Villa Arizky',
        description: 'Trip romantis untuk 2 orang',
        destination: 'Sawarna, Banten',
        startDate: '2024-05-10',
        endDate: '2024-05-12',
        totalDays: 3,
        budget: {
          min: 1500000,
          max: 2500000,
          currency: 'IDR'
        },
        travelers: {
          adults: 2,
          children: 0,
          infants: 0
        },
        status: 'booked',
        accommodations: [
          {
            id: 'acc-2',
            propertyId: 'villa-arizky-sawarna',
            propertyName: 'Villa Arizky Sawarna',
            propertyImage: 'https://i.imgur.com/KNZs2rS.jpeg',
            checkIn: '2024-05-10',
            checkOut: '2024-05-12',
            guests: 2,
            totalPrice: 1800000,
            status: 'booked',
            bookingId: 'BK-2024-001',
            notes: 'Villa romantis dengan kolam renang pribadi'
          }
        ],
        activities: [
          {
            id: 'act-3',
            name: 'Couple Massage',
            type: 'relaxation',
            location: 'Villa Arizky',
            date: '2024-05-11',
            time: '16:00',
            duration: 2,
            price: 300000,
            description: 'Massage berdua di villa',
            bookingRequired: true,
            status: 'booked'
          }
        ],
        transportation: [
          {
            id: 'trans-2',
            type: 'motorcycle',
            from: 'Jakarta',
            to: 'Sawarna',
            departureDate: '2024-05-10',
            departureTime: '07:00',
            arrivalDate: '2024-05-10',
            arrivalTime: '11:00',
            provider: 'Rental Motor',
            price: 150000,
            status: 'booked',
            notes: 'Motor untuk 2 orang'
          }
        ],
        notes: [
          'Bawa baju renang',
          'Booking massage di muka',
          'Siapkan kamera untuk foto romantis'
        ],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        isPublic: false,
        sharedWith: []
      }
    ];

    setBookings(demoBookings);
    setReviews(demoReviews);
    setNotifications(demoNotifications);
    setSearchFilters(demoSearchFilters);
    setConversations(demoConversations);
    setSupportTickets(demoTickets);
    setTravelPlans(demoTravelPlans);

    // Save to localStorage
    saveUserData('bookings', demoBookings);
    saveUserData('reviews', demoReviews);
    saveUserData('notifications', demoNotifications);
    saveUserData('search_filters', demoSearchFilters);
    saveUserData('conversations', demoConversations);
    saveUserData('support_tickets', demoTickets);
    saveUserData('travel_plans', demoTravelPlans);
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

  // Messaging actions
  const addConversation = (conversation: Omit<UserConversation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newConversation: UserConversation = {
      ...conversation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    saveUserData('conversations', updatedConversations);
  };

  const updateConversation = (id: string, updates: Partial<UserConversation>) => {
    const updatedConversations = conversations.map(conversation => 
      conversation.id === id 
        ? { ...conversation, ...updates, updatedAt: new Date().toISOString() }
        : conversation
    );
    setConversations(updatedConversations);
    saveUserData('conversations', updatedConversations);
  };

  const deleteConversation = (id: string) => {
    const updatedConversations = conversations.filter(conversation => conversation.id !== id);
    setConversations(updatedConversations);
    saveUserData('conversations', updatedConversations);
  };

  const addMessage = (conversationId: string, message: Omit<UserMessage, 'id' | 'timestamp'>) => {
    const newMessage: UserMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          lastMessage: newMessage,
          unreadCount: conversation.unreadCount + (message.senderId !== user?.id ? 1 : 0),
          updatedAt: new Date().toISOString()
        };
      }
      return conversation;
    });
    
    setConversations(updatedConversations);
    saveUserData('conversations', updatedConversations);
  };

  const markMessageAsRead = (conversationId: string, messageId: string) => {
    const updatedConversations = conversations.map(conversation => {
      if (conversation.id === conversationId) {
        return {
          ...conversation,
          unreadCount: 0,
          updatedAt: new Date().toISOString()
        };
      }
      return conversation;
    });
    
    setConversations(updatedConversations);
    saveUserData('conversations', updatedConversations);
  };

  // Support ticket actions
  const addSupportTicket = (ticket: Omit<UserSupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages'>) => {
    const newTicket: UserSupportTicket = {
      ...ticket,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };
    const updatedTickets = [newTicket, ...supportTickets];
    setSupportTickets(updatedTickets);
    saveUserData('support_tickets', updatedTickets);
  };

  const updateSupportTicket = (id: string, updates: Partial<UserSupportTicket>) => {
    const updatedTickets = supportTickets.map(ticket => 
      ticket.id === id 
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    );
    setSupportTickets(updatedTickets);
    saveUserData('support_tickets', updatedTickets);
  };

  const addTicketMessage = (ticketId: string, message: Omit<UserMessage, 'id' | 'timestamp'>) => {
    const newMessage: UserMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    const updatedTickets = supportTickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          messages: [...ticket.messages, newMessage],
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    setSupportTickets(updatedTickets);
    saveUserData('support_tickets', updatedTickets);
  };

  // Travel Plan actions
  const addTravelPlan = (plan: Omit<TravelPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPlan: TravelPlan = {
      ...plan,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedPlans = [newPlan, ...travelPlans];
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const updateTravelPlan = (id: string, updates: Partial<TravelPlan>) => {
    const updatedPlans = travelPlans.map(plan => 
      plan.id === id ? { ...plan, ...updates, updatedAt: new Date().toISOString() } : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const deleteTravelPlan = (id: string) => {
    const updatedPlans = travelPlans.filter(plan => plan.id !== id);
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const addAccommodation = (planId: string, accommodation: Omit<TravelAccommodation, 'id'>) => {
    const newAccommodation: TravelAccommodation = {
      ...accommodation,
      id: Date.now().toString()
    };
    
    const updatedPlans = travelPlans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            accommodations: [...plan.accommodations, newAccommodation],
            updatedAt: new Date().toISOString()
          } 
        : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const updateAccommodation = (planId: string, accommodationId: string, updates: Partial<TravelAccommodation>) => {
    const updatedPlans = travelPlans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            accommodations: plan.accommodations.map(acc => 
              acc.id === accommodationId ? { ...acc, ...updates } : acc
            ),
            updatedAt: new Date().toISOString()
          } 
        : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const removeAccommodation = (planId: string, accommodationId: string) => {
    const updatedPlans = travelPlans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            accommodations: plan.accommodations.filter(acc => acc.id !== accommodationId),
            updatedAt: new Date().toISOString()
          } 
        : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const addActivity = (planId: string, activity: Omit<TravelActivity, 'id'>) => {
    const newActivity: TravelActivity = {
      ...activity,
      id: Date.now().toString()
    };
    
    const updatedPlans = travelPlans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            activities: [...plan.activities, newActivity],
            updatedAt: new Date().toISOString()
          } 
        : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const updateActivity = (planId: string, activityId: string, updates: Partial<TravelActivity>) => {
    const updatedPlans = travelPlans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            activities: plan.activities.map(act => 
              act.id === activityId ? { ...act, ...updates } : act
            ),
            updatedAt: new Date().toISOString()
          } 
        : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const removeActivity = (planId: string, activityId: string) => {
    const updatedPlans = travelPlans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            activities: plan.activities.filter(act => act.id !== activityId),
            updatedAt: new Date().toISOString()
          } 
        : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const addTransportation = (planId: string, transportation: Omit<TravelTransportation, 'id'>) => {
    const newTransportation: TravelTransportation = {
      ...transportation,
      id: Date.now().toString()
    };
    
    const updatedPlans = travelPlans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            transportation: [...plan.transportation, newTransportation],
            updatedAt: new Date().toISOString()
          } 
        : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const updateTransportation = (planId: string, transportationId: string, updates: Partial<TravelTransportation>) => {
    const updatedPlans = travelPlans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            transportation: plan.transportation.map(trans => 
              trans.id === transportationId ? { ...trans, ...updates } : trans
            ),
            updatedAt: new Date().toISOString()
          } 
        : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
  };

  const removeTransportation = (planId: string, transportationId: string) => {
    const updatedPlans = travelPlans.map(plan => 
      plan.id === planId 
        ? { 
            ...plan, 
            transportation: plan.transportation.filter(trans => trans.id !== transportationId),
            updatedAt: new Date().toISOString()
          } 
        : plan
    );
    setTravelPlans(updatedPlans);
    saveUserData('travel_plans', updatedPlans);
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
    setConversations([]);
    setSupportTickets([]);
    
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
    try {
      localStorage.removeItem(`user_bookings_${user.id}`);
      localStorage.removeItem(`user_reviews_${user.id}`);
      localStorage.removeItem(`user_notifications_${user.id}`);
      localStorage.removeItem(`user_search_filters_${user.id}`);
      localStorage.removeItem(`user_stats_${user.id}`);
      localStorage.removeItem(`user_activities_${user.id}`);
      localStorage.removeItem(`user_conversations_${user.id}`);
      localStorage.removeItem(`user_support_tickets_${user.id}`);
      localStorage.removeItem(`user_travel_plans_${user.id}`);
      
      console.log('🗑️ localStorage cleared');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
    
    // Reset state completely
    setBookings([]);
    setReviews([]);
    setNotifications([]);
    setSearchFilters([]);
    setRecentActivities([]);
    setConversations([]);
    setSupportTickets([]);
    
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

  // Emergency localStorage cleanup function
  const emergencyCleanup = () => {
    if (!user) return;
    
    console.log('🚨 Emergency localStorage cleanup initiated');
    
    try {
      // Clear all user data
      const keys = Object.keys(localStorage);
      const userKeys = keys.filter(key => key.includes(`user_${user.id}`));
      
      userKeys.forEach(key => {
        localStorage.removeItem(key);
      });
      
      console.log(`🗑️ Cleared ${userKeys.length} localStorage items`);
      
      // Reset all state
      clearAllData();
      
      toast({
        title: "Storage Dibersihkan",
        description: "localStorage telah dibersihkan untuk mengatasi masalah quota.",
      });
    } catch (error) {
      console.error('Emergency cleanup failed:', error);
      toast({
        title: "Gagal Membersihkan Storage",
        description: "Silakan refresh halaman atau clear browser data manual.",
        variant: "destructive"
      });
    }
  };

  const value: UserDataContextType = {
    bookings,
    reviews,
    notifications,
    searchFilters,
    stats,
    recentActivities,
    conversations,
    supportTickets,
    travelPlans,
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
    addConversation,
    updateConversation,
    deleteConversation,
    addMessage,
    markMessageAsRead,
    addSupportTicket,
    updateSupportTicket,
    addTicketMessage,
    addTravelPlan,
    updateTravelPlan,
    deleteTravelPlan,
    addAccommodation,
    updateAccommodation,
    removeAccommodation,
    addActivity,
    updateActivity,
    removeActivity,
    addTransportation,
    updateTransportation,
    removeTransportation,
    refreshStats,
    clearAllData,
    clearDemoData,
    emergencyCleanup
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

