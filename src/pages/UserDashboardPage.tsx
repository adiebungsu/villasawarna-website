import React, { useState } from 'react';
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
  LogOut
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import WishlistSystem from '@/components/WishlistSystem';
import NotificationSystem from '@/components/NotificationSystem';
import EnhancedSearchFilter from '@/components/EnhancedSearchFilter';

interface DashboardStats {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  totalReviews: number;
  averageRating: number;
  wishlistItems: number;
  savedSearches: number;
  unreadNotifications: number;
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
  
  const [activeTab, setActiveTab] = useState('overview');

  // Sample dashboard statistics
  const [stats] = useState<DashboardStats>({
    totalBookings: 12,
    completedBookings: 8,
    pendingBookings: 2,
    totalReviews: 6,
    averageRating: 4.7,
    wishlistItems: 15,
    savedSearches: 4,
    unreadNotifications: 3
  });

  // Sample recent activities
  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Dikonfirmasi',
      description: 'Villa Sinar Pelangi untuk 20-22 Maret 2024',
      timestamp: '2 jam yang lalu',
      icon: <Calendar className="w-4 h-4 text-blue-500" />,
      status: 'success'
    },
    {
      id: '2',
      type: 'review',
      title: 'Review Dikirim',
      description: 'Memberikan review 5 bintang untuk Villa Arizky',
      timestamp: '1 hari yang lalu',
      icon: <Star className="w-4 h-4 text-yellow-500" />,
      status: 'success'
    },
    {
      id: '3',
      type: 'payment',
      title: 'Pembayaran Berhasil',
      description: 'Pembayaran Rp 2.500.000 untuk Villa Cempaka',
      timestamp: '2 hari yang lalu',
      icon: <CreditCard className="w-4 h-4 text-green-500" />,
      status: 'success'
    },
    {
      id: '4',
      type: 'wishlist',
      title: 'Wishlist Diperbarui',
      description: 'Menambahkan Villa Mega Aura ke wishlist',
      timestamp: '3 hari yang lalu',
      icon: <Heart className="w-4 h-4 text-red-500" />,
      status: 'success'
    },
    {
      id: '5',
      type: 'support',
      title: 'Tiket Support Dibuat',
      description: 'Pertanyaan tentang fasilitas villa',
      timestamp: '4 hari yang lalu',
      icon: <MessageSquare className="w-4 h-4 text-purple-500" />,
      status: 'pending'
    }
  ]);

  // Sample bookings
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      propertyName: 'Villa Sinar Pelangi',
      propertyImage: '/images/villas/villa-sinar-pelangi-1.jpg',
      checkIn: '2024-03-20',
      checkOut: '2024-03-22',
      guests: 8,
      totalPrice: 2500000,
      status: 'confirmed',
      bookingDate: '2024-03-15'
    },
    {
      id: '2',
      propertyName: 'Villa Arizky Sawarna',
      propertyImage: '/images/villas/villa-arizky-1.jpg',
      checkIn: '2024-02-15',
      checkOut: '2024-02-17',
      guests: 6,
      totalPrice: 1800000,
      status: 'completed',
      bookingDate: '2024-02-10'
    },
    {
      id: '3',
      propertyName: 'Villa Cempaka',
      propertyImage: '/images/villas/villa-cempaka-1.jpg',
      checkIn: '2024-04-10',
      checkOut: '2024-04-12',
      guests: 10,
      totalPrice: 3200000,
      status: 'pending',
      bookingDate: '2024-03-18'
    }
  ]);

  // Sample reviews
  const [reviews] = useState<Review[]>([
    {
      id: '1',
      propertyName: 'Villa Arizky Sawarna',
      propertyImage: '/images/villas/villa-arizky-1.jpg',
      rating: 5,
      comment: 'Villa yang sangat nyaman dan bersih. Staff ramah dan lokasi strategis dekat pantai.',
      reviewDate: '2024-02-18',
      helpful: 12
    },
    {
      id: '2',
      propertyName: 'Villa Sinar Pelangi',
      propertyImage: '/images/villas/villa-sinar-pelangi-1.jpg',
      rating: 4,
      comment: 'Fasilitas lengkap dan view yang indah. Hanya sedikit masalah dengan AC di kamar utama.',
      reviewDate: '2024-01-25',
      helpful: 8
    }
  ]);

  // Sample notifications
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Booking Dikonfirmasi',
      message: 'Booking Anda untuk Villa Sinar Pelangi telah dikonfirmasi',
      type: 'success',
      timestamp: '2 jam yang lalu',
      isRead: false,
      action: 'Lihat Detail'
    },
    {
      id: '2',
      title: 'Promo Spesial',
      message: 'Dapatkan diskon 20% untuk booking minimal 3 hari',
      type: 'info',
      timestamp: '1 hari yang lalu',
      isRead: true,
      action: 'Lihat Promo'
    },
    {
      id: '3',
      title: 'Review Anda Membantu',
      message: 'Review Anda untuk Villa Arizky telah membantu 5 traveler lain',
      type: 'success',
      timestamp: '2 hari yang lalu',
      isRead: true
    }
  ]);

  // Sample visit history
  const [visitHistory] = useState<VisitHistory[]>([
    {
      id: '1',
      villaName: 'Villa Sinar Pelangi',
      villaImage: '/images/villas/villa-sinar-pelangi-1.jpg',
      villaUrl: '/villas/villa-sinar-pelangi',
      visitDate: '2024-03-20',
      visitDuration: '5 menit',
      lastViewed: '2 jam yang lalu',
      viewCount: 3,
      isBookmarked: true
    },
    {
      id: '2',
      villaName: 'Villa Arizky Sawarna',
      villaImage: '/images/villas/villa-arizky-1.jpg',
      villaUrl: '/villas/villa-arizky-sawarna',
      visitDate: '2024-03-19',
      visitDuration: '8 menit',
      lastViewed: '1 hari yang lalu',
      viewCount: 5,
      isBookmarked: false
    },
    {
      id: '3',
      villaName: 'Villa Cempaka',
      villaImage: '/images/villas/villa-cempaka-1.jpg',
      villaUrl: '/villas/villa-cempaka',
      visitDate: '2024-03-18',
      visitDuration: '3 menit',
      lastViewed: '2 hari yang lalu',
      viewCount: 2,
      isBookmarked: true
    },
    {
      id: '4',
      villaName: 'Villa Mega Aura',
      villaImage: '/images/villas/villa-mega-aura-1.jpg',
      villaUrl: '/villas/villa-mega-aura',
      visitDate: '2024-03-17',
      visitDuration: '12 menit',
      lastViewed: '3 hari yang lalu',
      viewCount: 1,
      isBookmarked: false
    },
    {
      id: '5',
      villaName: 'Villa Sunset Beach',
      villaImage: '/images/villas/villa-sunset-beach-1.jpg',
      villaUrl: '/villas/villa-sunset-beach',
      visitDate: '2024-03-16',
      visitDuration: '6 menit',
      lastViewed: '4 hari yang lalu',
      viewCount: 4,
      isBookmarked: true
    }
  ]);

  const handleSearch = (filters: any) => {
    // Handle search functionality
    console.log('Search filters:', filters);
    toast({
      title: "Pencarian Dimulai",
      description: "Mencari properti sesuai kriteria Anda",
    });
  };

  const handleFiltersChange = (filters: any) => {
    // Handle filter changes
    console.log('Filters changed:', filters);
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
                     <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
                       Dashboard Pengguna
                     </h1>
                     <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 truncate">
                       Selamat datang kembali, {user.name || 'User'}! 👋
                     </p>
                   </div>
                 </div>
                 <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-500 dark:text-gray-400">
                   <span>Member sejak Maret 2024</span>
                   <span className="hidden md:inline">•</span>
                   <span>Level: Gold Member</span>
                   <span className="hidden md:inline">•</span>
                   <span>Poin: 1,250</span>
                 </div>
               </div>
               
               <div className="flex items-center gap-3 md:gap-4">
                 <div className="text-right">
                   <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">Terakhir login</p>
                   <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-white">Hari ini, 14:30</p>
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
                     toast({
                       title: "Logout Berhasil",
                       description: "Anda telah berhasil logout.",
                     });
                   }}
                   className="md:hidden text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                 >
                   <LogOut className="w-4 h-4 mr-1" />
                   Logout
                 </Button>
               </div>
             </div>
           </div>

                     {/* Quick Stats */}
           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
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
          </div>

          {/* Main Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Mobile Tab Navigation - Horizontal Scroll */}
              <div className="md:hidden w-full overflow-x-auto">
                <TabsList className="flex w-max bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger value="overview" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3">
                    <TrendingUp className="w-3 h-3" />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="profile" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3">
                    <User className="w-3 h-3" />
                    <span>Profil</span>
                  </TabsTrigger>
                  <TabsTrigger value="bookings" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3">
                    <Calendar className="w-3 h-3" />
                    <span>Booking</span>
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3">
                    <Heart className="w-3 h-3" />
                    <span>Wishlist</span>
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3">
                    <Bell className="w-3 h-3" />
                    <span>Notif</span>
                  </TabsTrigger>
                  <TabsTrigger value="visits" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3">
                    <Eye className="w-3 h-3" />
                    <span>Riwayat</span>
                  </TabsTrigger>
                  <TabsTrigger value="search" className="flex items-center gap-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-xs whitespace-nowrap px-3">
                    <Search className="w-3 h-3" />
                    <span>Cari</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              {/* Desktop Tab Navigation */}
              <TabsList className="hidden md:grid w-auto grid-cols-7 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <User className="w-4 h-4" />
                  <span>Profil</span>
                </TabsTrigger>
                <TabsTrigger value="bookings" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>Booking</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm text-sm">
                  <Bell className="w-4 h-4" />
                  <span>Notifikasi</span>
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
                        {recentActivities.map((activity) => (
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
                                <span>{activity.timestamp}</span>
                                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Lihat Detail
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
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

                  {/* Achievement Badges */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pencapaian</CardTitle>
                      <CardDescription>
                        Badge yang telah Anda dapatkan
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                            <Award className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-200">Reviewer Aktif</p>
                            <p className="text-sm text-yellow-600 dark:text-yellow-300">Memberikan 5+ review</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-blue-800 dark:text-blue-200">Tamu Setia</p>
                            <p className="text-sm text-blue-600 dark:text-blue-300">10+ booking selesai</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                            <Heart className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-green-800 dark:text-green-200">Kolektor</p>
                            <p className="text-sm text-green-600 dark:text-green-300">15+ item wishlist</p>
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
                        Kelola semua booking dan reservasi Anda
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
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bookings.map((booking) => (
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
                                 booking.status === 'completed' ? 'Selesai' : 
                                 booking.status === 'pending' ? 'Menunggu' : 'Dibatalkan'}
                              </Badge>
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
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
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
                             {visitHistory.reduce((sum, v) => sum + v.viewCount, 0)}
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
          </Tabs>
        </div>
      </div>
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
