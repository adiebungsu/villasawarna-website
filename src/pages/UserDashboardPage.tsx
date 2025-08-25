import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/use-auth';
import { AuthUser } from '@/context/auth-context-helpers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Calendar, 
  Heart, 
  Settings, 
  Bell,
  Search,
  Star,
  MapPin,
  Building2,
  Users,
  Clock,
  TrendingUp,
  Award,
  Gift,
  Shield,
  CreditCard,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Edit,
  Camera,
  Download,
  Share2,
  Bookmark,
  Eye,
  ThumbsUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
  SortAsc,
  MoreHorizontal,
  ExternalLink,
  Home,
  Car,
  Plane,
  Utensils,
  Wifi,
  Waves,
  Wind,
  ArrowLeft,
  Loader2,
  LogOut,
  X,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import WishlistSystem from '@/components/WishlistSystem';
import NotificationSystem from '@/components/NotificationSystem';
import EnhancedSearchFilter from '@/components/EnhancedSearchFilter';
import { useVisitHistory, VisitHistoryItem } from '@/context/use-visit-history';
import { useUserData } from '@/context/user-data-provider';
import { addDemoVisits, clearDemoVisits, viewCurrentVisits } from '@/utils/visit-demo';
import DashboardTour from '@/components/DashboardTour';

interface DashboardStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalReviews: number;
  averageRating: number;
  wishlistItems: number;
  savedSearches: number;
  unreadNotifications: number;
  totalSpent: number; // Added for new badge
}

interface RecentActivity {
  id: string;
  type: 'booking' | 'review' | 'wishlist' | 'search' | 'payment' | 'support';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ReactNode;
  status?: 'success' | 'pending' | 'failed';
}

interface Booking {
  id: string;
  propertyName: string;
  propertyImage: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  bookingDate: string;
  paymentStatus?: 'paid' | 'pending';
  propertyId?: string;
}

interface Review {
  id: string;
  propertyName: string;
  propertyImage: string;
  rating: number;
  comment: string;
  reviewDate: string;
  helpful: number;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
  action?: string;
}

interface VisitHistory {
  id: string;
  villaName: string;
  villaImage: string;
  villaUrl: string;
  visitDate: string;
  visitDuration: string;
  lastViewed: string;
  viewCount: number;
  isBookmarked: boolean;
}

const UserDashboardPage: React.FC = () => {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get user data first
  const {
    bookings,
    reviews,
    notifications,
    stats,
    recentActivities,
    searchFilters,
    conversations,
    supportTickets,
    travelPlans,
    addBooking,
    addReview,
    addTravelPlan,
    saveSearchFilter,
    clearDemoData,
    emergencyCleanup,
    addSupportTicket,
    addTicketMessage
  } = useUserData();
  
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === 'undefined') return 'overview';
    return localStorage.getItem('user_dashboard_active_tab') || 'overview';
  });

  const handleUserTabChange = (val: string) => {
    setActiveTab(val);
    try {
      localStorage.setItem('user_dashboard_active_tab', val);
    } catch (error) {
      console.warn('Failed to save active tab to localStorage:', error);
    }
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.warn('Failed to scroll to top:', error);
    }
  };
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [showCreateTravelPlan, setShowCreateTravelPlan] = useState(false);
  const [showViewTravelPlan, setShowViewTravelPlan] = useState(false);
  const [showEditTravelPlan, setShowEditTravelPlan] = useState(false);
  const [selectedTravelPlan, setSelectedTravelPlan] = useState<any>(null);
  const [showNewChat, setShowNewChat] = useState(false);
  // Support tickets state
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [newTicketData, setNewTicketData] = useState({
    category: 'general' as 'booking' | 'payment' | 'technical' | 'general',
    priority: 'medium' as 'low' | 'medium' | 'high' | 'urgent',
    status: 'open' as 'open' | 'in_progress' | 'resolved' | 'closed',
    subject: '',
    description: ''
  });
  const [newChatData, setNewChatData] = useState({
    recipientType: 'villa' as 'villa' | 'support',
    selectedVilla: '',
    subject: '',
    message: '',
    priority: 'normal' as 'low' | 'normal' | 'high'
  });
  const [newTravelPlan, setNewTravelPlan] = useState({
    title: '',
    description: '',
    destination: '',
    startDate: '',
    endDate: '',
    budgetMin: '',
    budgetMax: '',
    currency: 'IDR' as 'IDR' | 'USD',
    adults: 1,
    children: 0,
    infants: 0
  });

  // Booking state and filters
  const [bookingFilter, setBookingFilter] = useState<'all' | 'confirmed' | 'pending' | 'completed' | 'cancelled'>('all');
  const [bookingSort, setBookingSort] = useState<'date' | 'price' | 'status'>('date');
  const [showBookingFilters, setShowBookingFilters] = useState(false);

  // Loyalty & Rewards state
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralEmail, setReferralEmail] = useState('');
  const [showRewardsHistory, setShowRewardsHistory] = useState(false);
  const [showRedemptionModal, setShowRedemptionModal] = useState(false);
  const [showPromotionsModal, setShowPromotionsModal] = useState(false);

  // Available rewards for redemption
  const availableRewards = useMemo(() => [
    {
      id: 'voucher-10',
      name: 'Voucher 10% Off',
      description: 'Diskon 10% untuk booking villa manapun',
      pointsCost: 500,
      type: 'voucher',
      validUntil: '2024-12-31'
    },
    {
      id: 'voucher-20',
      name: 'Voucher 20% Off',
      description: 'Diskon 20% untuk booking minimal 3 hari',
      pointsCost: 1000,
      type: 'voucher',
      validUntil: '2024-12-31'
    },
    {
      id: 'free-breakfast',
      name: 'Free Breakfast',
      description: 'Sarapan gratis untuk 2 orang',
      pointsCost: 300,
      type: 'amenity',
      validUntil: '2024-12-31'
    },
    {
      id: 'late-checkout',
      name: 'Late Check-out',
      description: 'Check-out hingga jam 2 siang',
      pointsCost: 200,
      type: 'amenity',
      validUntil: '2024-12-31'
    },
    {
      id: 'villa-upgrade',
      name: 'Villa Upgrade',
      description: 'Upgrade ke villa yang lebih besar (subject to availability)',
      pointsCost: 1500,
      type: 'upgrade',
      validUntil: '2024-12-31'
    }
  ], []);







  // Calculate loyalty points and tier
  const loyaltyData = useMemo(() => {
    const totalSpent = stats.totalSpent || 0;
    const totalBookings = stats.totalBookings || 0;
    const totalReviews = stats.totalReviews || 0;
    
    // Points calculation: 1 point per 10,000 IDR spent
    const pointsEarned = Math.floor(totalSpent / 10000);
    
    // Bonus points for reviews
    const reviewBonus = totalReviews * 50;
    
    // Birthday bonus points (if birthday is within 7 days)
    const today = new Date();
    const userBirthday = user?.birthday ? new Date(user.birthday) : null;
    let birthdayBonus = 0;
    let isBirthdayWeek = false;
    
    if (userBirthday) {
      const birthdayThisYear = new Date(today.getFullYear(), userBirthday.getMonth(), userBirthday.getDate());
      const daysUntilBirthday = Math.ceil((birthdayThisYear.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilBirthday >= -7 && daysUntilBirthday <= 7) {
        birthdayBonus = 200; // Bonus 200 points during birthday week
        isBirthdayWeek = true;
      }
    }
    
    // Total points
    const totalPoints = pointsEarned + reviewBonus + birthdayBonus;
    
    // Tier calculation
    let tier = 'Bronze';
    let nextTierPoints = 1000;
    let tierBenefits = ['5% off on first booking', 'Priority support'];
    
    if (totalPoints >= 5000) {
      tier = 'Platinum';
      nextTierPoints = null;
      tierBenefits = ['15% off all bookings', 'Free late check-out', 'VIP support', 'Exclusive events'];
    } else if (totalPoints >= 3000) {
      tier = 'Gold';
      nextTierPoints = 5000;
      tierBenefits = ['12% off all bookings', 'Free early check-in', 'Priority support', 'Birthday rewards'];
    } else if (totalPoints >= 1000) {
      tier = 'Silver';
      nextTierPoints = 3000;
      tierBenefits = ['8% off all bookings', 'Priority support', 'Birthday rewards'];
    }
    
    // Progress to next tier
    const progressToNextTier = nextTierPoints ? Math.min((totalPoints / nextTierPoints) * 100, 100) : 100;
    
    return {
      tier,
      totalPoints,
      pointsEarned,
      reviewBonus,
      birthdayBonus,
      isBirthdayWeek,
      nextTierPoints,
      progressToNextTier,
      tierBenefits,
      totalSpent,
      totalBookings
    };
  }, [stats.totalSpent, stats.totalBookings, stats.totalReviews, user?.birthday]);

  // Seasonal promotions based on current date and tier
  const seasonalPromotions = useMemo(() => {
    const today = new Date();
    const month = today.getMonth() + 1; // 1-12
    const currentPromotions = [];

    // Summer promotions (June-August)
    if (month >= 6 && month <= 8) {
      currentPromotions.push({
        id: 'summer-special',
        title: '🌞 Summer Special',
        description: 'Diskon 15% untuk semua villa di musim panas',
        discount: 15,
        validUntil: '2024-08-31',
        tier: 'all'
      });
    }

    // Holiday season (December)
    if (month === 12) {
      currentPromotions.push({
        id: 'holiday-season',
        title: '🎄 Holiday Season',
        description: 'Promo spesial liburan akhir tahun',
        discount: 20,
        validUntil: '2024-12-31',
        tier: 'all'
      });
    }

    // Tier-specific promotions
    if (loyaltyData.tier === 'Platinum') {
      currentPromotions.push({
        id: 'platinum-exclusive',
        title: '👑 Platinum Exclusive',
        description: 'Free airport transfer untuk Platinum members',
        discount: 0,
        validUntil: '2024-12-31',
        tier: 'platinum'
      });
    }

    if (loyaltyData.tier === 'Gold' || loyaltyData.tier === 'Platinum') {
      currentPromotions.push({
        id: 'gold-plus-special',
        title: '⭐ Gold+ Special',
        description: 'Early check-in 2 jam lebih awal',
        discount: 0,
        validUntil: '2024-12-31',
        tier: 'gold-plus'
      });
    }

    return currentPromotions;
  }, [loyaltyData.tier, loyaltyData.totalPoints]);

  // Handle reward redemption
  const handleRewardRedemption = (reward: any) => {
    if (loyaltyData.totalPoints < reward.pointsCost) {
      toast({
        title: "Points Tidak Cukup",
        description: `Anda membutuhkan ${reward.pointsCost} points untuk menukar reward ini`,
        variant: "destructive"
      });
      return;
    }

    // Simulate redemption
    toast({
      title: "🎉 Reward Berhasil Ditukar!",
      description: `${reward.name} telah ditambahkan ke akun Anda`,
    });

    setShowRedemptionModal(false);
  };

  // AI Recommendations System
  const aiRecommendations = useMemo(() => {
    const recommendations = [];
    
    // Tier-based recommendations
    if (loyaltyData.tier === 'Platinum') {
      recommendations.push({
        id: 'platinum-luxury',
        title: '🏰 Luxury Villa Experience',
        description: 'Nikmati villa premium dengan butler service dan private pool',
        reason: 'Platinum members exclusive',
        priority: 'high',
        estimatedPrice: 'Rp 5.000.000 - 8.000.000',
        image: 'https://i.imgur.com/KNZs2rS.jpeg'
      });
    }
    
    if (loyaltyData.tier === 'Gold' || loyaltyData.tier === 'Platinum') {
      recommendations.push({
        id: 'gold-comfort',
        title: '⭐ Comfort Plus Villa',
        description: 'Villa dengan fasilitas lengkap dan view terbaik',
        reason: 'Gold+ members recommendation',
        priority: 'medium',
        estimatedPrice: 'Rp 3.000.000 - 5.000.000',
        image: 'https://i.imgur.com/KNZs2rS.jpeg'
      });
    }
    
    // Seasonal recommendations
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 6 && currentMonth <= 8) {
      recommendations.push({
        id: 'summer-beach',
        title: '🌊 Beachfront Summer Villa',
        description: 'Villa tepi pantai dengan akses langsung ke laut',
        reason: 'Perfect for summer vacation',
        priority: 'high',
        estimatedPrice: 'Rp 2.500.000 - 4.000.000',
        image: 'https://i.imgur.com/KNZs2rS.jpeg'
      });
    }
    
    if (currentMonth === 12) {
      recommendations.push({
        id: 'holiday-special',
        title: '🎄 Holiday Special Villa',
        description: 'Villa dengan dekorasi natal dan promo liburan',
        reason: 'Holiday season special',
        priority: 'high',
        estimatedPrice: 'Rp 3.500.000 - 6.000.000',
        image: 'https://i.imgur.com/KNZs2rS.jpeg'
      });
    }
    
    // Budget-based recommendations
    if (loyaltyData.totalPoints >= 2000) {
      recommendations.push({
        id: 'budget-friendly',
        title: '💰 Budget-Friendly Villa',
        description: 'Villa berkualitas dengan harga terjangkau',
        reason: 'Based on your spending pattern',
        priority: 'medium',
        estimatedPrice: 'Rp 1.500.000 - 2.500.000',
        image: 'https://i.imgur.com/KNZs2rS.jpeg'
      });
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [loyaltyData.tier, loyaltyData.totalPoints]);

  // Check-in Reminders System
  const checkInReminders = useMemo(() => {
    const reminders = [];
    const today = new Date();
    
    // Check upcoming bookings for reminders
    bookings.forEach(booking => {
      if (booking.status === 'confirmed') {
        const checkInDate = new Date(booking.checkIn);
        const daysUntilCheckIn = Math.ceil((checkInDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysUntilCheckIn === 1) {
          reminders.push({
            id: `reminder-${booking.id}`,
            type: 'checkin-tomorrow',
            title: '🚨 Check-in Besok!',
            description: `Villa ${booking.propertyName} - Check-in besok`,
            booking: booking,
            priority: 'high',
            action: 'View Details'
          });
        } else if (daysUntilCheckIn === 3) {
          reminders.push({
            id: `reminder-${booking.id}`,
            type: 'checkin-soon',
            title: '📅 Check-in 3 Hari Lagi',
            description: `Villa ${booking.propertyName} - Siapkan dokumen perjalanan`,
            booking: booking,
            priority: 'medium',
            action: 'Prepare'
          });
        } else if (daysUntilCheckIn === 7) {
          reminders.push({
            id: `reminder-${booking.id}`,
            type: 'checkin-week',
            title: '📋 Check-in 1 Minggu Lagi',
            description: `Villa ${booking.propertyName} - Waktunya packing!`,
            booking: booking,
            priority: 'low',
            action: 'Start Packing'
          });
        }
      }
    });
    
    return reminders;
  }, [bookings]);

  // Weather simulation for destinations (in real app, this would call weather API)
  const getDestinationWeather = (destination: string) => {
    const weatherData = {
      'Sawarna': { temp: '28°C', condition: '☀️ Cerah', humidity: '75%' },
      'Pelabuhan Ratu': { temp: '27°C', condition: '⛅ Berawan', humidity: '80%' },
      'Cisolok': { temp: '26°C', condition: '🌧️ Hujan Ringan', humidity: '85%' }
    };
    
    return weatherData[destination as keyof typeof weatherData] || { temp: '25°C', condition: '🌤️', humidity: '70%' };
  };

  // Loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDataLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Mobile optimization
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Smooth scroll to top for mobile
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading skeleton components
  const LoadingSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );

  const CardSkeleton = () => (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      </div>
    </div>
  );

  // Referral system
  const handleReferralSubmit = () => {
    if (!referralEmail || !referralEmail.includes('@')) {
      toast({
        title: "Email Tidak Valid",
        description: "Mohon masukkan email yang valid",
        variant: "destructive"
      });
      return;
    }
    
    // Generate referral code
    const newReferralCode = `REF${user?.id?.slice(-6) || 'USER'}${Date.now().toString().slice(-4)}`;
    setReferralCode(newReferralCode);
    
    toast({
      title: "Referral Code Dibuat!",
      description: `Kode referral Anda: ${newReferralCode}`,
    });
    
    setShowReferralModal(false);
  };

  // Social sharing functions
  const shareToSocialMedia = (platform: 'facebook' | 'twitter' | 'instagram' | 'whatsapp') => {
    const shareText = `🎉 Saya sudah mencapai tier ${loyaltyData.tier} di Villa Sawarna! 
    
🏆 Total Points: ${loyaltyData.totalPoints.toLocaleString()}
⭐ Tier: ${loyaltyData.tier}
🎁 Benefits: ${loyaltyData.tierBenefits.slice(0, 2).join(', ')}
    
Bergabunglah dengan program loyalty kami dan dapatkan rewards eksklusif! 🚀

#VillaSawarna #LoyaltyRewards #TravelIndonesia`;
    
    const shareUrl = window.location.origin;
    
    let shareLink = '';
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        break;
      case 'instagram':
        // Instagram doesn't support direct sharing, copy to clipboard
        navigator.clipboard.writeText(shareText + ' ' + shareUrl);
        toast({
          title: "Text Disalin!",
          description: "Text sudah disalin ke clipboard. Paste di Instagram story Anda!",
        });
        return;
    }
    
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  // Birthday notification effect
  useEffect(() => {
    if (loyaltyData.isBirthdayWeek && user?.birthday) {
      const birthday = new Date(user.birthday);
      const today = new Date();
      const isToday = today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();
      
      if (isToday) {
        toast({
          title: "🎉 Selamat Ulang Tahun!",
          description: "Anda mendapatkan bonus 200 points hari ini! Nikmati rewards spesial ulang tahun.",
          duration: 10000,
        });
      } else {
        const daysUntilBirthday = Math.ceil((new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate()).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (daysUntilBirthday > 0 && daysUntilBirthday <= 7) {
          toast({
            title: "🎂 Ulang Tahun Mendekati!",
            description: `${daysUntilBirthday} hari lagi ulang tahun Anda! Dapatkan bonus points spesial.`,
            duration: 8000,
          });
        }
      }
    }
  }, [loyaltyData.isBirthdayWeek, user?.birthday]);

  const tourSteps = useMemo(() => [
    {
      id: 'welcome',
      targetSelector: '#dashboard-title',
      title: 'Selamat datang di Dashboard',
      description: 'Di sini Anda bisa mengelola profil, wishlist, notifikasi, dan aktivitas terbaru.'
    },
    {
      id: 'tab-overview',
      targetSelector: "[data-tour='tab-overview']",
      title: 'Overview',
      description: 'Ringkasan cepat statistik dan aktivitas terbaru Anda.'
    },
    {
      id: 'tab-profile',
      targetSelector: "[data-tour='tab-profile']",
      title: 'Profil',
      description: 'Kelola informasi akun dan preferensi Anda di sini.'
    },
    {
      id: 'tab-wishlist',
      targetSelector: "[data-tour='tab-wishlist']",
      title: 'Wishlist',
      description: 'Lihat dan kelola daftar properti favorit Anda.'
    },
    {
      id: 'tab-notifications',
      targetSelector: "[data-tour='tab-notifications']",
      title: 'Notifikasi',
      description: 'Pantau update terbaru seperti promo dan info booking.'
    }
  ], []);

  useEffect(() => {
    if (localStorage.getItem('showDashboardTour') === '1') {
      localStorage.removeItem('showDashboardTour');
      setTimeout(() => setIsTourOpen(true), 450);
    }
  }, []);

  // Auto-scroll to active tab on mobile when tab changes
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile && activeTab) {
      const activeTabElement = document.querySelector(`[data-tour="tab-${activeTab}"]`) as HTMLElement;
      if (activeTabElement) {
        // Add a small delay to ensure the tab switch animation completes
        setTimeout(() => {
          activeTabElement.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
          });
        }, 100);
      }
    }
  }, [activeTab]);

  // Use real visit history data
  const { visitHistory, totalVisits, uniquePropertiesVisited } = useVisitHistory();

  // Filter and sort bookings
  const filteredBookings = useMemo(() => {
    let filtered = bookings;
    
    // Apply status filter
    if (bookingFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === bookingFilter);
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (bookingSort) {
        case 'date':
          return new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime();
        case 'price':
          return b.totalPrice - a.totalPrice;
        case 'status': {
          const statusOrder = { 'pending': 0, 'confirmed': 1, 'completed': 2, 'cancelled': 3 };
          return statusOrder[a.status] - statusOrder[b.status];
        }
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [bookings, bookingFilter, bookingSort]);

  const handleSearch = (filters: Record<string, unknown>) => {
    // Handle search functionality
    console.log('Search filters:', filters);
    toast({
      title: "Pencarian Dimulai",
      description: "Mencari properti sesuai kriteria Anda",
    });
  };

  const handleFiltersChange = (filters: Record<string, unknown>) => {
    // Handle filter changes
    console.log('Filters changed:', filters);
  };

  const handleCreateTravelPlan = () => {
    if (!newTravelPlan.title || !newTravelPlan.destination || !newTravelPlan.startDate || !newTravelPlan.endDate) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon isi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    const startDate = new Date(newTravelPlan.startDate);
    const endDate = new Date(newTravelPlan.endDate);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (totalDays <= 0) {
      toast({
        title: "Tanggal Tidak Valid",
        description: "Tanggal selesai harus setelah tanggal mulai",
        variant: "destructive"
      });
      return;
    }

    const plan = {
      title: newTravelPlan.title,
      description: newTravelPlan.description,
      destination: newTravelPlan.destination,
      startDate: newTravelPlan.startDate,
      endDate: newTravelPlan.endDate,
      totalDays,
      budget: {
        min: parseInt(newTravelPlan.budgetMin) || 0,
        max: parseInt(newTravelPlan.budgetMax) || 0,
        currency: newTravelPlan.currency
      },
      travelers: {
        adults: newTravelPlan.adults,
        children: newTravelPlan.children,
        infants: newTravelPlan.infants
      },
      status: 'planning' as const,
      accommodations: [],
      activities: [],
      transportation: [],
      notes: [],
      isPublic: false,
      sharedWith: []
    };

    // Add travel plan using context
    addTravelPlan(plan);

    // Reset form
    setNewTravelPlan({
      title: '',
      description: '',
      destination: '',
      startDate: '',
      endDate: '',
      budgetMin: '',
      budgetMax: '',
      currency: 'IDR',
      adults: 1,
      children: 0,
      infants: 0
    });

    setShowCreateTravelPlan(false);

    toast({
      title: "Travel Plan Berhasil Dibuat",
      description: `Plan "${plan.title}" telah dibuat dan siap untuk dikelola`,
    });
  };

  const handleViewTravelPlan = (plan: any) => {
    setSelectedTravelPlan(plan);
    setShowViewTravelPlan(true);
  };

  const handleEditTravelPlan = (plan: any) => {
    setSelectedTravelPlan(plan);
    setNewTravelPlan({
      title: plan.title,
      description: plan.description,
      destination: plan.destination,
      startDate: plan.startDate,
      endDate: plan.endDate,
      budgetMin: plan.budget.min.toString(),
      budgetMax: plan.budget.max.toString(),
      currency: plan.budget.currency,
      adults: plan.travelers.adults,
      children: plan.travelers.children,
      infants: plan.travelers.infants
    });
    setShowEditTravelPlan(true);
  };

  const handleUpdateTravelPlan = () => {
    if (!newTravelPlan.title || !newTravelPlan.destination || !newTravelPlan.startDate || !newTravelPlan.endDate) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon isi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    const startDate = new Date(newTravelPlan.startDate);
    const endDate = new Date(newTravelPlan.endDate);
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (totalDays <= 0) {
      toast({
        title: "Tanggal Tidak Valid",
        description: "Tanggal selesai harus setelah tanggal mulai",
        variant: "destructive"
      });
      return;
    }

    const updatedPlan = {
      ...selectedTravelPlan,
      title: newTravelPlan.title,
      description: newTravelPlan.description,
      destination: newTravelPlan.destination,
      startDate: newTravelPlan.startDate,
      endDate: newTravelPlan.endDate,
      totalDays,
      budget: {
        min: parseInt(newTravelPlan.budgetMin) || 0,
        max: parseInt(newTravelPlan.budgetMax) || 0,
        currency: newTravelPlan.currency
      },
      travelers: {
        adults: newTravelPlan.adults,
        children: newTravelPlan.children,
        infants: newTravelPlan.infants
      }
    };

    // Update travel plan using context (you'll need to implement this function)
    // updateTravelPlan(updatedPlan);

    setShowEditTravelPlan(false);
    setSelectedTravelPlan(null);

    toast({
      title: "Travel Plan Berhasil Diperbarui",
      description: `Plan "${updatedPlan.title}" telah diperbarui`,
    });
  };

  const handleStartNewChat = () => {
    if (!newChatData.subject || !newChatData.message) {
      toast({
        title: "Data Tidak Lengkap",
        description: "Mohon isi subject dan pesan",
        variant: "destructive"
      });
      return;
    }

    if (newChatData.recipientType === 'villa' && !newChatData.selectedVilla) {
      toast({
        title: "Villa Belum Dipilih",
        description: "Mohon pilih villa yang ingin dihubungi",
        variant: "destructive"
      });
      return;
    }

    // Create new conversation
    const newConversation = {
      id: `conv_${Date.now()}`,
      propertyName: newChatData.recipientType === 'villa' ? newChatData.selectedVilla : 'Tim Support',
      propertyImage: newChatData.recipientType === 'villa' ? '/images/placeholder-villa.jpg' : '/images/support-team.jpg',
      lastMessage: {
        senderName: user?.name || 'User',
        message: newChatData.message,
        timestamp: new Date().toISOString()
      },
      unreadCount: 0,
      isActive: true,
      priority: newChatData.priority,
      subject: newChatData.subject,
      createdAt: new Date().toISOString()
    };

    // Add conversation to context (you'll need to implement this function)
    // addConversation(newConversation);

    // Reset form
    setNewChatData({
      recipientType: 'villa',
      selectedVilla: '',
      subject: '',
      message: '',
      priority: 'normal'
    });

    setShowNewChat(false);

    toast({
      title: "Chat Baru Dibuat",
      description: `Percakapan dengan ${newConversation.propertyName} telah dimulai`,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 md:py-8">
        <div className="container mx-auto px-3 md:px-4">
          <Card>
            <CardContent className="text-center py-12">
              <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Login untuk Mengakses Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Kelola profil, booking, wishlist, dan notifikasi Anda
              </p>
              <Button asChild>
                <Link to="/login">Login Sekarang</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Dashboard Pengguna | Villa Sawarna"
        description="Kelola profil, booking, wishlist, dan notifikasi Anda di Villa Sawarna."
        keywords="dashboard pengguna, profil villa sawarna, booking, wishlist, notifikasi"
        url="https://villasawarna.com/dashboard"
        type="website"
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 md:py-8 pb-20 md:pb-8">
        <div className="container mx-auto px-3 md:px-4">
                     {/* Header */}
           <div className="mb-6 md:mb-8">
             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
               <div className="flex-1">
                 <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-ocean to-coral rounded-lg flex items-center justify-center">
                     <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <h1 id="dashboard-title" className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
                       Dashboard Pengguna
                     </h1>
                     <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 truncate">
                       Selamat datang kembali, {user.name || 'User'}! 👋
                     </p>
                   </div>
                 </div>
                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                   <span>Member sejak {new Date(stats.memberSince).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}</span>
                   <span className="hidden md:inline">•</span>
                   <span>Level: {stats.memberLevel} Member</span>
                   <span className="hidden md:inline">•</span>
                   <span>Poin: {stats.loyaltyPoints.toLocaleString()}</span>
                 </div>
               </div>
               
               <div className="flex items-center gap-3 md:gap-4">
                 <div className="text-right">
                   <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Terakhir login</p>
                   <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">
                     {new Date().toLocaleDateString('id-ID', { 
                       weekday: 'long', 
                       hour: '2-digit', 
                       minute: '2-digit' 
                     })}
                   </p>
                 </div>
                 <Avatar className="w-12 h-12 md:w-14 md:h-14 border-2 md:border-4 border-white dark:border-gray-800 shadow-lg">
                   <AvatarImage src={user?.profileImage || undefined} alt={user?.name || 'User'} />
                   <AvatarFallback className="bg-gradient-to-br from-ocean to-coral text-white text-sm md:text-lg font-semibold">
                     {user?.name?.charAt(0).toUpperCase() || 'U'}
                   </AvatarFallback>
                 </Avatar>
                 
                 {/* Mobile Logout Button */}
                 <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={() => {
                     localStorage.removeItem('user');
                     setUser(null);
                     navigate('/logout');
                   }}
                   className="md:hidden text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                 >
                   <LogOut className="w-4 h-4 mr-1" />
                   Logout
                 </Button>

                 {/* Clear Demo Data Button - Show only if there's demo data */}
                 {(bookings.length > 0 || reviews.length > 0) && (
                   <Button 
                     variant="outline" 
                     size="sm" 
                     onClick={clearDemoData}
                     className="md:hidden text-orange-600 hover:text-orange-700 border-orange-200 hover:bg-orange-50"
                   >
                     <XCircle className="w-4 h-4 mr-1" />
                     Hapus Demo
                   </Button>
                 )}
               </div>
             </div>
           </div>

                     {/* Quick Stats */}
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mb-6 md:mb-8">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-full -translate-y-10 translate-x-10"></div>
                             <CardContent className="p-4 md:p-6 relative">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total Booking</p>
                     <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stats.totalBookings}</p>
                   </div>
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                     <Calendar className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                   </div>
                 </div>
                 <div className="mt-3 md:mt-4 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                   <div className="flex items-center gap-1">
                     <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                     <span className="text-green-600 font-medium">{stats.completedBookings}</span>
                   </div>
                   <span className="text-gray-400 hidden md:inline">•</span>
                   <div className="flex items-center gap-1">
                     <Clock className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
                     <span className="text-yellow-600 font-medium">{stats.pendingBookings}</span>
                   </div>
                 </div>
               </CardContent>
            </Card>

                         <Card className="relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-full -translate-y-10 translate-x-10"></div>
               <CardContent className="p-4 md:p-6 relative">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Rating Rata-rata</p>
                     <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stats.averageRating}</p>
                   </div>
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                     <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-600 fill-yellow-600" />
                   </div>
                 </div>
                 <div className="mt-3 md:mt-4 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                   <div className="flex items-center gap-1">
                     <ThumbsUp className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                     <span className="text-gray-600 dark:text-gray-400">Berdasarkan {stats.totalReviews} review</span>
                   </div>
                 </div>
               </CardContent>
             </Card>

                         <Card className="relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-full -translate-y-10 translate-x-10"></div>
               <CardContent className="p-4 md:p-6 relative">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Wishlist</p>
                     <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stats.wishlistItems}</p>
                   </div>
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                     <Heart className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                   </div>
                 </div>
                 <div className="mt-3 md:mt-4 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                   <div className="flex items-center gap-1">
                     <Bookmark className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                     <span className="text-gray-600 dark:text-gray-400">{stats.savedSearches} pencarian tersimpan</span>
                   </div>
                 </div>
               </CardContent>
             </Card>

             <Card className="relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-full -translate-y-10 translate-x-10"></div>
               <CardContent className="p-4 md:p-6 relative">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Notifikasi</p>
                     <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{stats.unreadNotifications}</p>
                   </div>
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                     <Bell className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                   </div>
                 </div>
                 <div className="mt-3 md:mt-4 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                   <div className="flex items-center gap-1">
                     <AlertCircle className="w-3 h-3 md:w-4 md:h-4 text-orange-500" />
                     <span className="text-gray-600 dark:text-gray-400">Belum dibaca</span>
                   </div>
                 </div>
               </CardContent>
             </Card>

             {/* Visit History Stats */}
             <Card className="relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full -translate-y-10 translate-x-10"></div>
               <CardContent className="p-4 md:p-6 relative">
                 <div className="flex items-center justify-between">
                   <div>
                     <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total View</p>
                     <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{totalVisits}</p>
                   </div>
                   <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                     <Eye className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                   </div>
                 </div>
                 <div className="mt-3 md:mt-4 flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                   <div className="flex items-center gap-1">
                     <MapPin className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                     <span className="text-gray-600 dark:text-gray-400">{uniquePropertiesVisited} properti</span>
                   </div>
                 </div>
               </CardContent>
             </Card>
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={handleUserTabChange} className="space-y-6">
                         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Mobile Tab Navigation - Horizontal Scroll */}
              <div className="md:hidden w-full overflow-x-auto scrollbar-hide" id="mobile-tab-navigation">
                <TabsList className="flex w-max bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger data-tour="tab-overview" value="overview" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <TrendingUp className="w-3 h-3" />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger data-tour="tab-profile" value="profile" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <User className="w-3 h-3" />
                    <span>Profil</span>
                  </TabsTrigger>
                  <TabsTrigger data-tour="tab-bookings" value="bookings" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <Calendar className="w-3 h-3" />
                    <span>Booking</span>
                  </TabsTrigger>
                  <TabsTrigger data-tour="tab-wishlist" value="wishlist" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <Heart className="w-3 h-3" />
                    <span>Wishlist</span>
                  </TabsTrigger>
                  <TabsTrigger data-tour="tab-notifications" value="notifications" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <Bell className="w-3 h-3" />
                    <span>Notif</span>
                  </TabsTrigger>
                  <TabsTrigger value="messages" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <MessageSquare className="w-3 h-3" />
                    <span>Pesan</span>
                  </TabsTrigger>
                  <TabsTrigger value="travel-plans" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <MapPin className="w-3 h-3" />
                    <span>Travel</span>
                  </TabsTrigger>
                  <TabsTrigger value="visits" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <Eye className="w-3 h-3" />
                    <span>Riwayat</span>
                  </TabsTrigger>
                  <TabsTrigger value="loyalty" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <Award className="w-3 h-3" />
                    <span>Rewards</span>
                  </TabsTrigger>
                  <TabsTrigger value="search" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3 transition-all duration-200">
                    <Search className="w-3 h-3" />
                    <span>Cari</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {/* Desktop Tab Navigation */}
              <TabsList className="hidden md:grid w-auto grid-cols-7 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger data-tour="tab-overview" value="overview" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger data-tour="tab-profile" value="profile" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <User className="w-4 h-4" />
                  <span>Profil</span>
                </TabsTrigger>
                <TabsTrigger value="bookings" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Booking</span>
                </TabsTrigger>
                <TabsTrigger data-tour="tab-wishlist" value="wishlist" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </TabsTrigger>
                <TabsTrigger data-tour="tab-notifications" value="notifications" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <Bell className="w-4 h-4" />
                  <span>Notifikasi</span>
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>Pesan</span>
                </TabsTrigger>
                <TabsTrigger value="travel-plans" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Travel Plans</span>
                </TabsTrigger>
                <TabsTrigger value="visits" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <Eye className="w-4 h-4" />
                  <span>Riwayat</span>
                </TabsTrigger>
                <TabsTrigger value="search" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <Search className="w-4 h-4" />
                  <span>Pencarian</span>
                 </TabsTrigger>
               </TabsList>
               
               <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm" className="hidden md:flex">
                   <Download className="w-4 h-4 mr-2" />
                   Export Data
                 </Button>
                 <Button variant="outline" size="sm">
                   <Settings className="w-4 h-4" />
                 </Button>
               </div>
             </div>

            {/* Overview Tab */}
            <TabsContent value="overview">
              {/* Demo Data Notice */}
              {(bookings.length > 0 || reviews.length > 0) && (
                <Card className="mb-6 border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-1">
                          Data Demo Ditemukan
                        </h4>
                        <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
                          Dashboard saat ini menampilkan data demo untuk tujuan testing. 
                          Klik tombol di bawah untuk menghapus data demo dan mulai dengan data real Anda.
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={clearDemoData}
                            className="text-orange-600 hover:text-orange-700 border-orange-200 hover:bg-orange-50"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Hapus Data Demo
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={emergencyCleanup}
                            className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Emergency Cleanup
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              console.log('📊 Current state:', {
                                bookings: bookings.length,
                                reviews: reviews.length,
                                notifications: notifications.length,
                                recentActivities: recentActivities.length,
                                stats
                              });
                            }}
                            className="text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Debug State
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activities */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Aktivitas Terbaru</CardTitle>
                        <CardDescription>
                          Aktivitas terbaru Anda di Villa Sawarna
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.length > 0 ? (
                          recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                {activity.icon}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                  {activity.title}
                                </h4>
                                {activity.status && (
                                  <Badge 
                                    variant={activity.status === 'success' ? 'default' : activity.status === 'pending' ? 'secondary' : 'destructive'}
                                    className="text-xs"
                                  >
                                    {activity.status === 'success' ? 'Berhasil' : activity.status === 'pending' ? 'Menunggu' : 'Gagal'}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {activity.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span>{new Date(activity.timestamp).toLocaleDateString('id-ID', { 
                                    day: 'numeric', 
                                    month: 'short', 
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}</span>
                                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Lihat Detail
                                </Button>
                              </div>
                            </div>
                          </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                            <p className="text-sm font-medium">Belum ada aktivitas</p>
                            <p className="text-xs">Mulai beraktivitas untuk melihat riwayat di sini</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions & Stats */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Aksi Cepat</CardTitle>
                      <CardDescription>
                        Akses fitur-fitur utama dengan cepat
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button asChild className="w-full justify-start" variant="outline">
                        <Link to="/villas">
                          <Search className="w-4 h-4 mr-2" />
                          Cari Properti
                        </Link>
                      </Button>
                      
                      <Button asChild className="w-full justify-start" variant="outline">
                        <Link to="/promos">
                          <Gift className="w-4 h-4 mr-2" />
                          Lihat Promo
                        </Link>
                      </Button>
                      
                      <Button asChild className="w-full justify-start" variant="outline">
                        <Link to="/contact">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Hubungi Support
                        </Link>
                      </Button>
                      
                      <Button asChild className="w-full justify-start" variant="outline">
                        <Link to="/map">
                          <MapPin className="w-4 h-4 mr-2" />
                          Lihat Peta
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Real-time Data Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Ringkasan Data</CardTitle>
                      <CardDescription>
                        Data real-time dari aktivitas Anda
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Recent Bookings */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Booking Terbaru</span>
                          <Badge variant="outline" className="text-xs">
                            {bookings.length} total
                          </Badge>
                        </div>
                        {bookings.length > 0 ? (
                          <div className="space-y-2">
                            {bookings.slice(0, 2).map((booking) => (
                              <div key={booking.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                                  <Calendar className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                    {booking.propertyName}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {new Date(booking.checkIn).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {new Date(booking.checkOut).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                  </p>
                                </div>
                                <Badge 
                                  variant={booking.status === 'confirmed' ? 'default' : booking.status === 'pending' ? 'secondary' : 'destructive'}
                                  className="text-xs"
                                >
                                  {booking.status === 'confirmed' ? 'Konfirmasi' : booking.status === 'pending' ? 'Pending' : booking.status === 'completed' ? 'Selesai' : 'Batal'}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-3 text-gray-400 text-xs">
                            Belum ada booking
                          </div>
                        )}
                      </div>

                      {/* Recent Reviews */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Review Terbaru</span>
                          <Badge variant="outline" className="text-xs">
                            {reviews.length} total
                          </Badge>
                        </div>
                        {reviews.length > 0 ? (
                          <div className="space-y-2">
                            {reviews.slice(0, 2).map((review) => (
                              <div key={review.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                                  <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                    {review.propertyName}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`w-3 h-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(review.reviewDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-3 text-gray-400 text-xs">
                            Belum ada review
                          </div>
                        )}
                      </div>

                      {/* Visit History Summary */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-gray-700 dark:text-gray-300">Riwayat Kunjungan</span>
                          <Badge variant="outline" className="text-xs">
                            {totalVisits} total
                          </Badge>
                        </div>
                        {visitHistory.length > 0 ? (
                          <div className="space-y-2">
                            {visitHistory.slice(0, 2).map((visit) => (
                              <div key={visit.id} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                  <Eye className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                    {visit.villaName}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {visit.viewCount}x dilihat
                                  </p>
                                </div>
                                <span className="text-xs text-gray-500">
                                  {new Date(visit.visitDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-3 text-gray-400 text-xs">
                            Belum ada kunjungan
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievement Badges - Dynamic based on real data */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pencapaian</CardTitle>
                      <CardDescription>
                        Badge yang telah Anda dapatkan berdasarkan aktivitas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Reviewer Badge - Dynamic */}
                        {stats.totalReviews >= 5 && (
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                            <Award className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-200">Reviewer Aktif</p>
                              <p className="text-sm text-yellow-600 dark:text-yellow-300">{stats.totalReviews} review diberikan</p>
                          </div>
                        </div>
                        )}
                        
                        {/* Loyal Guest Badge - Dynamic */}
                        {stats.completedBookings >= 3 && (
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-800 dark:text-blue-200">Tamu Setia</p>
                              <p className="text-sm text-blue-600 dark:text-blue-300">{stats.completedBookings} booking selesai</p>
                          </div>
                        </div>
                        )}
                        
                        {/* Collector Badge - Dynamic */}
                        {stats.wishlistItems >= 5 && (
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <Heart className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-green-800 dark:text-green-200">Kolektor</p>
                              <p className="text-sm text-green-600 dark:text-green-300">{stats.wishlistItems} item wishlist</p>
                          </div>
                        </div>
                        )}

                        {/* Explorer Badge - Dynamic */}
                        {uniquePropertiesVisited >= 10 && (
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-medium text-purple-800 dark:text-purple-200">Penjelajah</p>
                              <p className="text-sm text-purple-600 dark:text-purple-300">{uniquePropertiesVisited} properti dikunjungi</p>
                            </div>
                          </div>
                        )}

                        {/* High Spender Badge - Dynamic */}
                        {stats.totalSpent >= 5000000 && (
                          <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                              <p className="font-medium text-amber-800 dark:text-amber-200">High Spender</p>
                              <p className="text-sm text-amber-600 dark:text-amber-300">Total Rp {(stats.totalSpent / 1000000).toFixed(1)}M</p>
                            </div>
                          </div>
                        )}

                        {/* No badges yet message */}
                        {stats.totalReviews < 5 && stats.completedBookings < 3 && stats.wishlistItems < 5 && uniquePropertiesVisited < 10 && stats.totalSpent < 5000000 && (
                          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                            <Award className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">Belum ada badge yang didapat</p>
                            <p className="text-xs">Mulai beraktivitas untuk mendapatkan badge!</p>
                          </div>
                        )}

                        {/* Quick Actions */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-3">Aksi Cepat</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              asChild
                              className="border-blue-200 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-800/30"
                            >
                              <Link to="/villas">
                                <Building2 className="w-4 h-4 mr-2" />
                                Jelajahi Villa
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              asChild
                              className="border-blue-200 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-800/30"
                            >
                              <Link to="/search">
                                <Search className="w-4 h-4 mr-2" />
                                Cari Properti
                              </Link>
                            </Button>
                          </div>
                        </div>

                        {/* AI Recommendations */}
                        {aiRecommendations.length > 0 && (
                          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3 flex items-center gap-2">
                              <Sparkles className="w-5 h-5" />
                              Rekomendasi AI untuk Anda
                            </h4>
                            <div className="space-y-3">
                              {aiRecommendations.slice(0, 2).map((rec) => (
                                <div key={rec.id} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors cursor-pointer">
                                  <div className="flex items-start gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-800/30 dark:to-pink-800/30 rounded-lg flex items-center justify-center">
                                      <span className="text-lg">{rec.title.split(' ')[0]}</span>
                                    </div>
                                    <div className="flex-1">
                                      <h5 className="font-medium text-purple-900 dark:text-purple-100 mb-1">
                                        {rec.title}
                                      </h5>
                                      <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                                        {rec.description}
                                      </p>
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                                          {rec.reason}
                                        </span>
                                        <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                                          {rec.estimatedPrice}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Check-in Reminders */}
                        {checkInReminders.length > 0 && (
                          <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                            <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                              <Bell className="w-5 h-5" />
                              Check-in Reminders
                            </h4>
                            <div className="space-y-3">
                              {checkInReminders.slice(0, 3).map((reminder) => (
                                <div key={reminder.id} className={`p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border-l-4 ${
                                  reminder.priority === 'high' ? 'border-l-red-500' : 
                                  reminder.priority === 'medium' ? 'border-l-orange-500' : 'border-l-blue-500'
                                }`}>
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h5 className="font-medium text-orange-900 dark:text-orange-100 mb-1">
                                        {reminder.title}
                                      </h5>
                                      <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                                        {reminder.description}
                                      </p>
                                      <div className="flex items-center gap-4">
                                        <span className="text-xs text-orange-600 dark:text-orange-400">
                                          {reminder.booking.propertyName}
                                        </span>
                                        {reminder.booking.destination && (
                                          <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                                            <span>🌤️</span>
                                            <span>{getDestinationWeather(reminder.booking.destination).temp}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-800/30">
                                      {reminder.action}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Loyalty & Rewards Card */}
                        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-medium text-amber-800 dark:text-amber-200">Loyalty & Rewards</h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-200">
                                {loyaltyData.tier}
                              </Badge>
                              {loyaltyData.isBirthdayWeek && (
                                <Badge variant="default" className="bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-200">
                                  🎂 Birthday Week!
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          {/* Birthday Bonus Alert */}
                          {loyaltyData.isBirthdayWeek && (
                            <div className="mb-4 p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
                              <div className="flex items-center gap-2">
                                <span className="text-2xl">🎉</span>
                                <div>
                                  <p className="text-sm font-medium text-pink-800 dark:text-pink-200">
                                    Birthday Bonus Active!
                                  </p>
                                  <p className="text-xs text-pink-600 dark:text-pink-400">
                                    +{loyaltyData.birthdayBonus} points selama birthday week
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Points Display */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-amber-700 dark:text-amber-300">Total Points</span>
                              <span className="text-lg font-bold text-amber-800 dark:text-amber-200">
                                {loyaltyData.totalPoints.toLocaleString()}
                              </span>
                            </div>
                            
                            {/* Progress Bar */}
                            {loyaltyData.nextTierPoints && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400">
                                  <span>Progress ke {loyaltyData.tier === 'Bronze' ? 'Silver' : loyaltyData.tier === 'Silver' ? 'Gold' : 'Platinum'}</span>
                                  <span>{loyaltyData.progressToNextTier.toFixed(0)}%</span>
                                </div>
                                <div className="w-full bg-amber-200 dark:bg-amber-800/30 rounded-full h-2">
                                  <div 
                                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${loyaltyData.progressToNextTier}%` }}
                                  ></div>
                                </div>
                                <p className="text-xs text-amber-600 dark:text-amber-400">
                                  {loyaltyData.nextTierPoints - loyaltyData.totalPoints} points lagi untuk naik tier
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Tier Benefits */}
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Benefit {loyaltyData.tier}:</h5>
                            <ul className="space-y-1">
                              {loyaltyData.tierBenefits.map((benefit, index) => (
                                <li key={index} className="flex items-center text-xs text-amber-700 dark:text-amber-300">
                                  <CheckCircle className="w-3 h-3 mr-2 text-amber-500" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowReferralModal(true)}
                              className="border-amber-200 hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-800/30 text-amber-700 dark:text-amber-300"
                            >
                              <Gift className="w-4 h-4 mr-1" />
                              Referral
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowRewardsHistory(true)}
                              className="border-amber-200 hover:bg-amber-100 dark:border-amber-700 dark:hover:bg-amber-800/30 text-amber-700 dark:text-amber-300"
                            >
                              <Award className="w-4 h-4 mr-1" />
                              History
                            </Button>
                          </div>

                          {/* Additional Action Buttons */}
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowRedemptionModal(true)}
                              className="border-green-200 hover:bg-green-100 dark:border-green-700 dark:hover:bg-green-800/30 text-green-700 dark:text-green-300"
                            >
                              <Star className="w-4 h-4 mr-1" />
                              Tukar Points
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowPromotionsModal(true)}
                              className="border-purple-200 hover:bg-purple-100 dark:border-purple-700 dark:hover:bg-purple-800/30 text-purple-700 dark:text-purple-300"
                            >
                              <TrendingUp className="w-4 h-4 mr-1" />
                              Promo
                            </Button>
                          </div>

                          {/* Social Sharing */}
                          <div className="border-t border-amber-200 dark:border-amber-800 pt-3">
                            <p className="text-xs text-amber-600 dark:text-amber-400 mb-2 text-center">Bagikan Achievement Anda</p>
                            <div className="flex justify-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => shareToSocialMedia('facebook')}
                                className="w-8 h-8 p-0 bg-blue-100 hover:bg-blue-200 text-blue-600 dark:bg-blue-800/30 dark:hover:bg-blue-800/50"
                              >
                                <span className="text-sm">f</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => shareToSocialMedia('twitter')}
                                className="w-8 h-8 p-0 bg-sky-100 hover:bg-sky-200 text-sky-600 dark:bg-sky-800/30 dark:hover:bg-sky-800/50"
                              >
                                <span className="text-sm">𝕏</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => shareToSocialMedia('whatsapp')}
                                className="w-8 h-8 p-0 bg-green-100 hover:bg-green-200 text-green-600 dark:bg-green-800/30 dark:hover:bg-green-800/50"
                              >
                                <span className="text-sm">📱</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => shareToSocialMedia('instagram')}
                                className="w-8 h-8 p-0 bg-pink-100 hover:bg-pink-200 text-pink-600 dark:bg-pink-800/30 dark:hover:bg-pink-800/50"
                              >
                                <span className="text-sm">📷</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="space-y-6">
                {/* Profile Overview Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Profil Pengguna</CardTitle>
                    <CardDescription>
                      Kelola informasi profil dan pengaturan akun Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* User Info */}
                      <div className="flex items-center gap-4">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={user?.profileImage} alt={user?.name} />
                          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold">{user?.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                          <Badge variant="secondary" className="mt-2">Member Aktif</Badge>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      {/* Profile Actions */}
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('edit-profile')}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profil
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('account-settings')}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Pengaturan Akun
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('security-privacy')}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Keamanan & Privasi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Edit Profile Tab */}
            <TabsContent value="edit-profile">
              <EditProfileForm user={user} onBack={() => setActiveTab('profile')} />
            </TabsContent>

            {/* Account Settings Tab */}
            <TabsContent value="account-settings">
              <AccountSettingsForm user={user} onBack={() => setActiveTab('profile')} />
            </TabsContent>

            {/* Security & Privacy Tab */}
            <TabsContent value="security-privacy">
              <SecurityPrivacyForm user={user} onBack={() => setActiveTab('profile')} />
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings">
              <div className="space-y-6">
                {/* Booking Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Selesai</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {bookings.filter(b => b.status === 'completed').length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Dikonfirmasi</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {bookings.filter(b => b.status === 'confirmed').length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Menunggu</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {bookings.filter(b => b.status === 'pending').length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                          <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Dibatalkan</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {bookings.filter(b => b.status === 'cancelled').length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Booking List */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Riwayat Booking</CardTitle>
                      <CardDescription>
                        {bookings.length > 0 
                          ? `Anda memiliki ${bookings.length} booking` 
                          : 'Belum ada booking'
                        }
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowBookingFilters(!showBookingFilters)}
                      >
                        <Filter className="w-4 h-4 mr-2" />
                        Filter ({filteredBookings.length})
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const sorts = ['date', 'price', 'status'];
                          const currentIndex = sorts.indexOf(bookingSort);
                          const nextSort = sorts[(currentIndex + 1) % sorts.length];
                          setBookingSort(nextSort as any);
                        }}
                      >
                        <SortAsc className="w-4 h-4 mr-2" />
                        {bookingSort === 'date' ? 'Tanggal' : 
                         bookingSort === 'price' ? 'Harga' : 'Status'}
                      </Button>
                    </div>
                  </CardHeader>
                  
                  {/* Filter Panel */}
                  {showBookingFilters && (
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter Status:</span>
                        {(['all', 'confirmed', 'pending', 'completed', 'cancelled'] as const).map((status) => (
                          <Button
                            key={status}
                            variant={bookingFilter === status ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setBookingFilter(status)}
                            className="text-xs"
                          >
                            {status === 'all' ? 'Semua' : 
                             status === 'confirmed' ? 'Dikonfirmasi' : 
                             status === 'pending' ? 'Menunggu' : 
                             status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <CardContent>
                    <div className="space-y-4">
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                          <div key={booking.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <img 
                              src={booking.propertyImage} 
                              alt={booking.propertyName}
                              className="w-16 h-16 rounded-lg object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/images/placeholder-villa.jpg';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                  {booking.propertyName}
                                </h4>
                                <Badge 
                                  variant={
                                    booking.status === 'confirmed' ? 'default' : 
                                    booking.status === 'completed' ? 'secondary' : 
                                    booking.status === 'pending' ? 'outline' : 'destructive'
                                  }
                                  className="text-xs"
                                >
                                  {booking.status === 'confirmed' ? 'Dikonfirmasi' : 
                                   booking.status === 'pending' ? 'Menunggu' : 
                                   booking.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                                </Badge>
                                {booking.paymentStatus && (
                                  <Badge 
                                    variant={booking.paymentStatus === 'paid' ? 'secondary' : 'outline'}
                                    className="text-xs ml-2"
                                  >
                                    {booking.paymentStatus === 'paid' ? 'Lunas' : 'Pending'}
                                  </Badge>
                                )}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <div>
                                  <span className="font-medium">Check-in:</span> {new Date(booking.checkIn).toLocaleDateString('id-ID')}
                                </div>
                                <div>
                                  <span className="font-medium">Check-out:</span> {new Date(booking.checkOut).toLocaleDateString('id-ID')}
                                </div>
                                <div>
                                  <span className="font-medium">Tamu:</span> {booking.guests} orang
                                </div>
                                <div>
                                  <span className="font-medium">Total:</span> Rp {booking.totalPrice.toLocaleString('id-ID')}
                                </div>
                              </div>
                              <div className="mt-2 text-xs text-gray-500">
                                <span className="font-medium">Booking Date:</span> {new Date(booking.bookingDate).toLocaleDateString('id-ID')}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  // Navigate to property detail
                                  navigate(`/villas/${booking.propertyId}`);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                                Detail
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  // Show booking actions menu
                                  toast({
                                    title: "Aksi Booking",
                                    description: "Fitur aksi booking akan segera tersedia",
                                  });
                                }}
                              >
                                <MoreHorizontal className="w-4 h-4" />
                                Aksi
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <Calendar className="w-8 h-8 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {bookingFilter === 'all' ? 'Belum Ada Booking' : 'Tidak Ada Booking dengan Status Ini'}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 mb-4">
                            {bookingFilter === 'all' 
                              ? 'Mulai jelajahi villa dan buat booking pertama Anda'
                              : 'Coba ubah filter atau lihat semua booking'
                            }
                          </p>
                          <div className="flex gap-2 justify-center">
                            {bookingFilter !== 'all' && (
                              <Button 
                                variant="outline" 
                                onClick={() => setBookingFilter('all')}
                              >
                                Lihat Semua
                              </Button>
                            )}
                            <Button asChild>
                              <Link to="/villas">
                                Jelajahi Villa
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist">
              <WishlistSystem />
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <NotificationSystem />
            </TabsContent>

                         {/* Visit History Tab */}
             <TabsContent value="visits">
               <div className="space-y-6">
                 {/* Visit Stats */}
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   <Card>
                     <CardContent className="p-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                           <Eye className="w-5 h-5 text-blue-600" />
                         </div>
                         <div>
                           <p className="text-sm text-gray-600 dark:text-gray-400">Total Kunjungan</p>
                           <p className="text-xl font-bold text-gray-900 dark:text-white">
                             {visitHistory.length}
                           </p>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                   
                   <Card>
                     <CardContent className="p-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                           <Heart className="w-5 h-5 text-green-600" />
                         </div>
                         <div>
                           <p className="text-sm text-gray-600 dark:text-gray-400">Di Bookmark</p>
                           <p className="text-xl font-bold text-gray-900 dark:text-white">
                             {visitHistory.filter(v => v.isBookmarked).length}
                           </p>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                   
                   <Card>
                     <CardContent className="p-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                           <Clock className="w-5 h-5 text-purple-600" />
                         </div>
                         <div>
                           <p className="text-sm text-gray-600 dark:text-gray-400">Rata-rata Durasi</p>
                           <p className="text-xl font-bold text-gray-900 dark:text-white">6.8 menit</p>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                   
                   <Card>
                     <CardContent className="p-4">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                           <TrendingUp className="w-5 h-5 text-orange-600" />
                         </div>
                         <div>
                           <p className="text-sm text-gray-600 dark:text-gray-400">Total View</p>
                           <p className="text-xl font-bold text-gray-900 dark:text-white">
                             {totalVisits}
                           </p>
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 </div>

                 {/* Visit History List */}
                 <Card>
                   <CardHeader className="flex flex-row items-center justify-between">
                     <div>
                       <CardTitle>Riwayat Kunjungan Villa</CardTitle>
                       <CardDescription>
                         Villa-villa yang pernah Anda kunjungi dan lihat
                       </CardDescription>
                     </div>
                     <div className="flex items-center gap-2">
                       <Button variant="outline" size="sm">
                         <Filter className="w-4 h-4 mr-2" />
                         Filter
                       </Button>
                       <Button variant="outline" size="sm">
                         <SortAsc className="w-4 h-4 mr-2" />
                         Urutkan
                       </Button>
                       {/* Demo buttons - hapus setelah testing */}
                       <Button 
                         variant="outline" 
                         size="sm" 
                         onClick={addDemoVisits}
                         className="bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                       >
                         + Demo Data
                       </Button>
                       <Button 
                         variant="outline" 
                         size="sm" 
                         onClick={clearDemoVisits}
                         className="bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                       >
                         Clear Data
                       </Button>
                     </div>
                   </CardHeader>
                   <CardContent>
                     <div className="space-y-4">
                       {visitHistory.map((visit) => (
                         <div key={visit.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800">
                           {/* Image Section - Full Width */}
                           <div className="relative w-full h-48 md:h-56">
                           <img 
                             src={visit.villaImage} 
                             alt={visit.villaName}
                               className="w-full h-full object-cover"
                             onError={(e) => {
                                 e.currentTarget.src = 'https://i.imgur.com/KNZs2rS.jpeg';
                               }}
                             />
                             {/* Bookmark Badge */}
                               {visit.isBookmarked && (
                               <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                                 <Heart className="w-3 h-3 mr-1 inline" />
                                   Bookmark
                               </div>
                               )}
                             {/* Visit Count Badge */}
                             <div className="absolute top-3 left-3 bg-blue-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                               {visit.viewCount}x dilihat
                             </div>
                               </div>
                           
                           {/* Content Section */}
                           <div className="p-4 md:p-6">
                             {/* Villa Name */}
                             <div className="mb-4">
                               <h4 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">
                                 {visit.villaName}
                               </h4>
                               </div>
                             
                             {/* Visit Information - Grid Layout */}
                             <div className="grid grid-cols-2 gap-3 mb-4">
                               <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center border border-blue-200 dark:border-blue-800">
                                 <div className="flex items-center justify-center gap-1 mb-1">
                                   <Calendar className="w-4 h-4 text-blue-500" />
                                   <span className="font-bold text-blue-700 dark:text-blue-300">
                                     {new Date(visit.visitDate).toLocaleDateString('id-ID')}
                                   </span>
                               </div>
                                 <div className="text-xs text-blue-600 dark:text-blue-400">
                                   Tanggal Kunjungan
                               </div>
                             </div>
                               <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center border border-green-200 dark:border-green-800">
                                 <div className="flex items-center justify-center gap-1 mb-1">
                                   <Clock className="w-4 h-4 text-green-500" />
                                   <span className="font-bold text-green-700 dark:text-green-300">
                                     {visit.visitDuration}
                                   </span>
                           </div>
                                 <div className="text-xs text-green-600 dark:text-green-400">
                                   Durasi Kunjungan
                                 </div>
                               </div>
                             </div>
                             
                             {/* Last Viewed */}
                             <div className="mb-4">
                               <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                                 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                   <Eye className="w-4 h-4 text-gray-500" />
                                   <span className="font-medium">Terakhir dilihat:</span>
                                   <span>{visit.lastViewed}</span>
                                 </div>
                               </div>
                             </div>
                             
                             {/* Action Buttons */}
                             <div className="flex flex-col sm:flex-row gap-3">
                               <Button variant="outline" size="sm" asChild className="flex-1">
                               <Link to={visit.villaUrl}>
                                   <Eye className="w-4 h-4 mr-2" />
                                   <span className="hidden sm:inline">Lihat Detail</span>
                                   <span className="sm:hidden">Detail</span>
                               </Link>
                             </Button>
                             <Button 
                               variant="outline" 
                               size="sm"
                               onClick={() => {
                                 toast({
                                   title: visit.isBookmarked ? "Dihapus dari Bookmark" : "Ditambahkan ke Bookmark",
                                   description: `${visit.villaName} ${visit.isBookmarked ? 'dihapus dari' : 'ditambahkan ke'} bookmark Anda.`,
                                 });
                               }}
                                 className="flex-1"
                               >
                                 <Heart className={`w-4 h-4 mr-2 ${visit.isBookmarked ? 'fill-red-500 text-red-500' : ''}`} />
                                 <span className="hidden sm:inline">
                                   {visit.isBookmarked ? 'Hapus Bookmark' : 'Tambah Bookmark'}
                                 </span>
                                 <span className="sm:hidden">
                                   {visit.isBookmarked ? 'Hapus' : 'Simpan'}
                                 </span>
                             </Button>
                             </div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </TabsContent>

             {/* Loyalty & Rewards Tab */}
             <TabsContent value="loyalty">
               <div className="space-y-6">
                 {/* Loyalty Overview */}
                 <Card>
                   <CardHeader>
                     <CardTitle>Loyalty & Rewards</CardTitle>
                     <CardDescription>
                       Kelola points, tier, dan rewards Anda
                     </CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       {/* Current Tier */}
                       <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                         <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 dark:bg-amber-800/30 rounded-full flex items-center justify-center">
                           <Award className="w-8 h-8 text-amber-600" />
                         </div>
                         <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">
                           {loyaltyData.tier}
                         </h3>
                         <p className="text-sm text-amber-600 dark:text-amber-400">
                           Tier Saat Ini
                         </p>
                       </div>

                       {/* Total Points */}
                       <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                         <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-800/30 rounded-full flex items-center justify-center">
                           <Star className="w-8 h-8 text-blue-600" />
                         </div>
                         <h3 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">
                           {loyaltyData.totalPoints.toLocaleString()}
                         </h3>
                         <p className="text-sm text-blue-600 dark:text-blue-400">
                           Total Points
                         </p>
                       </div>

                       {/* Next Tier Progress */}
                       <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                         <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center">
                           <TrendingUp className="w-8 h-8 text-green-600" />
                         </div>
                         <h3 className="text-lg font-bold text-green-800 dark:text-green-200 mb-2">
                           {loyaltyData.nextTierPoints ? `${loyaltyData.progressToNextTier.toFixed(0)}%` : 'Max'}
                         </h3>
                         <p className="text-sm text-green-600 dark:text-green-400">
                           {loyaltyData.nextTierPoints ? 'Progress Tier' : 'Tier Tertinggi'}
                         </p>
                       </div>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Tier Benefits */}
                 <Card>
                   <CardHeader>
                     <CardTitle>Benefit Tier {loyaltyData.tier}</CardTitle>
                     <CardDescription>
                       Nikmati benefit eksklusif sesuai tier Anda
                     </CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {loyaltyData.tierBenefits.map((benefit, index) => (
                         <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                           <CheckCircle className="w-5 h-5 text-green-500" />
                           <span className="text-sm font-medium">{benefit}</span>
                         </div>
                       ))}
                     </div>
                   </CardContent>
                 </Card>

                 {/* Actions */}
                 <Card>
                   <CardHeader>
                     <CardTitle>Aksi Loyalty</CardTitle>
                     <CardDescription>
                       Kelola program referral dan lihat riwayat rewards
                     </CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <Button 
                         variant="outline" 
                         className="h-auto py-6"
                         onClick={() => setShowReferralModal(true)}
                       >
                         <div className="text-center">
                           <Gift className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                           <h4 className="font-medium">Program Referral</h4>
                           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                             Ajak teman dan dapatkan points
                           </p>
                         </div>
                       </Button>
                       
                       <Button 
                         variant="outline" 
                         className="h-auto py-6"
                         onClick={() => setShowRewardsHistory(true)}
                       >
                         <div className="text-center">
                           <Award className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                           <h4 className="font-medium">Riwayat Rewards</h4>
                           <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                             Lihat detail points dan tier
                           </p>
                         </div>
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </TabsContent>

             {/* Search Tab */}
             <TabsContent value="search">
               <Card>
                 <CardHeader>
                   <CardTitle>Pencarian Lanjutan</CardTitle>
                   <CardDescription>
                     Gunakan filter lanjutan untuk menemukan properti yang tepat
                   </CardDescription>
                 </CardHeader>
                 <CardContent>
                   <EnhancedSearchFilter
                     onSearch={handleSearch}
                     onFiltersChange={handleFiltersChange}
                     showAdvancedFilters={true}
                   />
                 </CardContent>
               </Card>
             </TabsContent>

             {/* Messages Tab */}
             <TabsContent value="messages">
               <div className="space-y-6">
                 {/* Messages Overview */}
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   <Card>
                     <CardContent className="p-4">
                       <div className="flex items-center justify-between">
                         <div>
                           <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pesan</p>
                           <p className="text-2xl font-bold text-gray-900 dark:text-white">{conversations.length}</p>
                         </div>
                         <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                           <MessageSquare className="w-5 h-5 text-blue-600" />
                         </div>
                       </div>
                     </CardContent>
                   </Card>

                   <Card>
                     <CardContent className="p-4">
                       <div className="flex items-center justify-between">
                         <div>
                           <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Belum Dibaca</p>
                           <p className="text-2xl font-bold text-gray-900 dark:text-white">{conversations.reduce((total, conv) => total + conv.unreadCount, 0)}</p>
                         </div>
                         <div className="w-10 h-10 bg-red-500/10 rounded-xl flex items-center justify-center">
                           <Bell className="w-5 h-5 text-red-600" />
                         </div>
                       </div>
                     </CardContent>
                   </Card>

                   <Card>
                     <CardContent className="p-4">
                       <div className="flex items-center justify-between">
                         <div>
                           <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Chat Aktif</p>
                           <p className="text-2xl font-bold text-gray-900 dark:text-white">{conversations.filter(conv => conv.isActive).length}</p>
                         </div>
                         <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                           <Users className="w-5 h-5 text-green-600" />
                         </div>
                       </div>
                     </CardContent>
                   </Card>

                   <Card>
                     <CardContent className="p-4">
                       <div className="flex items-center justify-between">
                         <div>
                           <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Support Tickets</p>
                           <p className="text-2xl font-bold text-gray-900 dark:text-white">{supportTickets.length}</p>
                         </div>
                         <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                           <FileText className="w-5 h-5 text-purple-600" />
                         </div>
                       </div>
                     </CardContent>
                   </Card>
                 </div>

                 {/* Recent Conversations */}
                 <Card>
                   <CardHeader>
                     <CardTitle>Percakapan Terbaru</CardTitle>
                     <CardDescription>
                       Chat dengan pemilik villa dan tim support
                     </CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="space-y-4">
                       {conversations.length > 0 ? (
                         conversations.map((conversation) => (
                           <div key={conversation.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                             <Avatar className="w-12 h-12">
                               <AvatarImage src={conversation.propertyImage || "https://i.imgur.com/KNZs2rS.jpeg"} alt={conversation.propertyName || conversation.lastMessage.senderName} />
                               <AvatarFallback>
                                 {conversation.propertyName ? conversation.propertyName.split(' ').map(word => word[0]).join('').toUpperCase() : conversation.lastMessage.senderName.split(' ').map(word => word[0]).join('').toUpperCase()}
                               </AvatarFallback>
                             </Avatar>
                             <div className="flex-1 min-w-0">
                               <div className="flex items-center justify-between mb-1">
                                 <h4 className="font-medium text-gray-900 dark:text-white truncate">
                                   {conversation.propertyName || conversation.lastMessage.senderName}
                                 </h4>
                                 <span className="text-xs text-gray-500 dark:text-gray-400">
                                   {new Date(conversation.lastMessage.timestamp).toLocaleDateString('id-ID', { 
                                     day: 'numeric', 
                                     month: 'short',
                                     hour: '2-digit',
                                     minute: '2-digit'
                                   })}
                                 </span>
                               </div>
                               <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                 {conversation.lastMessage.message}
                               </p>
                             </div>
                             <div className="flex flex-col items-end gap-1">
                               {conversation.unreadCount > 0 && (
                                 <Badge variant="destructive" className="text-xs">{conversation.unreadCount}</Badge>
                               )}
                               <div className={`w-2 h-2 rounded-full ${conversation.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                             </div>
                           </div>
                         ))
                       ) : (
                         <div className="text-center py-8">
                           <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                           <p className="text-gray-500 dark:text-gray-400">Belum ada percakapan</p>
                         </div>
                       )}
                     </div>

                     <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                       <Button 
                         className="w-full" 
                         variant="outline"
                         onClick={() => setShowNewChat(true)}
                       >
                         <MessageSquare className="w-4 h-4 mr-2" />
                         Mulai Chat Baru
                       </Button>
                     </div>
                   </CardContent>
                 </Card>

                 {/* Support Tickets */}
                 <Card>
                   <CardHeader>
                     <CardTitle>Support Tickets</CardTitle>
                     <CardDescription>
                       Kelola tiket dukungan dan bantuan
                     </CardDescription>
                   </CardHeader>
                   <CardContent>
                     <div className="space-y-4">
                       {supportTickets.length > 0 ? (
                         supportTickets.map((ticket) => (
                           <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                             <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                 <FileText className="w-5 h-5 text-blue-600" />
                               </div>
                               <div>
                                 <h4 className="font-medium text-gray-900 dark:text-white">
                                   {ticket.subject}
                                 </h4>
                                 <p className="text-sm text-gray-600 dark:text-gray-400">
                                   Ticket #{ticket.id} • Dibuat {new Date(ticket.createdAt).toLocaleDateString('id-ID', { 
                                     day: 'numeric', 
                                     month: 'short',
                                     year: 'numeric'
                                   })}
                                 </p>
                               </div>
                             </div>
                             <div className="flex items-center gap-2">
                               <Badge variant={ticket.status === 'resolved' ? 'outline' : ticket.status === 'open' ? 'destructive' : 'secondary'}>
                                 {ticket.status === 'resolved' ? 'Resolved' : ticket.status === 'open' ? 'Open' : ticket.status === 'in_progress' ? 'In Progress' : 'Closed'}
                               </Badge>
                               <Button size="sm" variant="outline" onClick={() => { setSelectedTicket(ticket); setShowTicketDetail(true); }}>
                                 Lihat Detail
                               </Button>
                             </div>
                           </div>
                         ))
                       ) : (
                         <div className="text-center py-8">
                           <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                           <p className="text-gray-500 dark:text-gray-400">Belum ada support tickets</p>
                         </div>
                       )}
                     </div>

                     <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                       <Button className="w-full" variant="outline" onClick={() => setShowNewTicket(true)}>
                         <Plus className="w-4 h-4 mr-2" />
                         Buat Ticket Baru
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
                                </div>
               </TabsContent>

               {/* Travel Plans Tab */}
               <TabsContent value="travel-plans">
                 <div className="space-y-6">
                   {/* Travel Plans Overview */}
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                     <Card>
                       <CardContent className="p-4">
                         <div className="flex items-center justify-between">
                           <div>
                             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Plans</p>
                             <p className="text-2xl font-bold text-gray-900 dark:text-white">{travelPlans.length}</p>
                           </div>
                           <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                             <MapPin className="w-5 h-5 text-blue-600" />
                           </div>
                         </div>
                       </CardContent>
                     </Card>

                     <Card>
                       <CardContent className="p-4">
                         <div className="flex items-center justify-between">
                           <div>
                             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Planning</p>
                             <p className="text-2xl font-bold text-gray-900 dark:text-white">{travelPlans.filter(plan => plan.status === 'planning').length}</p>
                           </div>
                           <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                             <Calendar className="w-5 h-5 text-yellow-600" />
                           </div>
                         </div>
                       </CardContent>
                     </Card>

                     <Card>
                       <CardContent className="p-4">
                         <div className="flex items-center justify-between">
                           <div>
                             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Booked</p>
                             <p className="text-2xl font-bold text-gray-900 dark:text-white">{travelPlans.filter(plan => plan.status === 'booked').length}</p>
                           </div>
                           <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                             <CheckCircle className="w-5 h-5 text-green-600" />
                           </div>
                         </div>
                       </CardContent>
                     </Card>

                     <Card>
                       <CardContent className="p-4">
                         <div className="flex items-center justify-between">
                           <div>
                             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                             <p className="text-2xl font-bold text-gray-900 dark:text-white">{travelPlans.filter(plan => plan.status === 'completed').length}</p>
                           </div>
                           <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
                             <Award className="w-5 h-5 text-purple-600" />
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   </div>

                   {/* Travel Plans List */}
                   <Card>
                     <CardHeader>
                       <CardTitle>Travel Plans</CardTitle>
                       <CardDescription>
                         Kelola rencana perjalanan Anda
                       </CardDescription>
                     </CardHeader>
                     <CardContent>
                       <div className="space-y-4">
                         {travelPlans.length > 0 ? (
                           travelPlans.map((plan) => (
                             <div key={plan.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                               <div className="flex items-start justify-between mb-3">
                                 <div className="flex-1">
                                   <div className="flex items-center gap-2 mb-1">
                                     <h4 className="font-semibold text-gray-900 dark:text-white">{plan.title}</h4>
                                     <Badge variant={
                                       plan.status === 'planning' ? 'secondary' :
                                       plan.status === 'booked' ? 'default' :
                                       plan.status === 'completed' ? 'outline' : 'destructive'
                                     }>
                                       {plan.status === 'planning' ? 'Planning' :
                                        plan.status === 'booked' ? 'Booked' :
                                        plan.status === 'completed' ? 'Completed' : 'Cancelled'}
                                     </Badge>
                                   </div>
                                   <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{plan.description}</p>
                                   <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                     <span className="flex items-center gap-1">
                                       <MapPin className="w-3 h-3" />
                                       {plan.destination}
                                     </span>
                                     <span className="flex items-center gap-1">
                                       <Calendar className="w-3 h-3" />
                                       {new Date(plan.startDate).toLocaleDateString('id-ID')} - {new Date(plan.endDate).toLocaleDateString('id-ID')}
                                     </span>
                                     <span className="flex items-center gap-1">
                                       <Users className="w-3 h-3" />
                                       {plan.travelers.adults + plan.travelers.children} travelers
                                     </span>
                                   </div>
                                 </div>
                                 <div className="text-right">
                                   <p className="text-sm font-medium text-gray-900 dark:text-white">
                                     {plan.budget.currency === 'IDR' ? 'Rp' : '$'}{plan.budget.min.toLocaleString()} - {plan.budget.currency === 'IDR' ? 'Rp' : '$'}{plan.budget.max.toLocaleString()}
                                   </p>
                                   <p className="text-xs text-gray-500 dark:text-gray-400">{plan.totalDays} days</p>
                                 </div>
                               </div>
                               
                               {/* Plan Summary */}
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                 <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                                   <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Accommodations</p>
                                   <p className="text-gray-600 dark:text-gray-400">{plan.accommodations.length} booked</p>
                                 </div>
                                 <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                                   <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Activities</p>
                                   <p className="text-gray-600 dark:text-gray-400">{plan.activities.length} planned</p>
                                 </div>
                                 <div className="bg-gray-50 dark:bg-gray-800 rounded p-2">
                                   <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">Transportation</p>
                                   <p className="text-gray-600 dark:text-gray-400">{plan.transportation.length} arranged</p>
                                 </div>
                               </div>
                               
                               <div className="flex gap-2 mt-4">
                                 <Button 
                                   size="sm" 
                                   variant="outline"
                                   onClick={() => handleViewTravelPlan(plan)}
                                 >
                                   <Eye className="w-4 h-4 mr-2" />
                                   View Details
                                 </Button>
                                 <Button 
                                   size="sm" 
                                   variant="outline"
                                   onClick={() => handleEditTravelPlan(plan)}
                                 >
                                   <Edit className="w-4 h-4 mr-2" />
                                   Edit Plan
                                 </Button>
                                 <Button size="sm" variant="outline">
                                   <Share2 className="w-4 h-4 mr-2" />
                                   Share
                                 </Button>
                               </div>
                             </div>
                           ))
                         ) : (
                           <div className="text-center py-8">
                             <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                             <p className="text-gray-500 dark:text-gray-400 mb-4">Belum ada travel plans</p>
                             <Button onClick={() => setShowCreateTravelPlan(true)}>
                               <Plus className="w-4 h-4 mr-2" />
                               Buat Travel Plan Baru
                             </Button>
                           </div>
                         )}
                       </div>
                     </CardContent>
                   </Card>
                 </div>
               </TabsContent>
            </Tabs>
        </div>
      </div>

      <DashboardTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        steps={tourSteps}
        onTabChange={setActiveTab}
      />

      {/* Create Travel Plan Modal */}
      {showCreateTravelPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Buat Travel Plan Baru</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCreateTravelPlan(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informasi Dasar</h3>
                  
                  <div>
                    <Label htmlFor="plan-title">Judul Travel Plan *</Label>
                    <Input
                      id="plan-title"
                      value={newTravelPlan.title}
                      onChange={(e) => setNewTravelPlan({ ...newTravelPlan, title: e.target.value })}
                      placeholder="Contoh: Liburan Pantai Sawarna"
                    />
                  </div>

                  <div>
                    <Label htmlFor="plan-description">Deskripsi</Label>
                    <Textarea
                      id="plan-description"
                      value={newTravelPlan.description}
                      onChange={(e) => setNewTravelPlan({ ...newTravelPlan, description: e.target.value })}
                      placeholder="Jelaskan rencana perjalanan Anda..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="plan-destination">Destinasi *</Label>
                    <Input
                      id="plan-destination"
                      value={newTravelPlan.destination}
                      onChange={(e) => setNewTravelPlan({ ...newTravelPlan, destination: e.target.value })}
                      placeholder="Contoh: Sawarna, Banten"
                    />
                  </div>
                </div>

                {/* Travel Dates */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tanggal Perjalanan</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="start-date">Tanggal Mulai *</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={newTravelPlan.startDate}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-date">Tanggal Selesai *</Label>
                      <Input
                        id="end-date"
                        type="date"
                        value={newTravelPlan.endDate}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Budget</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="budget-min">Budget Minimum</Label>
                      <Input
                        id="budget-min"
                        type="number"
                        value={newTravelPlan.budgetMin}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, budgetMin: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget-max">Budget Maksimum</Label>
                      <Input
                        id="budget-max"
                        type="number"
                        value={newTravelPlan.budgetMax}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, budgetMax: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="currency">Mata Uang</Label>
                      <select
                        id="currency"
                        value={newTravelPlan.currency}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, currency: e.target.value as 'IDR' | 'USD' })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="IDR">IDR (Rupiah)</option>
                        <option value="USD">USD (Dollar)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Travelers */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Jumlah Traveler</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="adults">Dewasa</Label>
                      <Input
                        id="adults"
                        type="number"
                        min="1"
                        value={newTravelPlan.adults}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, adults: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="children">Anak-anak</Label>
                      <Input
                        id="children"
                        type="number"
                        min="0"
                        value={newTravelPlan.children}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, children: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="infants">Bayi</Label>
                      <Input
                        id="infants"
                        type="number"
                        min="0"
                        value={newTravelPlan.infants}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, infants: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button onClick={handleCreateTravelPlan} className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Travel Plan
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateTravelPlan(false)}
                  className="flex-1"
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Travel Plan Modal */}
      {showViewTravelPlan && selectedTravelPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detail Travel Plan</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowViewTravelPlan(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Dasar</h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Judul</Label>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{selectedTravelPlan.title}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Deskripsi</Label>
                        <p className="text-gray-700 dark:text-gray-300">{selectedTravelPlan.description}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Destinasi</Label>
                        <p className="text-gray-700 dark:text-gray-300">{selectedTravelPlan.destination}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</Label>
                        <Badge variant={
                          selectedTravelPlan.status === 'planning' ? 'secondary' :
                          selectedTravelPlan.status === 'booked' ? 'default' :
                          selectedTravelPlan.status === 'completed' ? 'outline' : 'destructive'
                        }>
                          {selectedTravelPlan.status === 'planning' ? 'Planning' :
                           selectedTravelPlan.status === 'booked' ? 'Booked' :
                           selectedTravelPlan.status === 'completed' ? 'Completed' : 'Cancelled'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detail Perjalanan</h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Tanggal</Label>
                        <p className="text-gray-700 dark:text-gray-300">
                          {new Date(selectedTravelPlan.startDate).toLocaleDateString('id-ID')} - {new Date(selectedTravelPlan.endDate).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Durasi</Label>
                        <p className="text-gray-700 dark:text-gray-300">{selectedTravelPlan.totalDays} hari</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Traveler</Label>
                        <p className="text-gray-700 dark:text-gray-300">
                          {selectedTravelPlan.travelers.adults} dewasa, {selectedTravelPlan.travelers.children} anak-anak, {selectedTravelPlan.travelers.infants} bayi
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Budget</Label>
                        <p className="text-gray-700 dark:text-gray-300">
                          {selectedTravelPlan.budget.currency === 'IDR' ? 'Rp' : '$'}{selectedTravelPlan.budget.min.toLocaleString()} - {selectedTravelPlan.budget.currency === 'IDR' ? 'Rp' : '$'}{selectedTravelPlan.budget.max.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ringkasan Plan</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Accommodations</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{selectedTravelPlan.accommodations.length}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">booked</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Activities</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{selectedTravelPlan.activities.length}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">planned</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Car className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-gray-900 dark:text-white">Transportation</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-600">{selectedTravelPlan.transportation.length}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">arranged</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button 
                    onClick={() => {
                      setShowViewTravelPlan(false);
                      handleEditTravelPlan(selectedTravelPlan);
                    }}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Plan
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Plan
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowViewTravelPlan(false)}
                    className="flex-1"
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Travel Plan Modal */}
      {showEditTravelPlan && selectedTravelPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Travel Plan</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEditTravelPlan(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informasi Dasar</h3>
                  
                  <div>
                    <Label htmlFor="edit-plan-title">Judul Travel Plan *</Label>
                    <Input
                      id="edit-plan-title"
                      value={newTravelPlan.title}
                      onChange={(e) => setNewTravelPlan({ ...newTravelPlan, title: e.target.value })}
                      placeholder="Contoh: Liburan Pantai Sawarna"
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-plan-description">Deskripsi</Label>
                    <Textarea
                      id="edit-plan-description"
                      value={newTravelPlan.description}
                      onChange={(e) => setNewTravelPlan({ ...newTravelPlan, description: e.target.value })}
                      placeholder="Jelaskan rencana perjalanan Anda..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="edit-plan-destination">Destinasi *</Label>
                    <Input
                      id="edit-plan-destination"
                      value={newTravelPlan.destination}
                      onChange={(e) => setNewTravelPlan({ ...newTravelPlan, destination: e.target.value })}
                      placeholder="Contoh: Sawarna, Banten"
                    />
                  </div>
                </div>

                {/* Travel Dates */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tanggal Perjalanan</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="edit-start-date">Tanggal Mulai *</Label>
                      <Input
                        id="edit-start-date"
                        type="date"
                        value={newTravelPlan.startDate}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-end-date">Tanggal Selesai *</Label>
                      <Input
                        id="edit-end-date"
                        type="date"
                        value={newTravelPlan.endDate}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, endDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Budget</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="edit-budget-min">Budget Minimum</Label>
                      <Input
                        id="edit-budget-min"
                        type="number"
                        value={newTravelPlan.budgetMin}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, budgetMin: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-budget-max">Budget Maksimum</Label>
                      <Input
                        id="edit-budget-max"
                        type="number"
                        value={newTravelPlan.budgetMax}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, budgetMax: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-currency">Mata Uang</Label>
                      <select
                        id="edit-currency"
                        value={newTravelPlan.currency}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, currency: e.target.value as 'IDR' | 'USD' })}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="IDR">IDR (Rupiah)</option>
                        <option value="USD">USD (Dollar)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Travelers */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Jumlah Traveler</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="edit-adults">Dewasa</Label>
                      <Input
                        id="edit-adults"
                        type="number"
                        min="1"
                        value={newTravelPlan.adults}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, adults: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-children">Anak-anak</Label>
                      <Input
                        id="edit-children"
                        type="number"
                        min="0"
                        value={newTravelPlan.children}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, children: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-infants">Bayi</Label>
                      <Input
                        id="edit-infants"
                        type="number"
                        min="0"
                        value={newTravelPlan.infants}
                        onChange={(e) => setNewTravelPlan({ ...newTravelPlan, infants: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button onClick={handleUpdateTravelPlan} className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Travel Plan
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditTravelPlan(false)}
                  className="flex-1"
                >
                  Batal
                </Button>
                             </div>
             </div>
           </div>
         </div>
       )}

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mulai Chat Baru</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewChat(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Recipient Type */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pilih Penerima</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={newChatData.recipientType === 'villa' ? 'default' : 'outline'}
                      onClick={() => setNewChatData({ ...newChatData, recipientType: 'villa' })}
                      className="h-auto p-4 flex-col gap-2"
                    >
                      <Building2 className="w-6 h-6" />
                      <span>Villa</span>
                      <span className="text-xs text-gray-500">Chat dengan pemilik villa</span>
                    </Button>
                    
                    <Button
                      variant={newChatData.recipientType === 'support' ? 'default' : 'outline'}
                      onClick={() => setNewChatData({ ...newChatData, recipientType: 'support' })}
                      className="h-auto p-4 flex-col gap-2"
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span>Support</span>
                      <span className="text-xs text-gray-500">Chat dengan tim support</span>
                    </Button>
                  </div>
                </div>

                {/* Villa Selection (if recipient type is villa) */}
                {newChatData.recipientType === 'villa' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pilih Villa</h3>
                    
                    <div>
                      <Label htmlFor="villa-select">Villa yang Dihubungi *</Label>
                      <select
                        id="villa-select"
                        value={newChatData.selectedVilla}
                        onChange={(e) => setNewChatData({ ...newChatData, selectedVilla: e.target.value })}
                        className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                      >
                        <option value="">Pilih villa...</option>
                        <option value="Villa Sawarna Resort">Villa Sawarna Resort</option>
                        <option value="Villa Sinar Matahari">Villa Sinar Matahari</option>
                        <option value="Villa Sinar Pelangi">Villa Sinar Pelangi</option>
                        <option value="Villa Cempaka">Villa Cempaka</option>
                        <option value="Villa Mutiara Sawarna">Villa Mutiara Sawarna</option>
                        <option value="Villa Batara">Villa Batara</option>
                        <option value="Villa Regin Sawarna">Villa Regin Sawarna</option>
                        <option value="Villa Widi">Villa Widi</option>
                        <option value="Villa Srikandi">Villa Srikandi</option>
                        <option value="Villa Putri Asih">Villa Putri Asih</option>
                        <option value="Villa Pondok Ciantir">Villa Pondok Ciantir</option>
                        <option value="Villa Mega Aura">Villa Mega Aura</option>
                        <option value="Villa Muara Legon Pari">Villa Muara Legon Pari</option>
                        <option value="Villa Little Hula Hula">Villa Little Hula Hula</option>
                        <option value="Villa Deka Sawarna">Villa Deka Sawarna</option>
                        <option value="Villa Family Sawarna">Villa Family Sawarna</option>
                        <option value="Villa Andrew">Villa Andrew</option>
                        <option value="Villa Andrew Pasput">Villa Andrew Pasput</option>
                        <option value="Villa Arizky Sawarna">Villa Arizky Sawarna</option>
                        <option value="Villa Aki Nini">Villa Aki Nini</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Subject */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Informasi Chat</h3>
                  
                  <div>
                    <Label htmlFor="chat-subject">Subject *</Label>
                    <Input
                      id="chat-subject"
                      value={newChatData.subject}
                      onChange={(e) => setNewChatData({ ...newChatData, subject: e.target.value })}
                      placeholder="Contoh: Tanya tentang booking, Info villa, dll"
                    />
                  </div>

                  <div>
                    <Label htmlFor="chat-message">Pesan *</Label>
                    <Textarea
                      id="chat-message"
                      value={newChatData.message}
                      onChange={(e) => setNewChatData({ ...newChatData, message: e.target.value })}
                      placeholder="Tulis pesan Anda di sini..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="chat-priority">Prioritas</Label>
                    <select
                      id="chat-priority"
                      value={newChatData.priority}
                      onChange={(e) => setNewChatData({ ...newChatData, priority: e.target.value as 'low' | 'normal' | 'high' })}
                      className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    >
                      <option value="low">Rendah</option>
                      <option value="normal">Normal</option>
                      <option value="high">Tinggi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button onClick={handleStartNewChat} className="flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Mulai Chat
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewChat(false)}
                  className="flex-1"
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Support Ticket Modal */}
      {showNewTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Buat Ticket Support</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowNewTicket(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-5">
                <div>
                  <Label htmlFor="ticket-subject">Subject *</Label>
                  <Input id="ticket-subject" value={newTicketData.subject} onChange={(e) => setNewTicketData({ ...newTicketData, subject: e.target.value })} placeholder="Contoh: Kendala pembayaran / Pertanyaan booking" />
                </div>

                <div>
                  <Label htmlFor="ticket-category">Kategori</Label>
                  <select id="ticket-category" value={newTicketData.category} onChange={(e) => setNewTicketData({ ...newTicketData, category: e.target.value as any })} className="w-full p-2 border rounded-md">
                    <option value="general">Umum</option>
                    <option value="booking">Booking</option>
                    <option value="payment">Pembayaran</option>
                    <option value="technical">Teknis</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="ticket-priority">Prioritas</Label>
                  <select id="ticket-priority" value={newTicketData.priority} onChange={(e) => setNewTicketData({ ...newTicketData, priority: e.target.value as any })} className="w-full p-2 border rounded-md">
                    <option value="low">Rendah</option>
                    <option value="medium">Sedang</option>
                    <option value="high">Tinggi</option>
                    <option value="urgent">Mendesak</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="ticket-desc">Deskripsi *</Label>
                  <Textarea id="ticket-desc" rows={5} value={newTicketData.description} onChange={(e) => setNewTicketData({ ...newTicketData, description: e.target.value })} placeholder="Jelaskan masalah atau pertanyaan Anda dengan detail" />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={() => {
                  if (!newTicketData.subject || !newTicketData.description) return;
                  addSupportTicket({
                    category: newTicketData.category,
                    priority: newTicketData.priority,
                    status: newTicketData.status,
                    subject: newTicketData.subject,
                    description: newTicketData.description
                  });
                  setNewTicketData({ category: 'general', priority: 'medium', status: 'open', subject: '', description: '' });
                  setShowNewTicket(false);
                  toast({ title: 'Ticket dibuat', description: 'Tim kami akan segera merespons ticket Anda.' });
                }} className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Ticket
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowNewTicket(false)}>Batal</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Support Ticket Detail Modal */}
      {showTicketDetail && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Detail Ticket #{selectedTicket.id}</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowTicketDetail(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Kategori</Label>
                    <p className="text-gray-700 dark:text-gray-300 capitalize">{selectedTicket.category}</p>
                  </div>
                  <div>
                    <Label>Prioritas</Label>
                    <p className="text-gray-700 dark:text-gray-300 capitalize">{selectedTicket.priority}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <p className="text-gray-700 dark:text-gray-300 capitalize">{selectedTicket.status}</p>
                  </div>
                </div>

                <div>
                  <Label>Subject</Label>
                  <p className="text-gray-900 dark:text-white font-medium">{selectedTicket.subject}</p>
                </div>
                <div>
                  <Label>Deskripsi</Label>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{selectedTicket.description}</p>
                </div>

                <div className="mt-4">
                  <Label>Pesan</Label>
                  <div className="space-y-2 mt-2">
                    {selectedTicket.messages?.length ? selectedTicket.messages.map((m: any) => (
                      <div key={m.id} className="p-3 rounded-md border text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{m.senderName || 'Anda'}</span>
                          <span className="text-gray-500 text-xs">{new Date(m.timestamp).toLocaleString('id-ID')}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{m.content}</p>
                      </div>
                    )) : (
                      <p className="text-sm text-gray-500">Belum ada pesan.</p>
                    )}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <Input placeholder="Tulis pesan..." onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const target = e.target as HTMLInputElement;
                        if (!target.value) return;
                        addTicketMessage(selectedTicket.id, { senderId: user?.id || 'me', senderName: user?.name || 'Anda', content: target.value });
                        target.value = '';
                      }
                    }} />
                    <Button onClick={() => setShowTicketDetail(false)} variant="outline">Tutup</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Program Referral</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowReferralModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <h3 className="font-medium text-amber-800 dark:text-amber-200 mb-2">Bagaimana Cara Kerjanya?</h3>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                    <li>• Kirim email referral ke teman</li>
                    <li>• Teman booking dengan kode referral Anda</li>
                    <li>• Dapatkan 500 points + 5% cashback</li>
                    <li>• Teman dapat diskon 10% booking pertama</li>
                  </ul>
                </div>

                <div>
                  <Label htmlFor="referral-email">Email Teman</Label>
                  <Input 
                    id="referral-email"
                    type="email"
                    value={referralEmail}
                    onChange={(e) => setReferralEmail(e.target.value)}
                    placeholder="teman@email.com"
                    className="mt-1"
                  />
                </div>

                <Button onClick={handleReferralSubmit} className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Kirim Referral
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rewards History Modal */}
      {showRewardsHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Riwayat Rewards</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowRewardsHistory(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {/* Points Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ringkasan Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-amber-600">{loyaltyData.pointsEarned.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Points dari Booking</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-green-600">{loyaltyData.reviewBonus.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Points dari Review</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{loyaltyData.totalPoints.toLocaleString()}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Points</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tier Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Progress Tier</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Tier Saat Ini</span>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                          {loyaltyData.tier}
                        </Badge>
                      </div>
                      
                      {loyaltyData.nextTierPoints && (
                        <>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress ke {loyaltyData.tier === 'Bronze' ? 'Silver' : loyaltyData.tier === 'Silver' ? 'Gold' : 'Platinum'}</span>
                              <span>{loyaltyData.progressToNextTier.toFixed(0)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                              <div 
                                className="bg-amber-500 h-3 rounded-full transition-all duration-300"
                                style={{ width: `${loyaltyData.progressToNextTier}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {loyaltyData.nextTierPoints - loyaltyData.totalPoints} points lagi untuk naik tier
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Available Rewards */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Rewards Tersedia</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {loyaltyData.tierBenefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Points Redemption Modal */}
      {showRedemptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tukar Points</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowRedemptionModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">
                      Points Anda: {loyaltyData.totalPoints.toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Pilih reward yang ingin ditukar dengan points
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRewards.map((reward) => (
                  <Card key={reward.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{reward.name}</CardTitle>
                        <Badge 
                          variant={loyaltyData.totalPoints >= reward.pointsCost ? "default" : "secondary"}
                          className={loyaltyData.totalPoints >= reward.pointsCost ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                        >
                          {reward.pointsCost} points
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {reward.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Berlaku hingga: {new Date(reward.validUntil).toLocaleDateString('id-ID')}
                        </span>
                        <Button 
                          size="sm"
                          onClick={() => handleRewardRedemption(reward)}
                          disabled={loyaltyData.totalPoints < reward.pointsCost}
                          className={loyaltyData.totalPoints >= reward.pointsCost ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {loyaltyData.totalPoints >= reward.pointsCost ? "Tukar" : "Points Kurang"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Promotions Modal */}
      {showPromotionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Promo & Penawaran Spesial</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowPromotionsModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {seasonalPromotions.length > 0 ? (
                  seasonalPromotions.map((promo) => (
                    <Card key={promo.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                              {promo.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                              {promo.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Berlaku hingga: {new Date(promo.validUntil).toLocaleDateString('id-ID')}</span>
                              {promo.discount > 0 && (
                                <Badge variant="default" className="bg-purple-100 text-purple-800">
                                  {promo.discount}% OFF
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Lihat Detail
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Belum Ada Promo Aktif
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Pantau terus untuk promo dan penawaran spesial berikutnya!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Action Button */}
      {isMobile && (
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <ArrowUp className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-900 dark:text-white">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

// Edit Profile Form Component
const EditProfileForm: React.FC<{ user: AuthUser | null; onBack: () => void }> = ({ user, onBack }) => {
  const { toast } = useToast();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    bio: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(user?.profileImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validasi ukuran file (maksimal 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File Terlalu Besar",
        description: "Ukuran file maksimal 2MB.",
        variant: "destructive"
      });
      return;
    }

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Tipe File Tidak Didukung",
        description: "Hanya file gambar yang diperbolehkan.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileImage(result);
      setIsUploading(false);
      toast({
        title: "Foto Berhasil Diupload",
        description: "Foto profil Anda telah diperbarui.",
      });
    };
    reader.readAsDataURL(file);
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data with new profile image
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        profileImage: profileImage || user?.profileImage
      };
      
      // Update context
      setUser(updatedUser);
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profil Berhasil Diperbarui",
        description: "Informasi profil Anda telah disimpan.",
      });
      
      // Go back to profile tab
      onBack();
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menyimpan profil. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Edit Profil</h2>
          <p className="text-gray-600 dark:text-gray-400">Perbarui informasi profil Anda</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Pribadi</CardTitle>
          <CardDescription>
            Perbarui informasi dasar profil Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
                         {/* Profile Picture */}
             <div className="flex items-center gap-4">
               <Avatar className="w-20 h-20">
                 <AvatarImage src={profileImage || user?.profileImage} alt={user?.name} />
                 <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
               </Avatar>
               <div>
                 <Button 
                   variant="outline" 
                   type="button"
                   onClick={handleChangePhoto}
                   disabled={isUploading}
                 >
                   {isUploading ? (
                     <>
                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                       Uploading...
                     </>
                   ) : (
                     <>
                       <Camera className="w-4 h-4 mr-2" />
                       Ganti Foto
                     </>
                   )}
                 </Button>
                 <p className="text-sm text-gray-500 mt-1">JPG, PNG atau GIF. Maksimal 2MB.</p>
                 
                 {/* Hidden file input */}
                 <input
                   ref={fileInputRef}
                   type="file"
                   accept="image/*"
                   onChange={handleFileChange}
                   className="hidden"
                 />
               </div>
             </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Masukkan email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+62 812-3456-7890"
                />
              </div>
              <div>
                <Label htmlFor="city">Kota</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Jakarta"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Alamat</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Masukkan alamat lengkap"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Ceritakan sedikit tentang diri Anda"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  'Simpan Perubahan'
                )}
              </Button>
              <Button type="button" variant="outline" onClick={onBack}>
                Batal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Account Settings Form Component
const AccountSettingsForm: React.FC<{ user: AuthUser | null; onBack: () => void }> = ({ user, onBack }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    language: 'id',
    timezone: 'Asia/Jakarta',
    currency: 'IDR',
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true
  });

  const handleSave = async () => {
    toast({
      title: "Pengaturan Disimpan",
      description: "Pengaturan akun Anda telah diperbarui.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Pengaturan Akun</h2>
          <p className="text-gray-600 dark:text-gray-400">Kelola preferensi akun Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Preferensi Umum</CardTitle>
            <CardDescription>
              Pengaturan bahasa, zona waktu, dan mata uang
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Bahasa</Label>
              <select
                id="language"
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
            <div>
              <Label htmlFor="timezone">Zona Waktu</Label>
              <select
                id="timezone"
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="Asia/Jakarta">WIB (UTC+7)</option>
                <option value="Asia/Makassar">WITA (UTC+8)</option>
                <option value="Asia/Jayapura">WIT (UTC+9)</option>
              </select>
            </div>
            <div>
              <Label htmlFor="currency">Mata Uang</Label>
              <select
                id="currency"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="IDR">Rupiah (IDR)</option>
                <option value="USD">US Dollar (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifikasi</CardTitle>
            <CardDescription>
              Kelola preferensi notifikasi Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifikasi</Label>
                <p className="text-sm text-gray-500">Terima notifikasi via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifikasi</Label>
                <p className="text-sm text-gray-500">Terima notifikasi via SMS</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Marketing</Label>
                <p className="text-sm text-gray-500">Terima promo dan penawaran khusus</p>
              </div>
              <Switch
                checked={settings.marketingEmails}
                onCheckedChange={(checked) => setSettings({ ...settings, marketingEmails: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleSave}>
          Simpan Pengaturan
        </Button>
        <Button variant="outline" onClick={onBack}>
          Batal
        </Button>
      </div>
    </div>
  );
};

// Security & Privacy Form Component
const SecurityPrivacyForm: React.FC<{ user: AuthUser | null; onBack: () => void }> = ({ user, onBack }) => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true
  });

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Password baru tidak cocok dengan konfirmasi password.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password Diperbarui",
      description: "Password Anda telah berhasil diubah.",
    });
    
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Keamanan & Privasi</h2>
          <p className="text-gray-600 dark:text-gray-400">Kelola keamanan dan privasi akun Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ubah Password</CardTitle>
            <CardDescription>
              Perbarui password akun Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="current-password">Password Saat Ini</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Masukkan password saat ini"
              />
            </div>
            <div>
              <Label htmlFor="new-password">Password Baru</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan password baru"
              />
            </div>
            <div>
              <Label htmlFor="confirm-password">Konfirmasi Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirmasi password baru"
              />
            </div>
            <Button onClick={handleChangePassword} className="w-full">
              Ubah Password
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Privasi</CardTitle>
            <CardDescription>
              Kelola siapa yang dapat melihat profil Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="profile-visibility">Visibilitas Profil</Label>
              <select
                id="profile-visibility"
                value={privacySettings.profileVisibility}
                onChange={(e) => setPrivacySettings({ ...privacySettings, profileVisibility: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="public">Publik</option>
                <option value="friends">Teman Saja</option>
                <option value="private">Privat</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Tampilkan Email</Label>
                <p className="text-sm text-gray-500">Izinkan orang lain melihat email Anda</p>
              </div>
              <Switch
                checked={privacySettings.showEmail}
                onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showEmail: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Tampilkan Nomor Telepon</Label>
                <p className="text-sm text-gray-500">Izinkan orang lain melihat nomor telepon Anda</p>
              </div>
              <Switch
                checked={privacySettings.showPhone}
                onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, showPhone: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Terima Pesan</Label>
                <p className="text-sm text-gray-500">Izinkan pengguna lain mengirim pesan</p>
              </div>
              <Switch
                checked={privacySettings.allowMessages}
                onCheckedChange={(checked) => setPrivacySettings({ ...privacySettings, allowMessages: checked })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => toast({ title: "Pengaturan Disimpan", description: "Pengaturan privasi telah diperbarui." })}>
          Simpan Pengaturan
        </Button>
        <Button variant="outline" onClick={onBack}>
          Batal
        </Button>
      </div>
    </div>
  );
};

export default UserDashboardPage;
