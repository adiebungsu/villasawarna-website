import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Calendar, 
  Heart, 
  Settings, 
  Bell,
  Search,
  Star,
  CreditCard,
  FileText,
  MessageSquare,
  Plus,
  CheckCircle,
  ThumbsUp,
  Award,
  Medal,
  Crown,
  Gem,
  BarChart3,
  Activity,
  Zap,
  PieChart,
  Save,
  LogOut,
  HelpCircle,
  Info
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import WishlistSystem from '@/components/WishlistSystem';
import { useUserData } from '@/context/user-data-provider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import DashboardTour from '@/components/DashboardTour';
import UpdateChecker from '@/components/UpdateChecker';
import { getCurrentVersion } from '@/utils/registerServiceWorker';

const UserDashboardPage: React.FC = () => {
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const {
    bookings,
    reviews,
    stats,
    recentActivities,
    clearDemoData
  } = useUserData();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(false);
  
  // Sample notifications data
  const notifications = [
    {
      id: '1',
      type: 'booking',
      title: 'Booking Dikonfirmasi',
      message: 'Booking Anda untuk Villa Sinar Pelangi pada 15-17 Maret 2024 telah dikonfirmasi.',
      timestamp: '2024-03-10T10:30:00Z',
      isRead: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'promo',
      title: 'Promo Spesial Akhir Pekan',
      message: 'Dapatkan diskon 20% untuk booking akhir pekan di semua villa.',
      timestamp: '2024-03-09T15:45:00Z',
      isRead: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Reminder Check-in',
      message: 'Jangan lupa check-in besok di Villa Sinar Pelangi.',
      timestamp: '2024-03-09T08:00:00Z',
      isRead: true,
      priority: 'high'
    }
  ];
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Check if dashboard tour should be shown
  useEffect(() => {
    const shouldShowTour = localStorage.getItem('showDashboardTour');
    if (shouldShowTour === '1') {
      setIsTourOpen(true);
      localStorage.removeItem('showDashboardTour');
    }
  }, []);

  // Calculate loyalty points and tier
  const loyaltyData = useMemo(() => {
    const totalSpent = stats.totalSpent || 0;
    const totalBookings = stats.totalBookings || 0;
    const totalReviews = stats.totalReviews || 0;
    
    const pointsEarned = Math.floor(totalSpent / 10000);
    const reviewBonus = totalReviews * 50;
    const totalPoints = pointsEarned + reviewBonus;
    
    let tier = 'Bronze';
    let nextTierPoints = 1000;
    let tierBenefits = ['5% off on first booking', 'Priority support'];
    let tierColor = 'bg-amber-500';
    let tierIcon = <Medal className="w-5 h-5" />;
    
    if (totalPoints >= 5000) {
      tier = 'Platinum';
      nextTierPoints = null;
      tierBenefits = ['15% off all bookings', 'Free late check-out', 'VIP support', 'Exclusive events'];
      tierColor = 'bg-gradient-to-r from-gray-400 to-gray-600';
      tierIcon = <Crown className="w-5 h-5" />;
    } else if (totalPoints >= 3000) {
      tier = 'Gold';
      nextTierPoints = 5000;
      tierBenefits = ['12% off all bookings', 'Free early check-in', 'Priority support', 'Birthday rewards'];
      tierColor = 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      tierIcon = <Gem className="w-5 h-5" />;
    } else if (totalPoints >= 1000) {
      tier = 'Silver';
      nextTierPoints = 3000;
      tierBenefits = ['8% off all bookings', 'Priority support', 'Birthday rewards'];
      tierColor = 'bg-gradient-to-r from-gray-300 to-gray-500';
      tierIcon = <Award className="w-5 h-5" />;
    }
    
    const progressToNextTier = nextTierPoints ? Math.min((totalPoints / nextTierPoints) * 100, 100) : 100;
    
    return {
      tier,
      totalPoints,
      pointsEarned,
      reviewBonus,
      nextTierPoints,
      progressToNextTier,
      tierBenefits,
      totalSpent,
      totalBookings,
      tierColor,
      tierIcon
    };
  }, [stats.totalSpent, stats.totalBookings, stats.totalReviews]);

  return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pb-20 lg:pb-0 dashboard-mobile">
      <SEO 
        title="Dashboard - Villa Sawarna"
        description="Kelola akun, booking, dan aktivitas Anda di Villa Sawarna"
      />
      
              <div className="container mx-auto px-4 py-4 sm:py-8 max-w-full overflow-x-hidden">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8" data-tour="welcome">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Selamat Datang, {user?.name || 'User'}! 👋
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Kelola akun dan aktivitas Anda di Villa Sawarna
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Demo Buttons */}
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs sm:text-sm hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700 transition-colors"
                onClick={() => {
                  // Trigger demo data initialization
                  localStorage.setItem('initializeDemoData', '1');
                  window.location.reload();
                }}
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Demo</span>
                <span className="sm:hidden">Demo</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs sm:text-sm hover:bg-orange-50 dark:hover:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-700 transition-colors"
                onClick={() => {
                  // Clear only demo data without affecting authentication
                  if (confirm('Apakah Anda yakin ingin menghapus semua data demo? User akan tetap login.')) {
                    clearDemoData();
                  }
                }}
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Hapus Demo</span>
                <span className="sm:hidden">Clear</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Pengaturan</span>
                <span className="sm:hidden">Set</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs sm:text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 transition-colors"
                onClick={() => setIsTourOpen(true)}
              >
                <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Bantuan</span>
                <span className="sm:hidden">Help</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs sm:text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700 transition-colors"
                onClick={() => {
                  setUser(null);
                  localStorage.removeItem('user');
                  toast({
                    title: "Logout berhasil",
                    description: "Anda telah keluar dari akun"
                  });
                  navigate('/logout');
                }}
              >
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:text-sm">Logout</span>
                <span className="sm:hidden">Out</span>
              </Button>
              <Dialog open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs sm:text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors relative"
                  >
                    <Bell className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Notifikasi</span>
                    <span className="sm:hidden">Notif</span>
                    {/* Notification badge */}
                    {unreadCount > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notifikasi
                      {unreadCount > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {unreadCount} baru
                        </Badge>
                      )}
                    </DialogTitle>
                    <DialogDescription>
                      Lihat dan kelola notifikasi Anda
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-3 rounded-lg border ${
                          notification.isRead 
                            ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                            : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className={`font-medium text-sm ${
                              notification.isRead 
                                ? 'text-gray-700 dark:text-gray-300' 
                                : 'text-blue-900 dark:text-blue-100'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                              {new Date(notification.timestamp).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <Badge 
                            variant={notification.priority === 'high' ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            {notification.priority === 'high' ? 'Tinggi' : 'Sedang'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Pengaturan Notifikasi",
                          description: "Fitur pengaturan notifikasi akan segera hadir! ⚙️",
                          duration: 3000,
                        });
                      }}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Pengaturan
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Tandai Semua Dibaca",
                          description: "Semua notifikasi telah ditandai sebagai dibaca! ✅",
                          duration: 2000,
                        });
                      }}
                    >
                      Tandai Dibaca
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8" data-tour="stats-cards">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Booking</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalBookings || 0}</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Ulasan</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalReviews || 0}</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-full">
                    <Star className="w-4 h-4 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Wishlist</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.wishlistItems || 0}</p>
                  </div>
                  <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900 rounded-full">
                    <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardContent className="p-3 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Pengeluaran</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                      Rp {(stats.totalSpent || 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <CreditCard className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 sm:space-y-8">
          {/* Professional Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden relative">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 pointer-events-none"></div>
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-6 bg-transparent border-0 p-1 h-auto overflow-x-auto scrollbar-hide">
                             <TabsTrigger 
                 value="overview"
                 data-tour="tab-overview" 
                 className="relative flex flex-col items-center justify-center gap-2 px-4 py-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-50 data-[state=active]:to-indigo-50 dark:data-[state=active]:from-blue-900/20 dark:data-[state=active]:to-indigo-900/20 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300 data-[state=active]:shadow-sm rounded-lg transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-blue-900/10 dark:hover:to-indigo-900/10 hover:scale-105 text-xs sm:text-sm font-medium group"
               >
                <div className="relative">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  {activeTab === 'overview' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                  )}
                </div>
                <span className="hidden sm:block">Overview</span>
                <span className="sm:hidden text-xs">Home</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="bookings" 
                data-tour="tab-bookings"
                className="relative flex flex-col items-center justify-center gap-2 px-4 py-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-green-50 data-[state=active]:to-emerald-50 dark:data-[state=active]:from-green-900/20 dark:data-[state=active]:to-emerald-900/20 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-300 data-[state=active]:shadow-sm rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-xs sm:text-sm font-medium"
              >
                <div className="relative">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  {activeTab === 'bookings' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <span className="hidden sm:block">Booking</span>
                <span className="sm:hidden text-xs">Book</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="reviews" 
                data-tour="tab-reviews"
                className="relative flex flex-col items-center justify-center gap-2 px-4 py-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-yellow-50 data-[state=active]:to-amber-50 dark:data-[state=active]:from-yellow-900/20 dark:data-[state=active]:to-amber-900/20 data-[state=active]:text-yellow-700 dark:data-[state=active]:text-yellow-300 data-[state=active]:shadow-sm rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-xs sm:text-sm font-medium"
              >
                <div className="relative">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                  {activeTab === 'reviews' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full"></div>
                  )}
                </div>
                <span className="hidden sm:block">Ulasan</span>
                <span className="sm:hidden text-xs">Rate</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="wishlist" 
                data-tour="tab-wishlist"
                className="relative flex flex-col items-center justify-center gap-2 px-4 py-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-red-50 data-[state=active]:to-pink-50 dark:data-[state=active]:from-red-900/20 dark:data-[state=active]:to-pink-900/20 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300 data-[state=active]:shadow-sm rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-xs sm:text-sm font-medium"
              >
                <div className="relative">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {activeTab === 'wishlist' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
                  )}
                </div>
                <span className="hidden sm:block">Wishlist</span>
                <span className="sm:hidden text-xs">Like</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="loyalty" 
                data-tour="tab-loyalty"
                className="relative flex flex-col items-center justify-center gap-2 px-4 py-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-purple-50 data-[state=active]:to-violet-50 dark:data-[state=active]:from-purple-900/20 dark:data-[state=active]:to-violet-900/20 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300 data-[state=active]:shadow-sm rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-xs sm:text-sm font-medium"
              >
                <div className="relative">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  {activeTab === 'loyalty' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></div>
                  )}
                </div>
                <span className="hidden sm:block">Loyalty</span>
                <span className="sm:hidden text-xs">Reward</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="settings" 
                data-tour="tab-settings"
                className="relative flex flex-col items-center justify-center gap-2 px-4 py-4 data-[state=active]:bg-gradient-to-br data-[state=active]:from-gray-50 data-[state=active]:to-slate-50 dark:data-[state=active]:from-gray-900/20 dark:data-[state=active]:to-slate-900/20 data-[state=active]:text-gray-700 dark:data-[state=active]:text-gray-300 data-[state=active]:shadow-sm rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-xs sm:text-sm font-medium"
              >
                <div className="relative">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  {activeTab === 'settings' && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-500 rounded-full"></div>
                  )}
                </div>
                <span className="hidden sm:block">Pengaturan</span>
                <span className="sm:hidden text-xs">Set</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Loyalty Status */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    {loyaltyData.tierIcon}
                    Status Loyalty
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tier</span>
                    <Badge className={`${loyaltyData.tierColor} text-white`}>
                      {loyaltyData.tier}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Points</span>
                    <span className="font-semibold">{loyaltyData.totalPoints.toLocaleString()}</span>
                  </div>
                  {loyaltyData.nextTierPoints && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progress ke {loyaltyData.tier === 'Bronze' ? 'Silver' : loyaltyData.tier === 'Silver' ? 'Gold' : 'Platinum'}</span>
                        <span>{Math.round(loyaltyData.progressToNextTier)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${loyaltyData.progressToNextTier}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Aktivitas Terbaru
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0" data-tour="quick-actions">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Aksi Cepat
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/villas')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Booking Baru
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/search')}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Cari Villa
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => navigate('/contact')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Hubungi Support
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Invoice",
                        description: "Fitur invoice akan segera tersedia",
                      });
                    }}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Lihat Invoice
                  </Button>
                </CardContent>
              </Card>

              {/* Demo Controls */}
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700 shadow-lg border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <HelpCircle className="w-5 h-5" />
                    Demo Controls
                  </CardTitle>
                  <CardDescription className="text-amber-700 dark:text-amber-300">
                    Kontrol untuk testing dan development
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-green-600 hover:bg-green-700 text-white border-0" 
                    variant="default"
                    onClick={() => {
                      localStorage.setItem('initializeDemoData', '1');
                      toast({
                        title: "Demo Data",
                        description: "Data demo akan diinisialisasi setelah refresh halaman",
                      });
                      setTimeout(() => window.location.reload(), 1500);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Load Demo Data
                  </Button>
                  <Button 
                    className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white border-0" 
                    variant="default"
                    onClick={() => {
                      if (confirm('Apakah Anda yakin ingin menghapus semua data demo? User akan tetap login.')) {
                        clearDemoData();
                      }
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Clear Demo Data
                  </Button>
                  <Button 
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white border-0" 
                    variant="default"
                    onClick={() => {
                      toast({
                        title: "Info Demo",
                        description: "Data demo menggunakan villa real: Sinar Pelangi, Arizky Sawarna, dan Aliya Sawarna",
                      });
                    }}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Info Demo Data
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Booking Mendatang
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.filter(b => b.status === 'confirmed').length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {bookings.filter(b => b.status === 'confirmed').slice(0, 3).map((booking) => (
                      <div key={booking.id} className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                          <img 
                            src={booking.propertyImage} 
                            alt={booking.propertyName}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                              {booking.propertyName}
                            </h4>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                              {booking.guests} tamu
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Check-in:</span>
                            <span className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Total:</span>
                            <span className="font-medium">Rp {booking.totalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-2 sm:mt-3 text-xs sm:text-sm" 
                          size="sm"
                          onClick={() => navigate(`/property/${booking.propertyId}`)}
                        >
                          Lihat Detail
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Belum ada booking mendatang</p>
                    <Button 
                      className="mt-3 sm:mt-4" 
                      size="sm"
                      onClick={() => navigate('/villas')}
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Booking Sekarang
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4 sm:space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Riwayat Booking
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <img 
                              src={booking.propertyImage} 
                              alt={booking.propertyName}
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 dark:text-white text-sm sm:text-base truncate">
                                {booking.propertyName}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 
                                     booking.status === 'pending' ? 'secondary' : 
                                     booking.status === 'completed' ? 'outline' : 'destructive'}
                              className="text-xs sm:text-sm"
                            >
                              {booking.status}
                            </Badge>
                            <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mt-1">
                              Rp {booking.totalPrice.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                            <span>{booking.guests} tamu</span>
                            <span>Booking: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                          </div>
                                                      <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs sm:text-sm"
                              onClick={() => navigate(`/property/${booking.propertyId}`)}
                            >
                              Lihat Detail
                            </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Belum ada riwayat booking</p>
                    <Button 
                      className="mt-3 sm:mt-4" 
                      size="sm"
                      onClick={() => navigate('/villas')}
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Mulai Booking
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Ulasan Saya
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-start gap-3 mb-3">
                          <img 
                            src={review.propertyImage} 
                            alt={review.propertyName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {review.propertyName}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(review.reviewDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <ThumbsUp className="w-4 h-4" />
                            {review.helpful} orang merasa membantu
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Edit Ulasan",
                                description: "Fitur edit ulasan akan segera tersedia",
                              });
                            }}
                          >
                            Edit Ulasan
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Belum ada ulasan</p>
                    <Button 
                      className="mt-4"
                      onClick={() => navigate('/villas')}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tulis Ulasan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            <WishlistSystem />
          </TabsContent>

          {/* Loyalty Tab */}
          <TabsContent value="loyalty" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Loyalty Status */}
                <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {loyaltyData.tierIcon}
                      Status Loyalty
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${loyaltyData.tierColor} mb-4`}>
                        {loyaltyData.tierIcon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {loyaltyData.tier}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {loyaltyData.totalPoints.toLocaleString()} Points
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Benefits:</h4>
                      <ul className="space-y-2">
                        {loyaltyData.tierBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {loyaltyData.nextTierPoints && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Progress ke {loyaltyData.tier === 'Bronze' ? 'Silver' : loyaltyData.tier === 'Silver' ? 'Gold' : 'Platinum'}
                          </span>
                          <span className="font-medium">{Math.round(loyaltyData.progressToNextTier)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${loyaltyData.progressToNextTier}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          {loyaltyData.nextTierPoints - loyaltyData.totalPoints} points lagi untuk naik tier
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Points Breakdown */}
                <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Breakdown Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Points dari Booking</span>
                        <span className="font-medium">{loyaltyData.pointsEarned.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Bonus Review</span>
                        <span className="font-medium">{loyaltyData.reviewBonus.toLocaleString()}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total Points</span>
                        <span className="text-lg">{loyaltyData.totalPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
              <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Pengaturan Akun
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Informasi Pribadi</h4>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name">Nama Lengkap</Label>
                          <Input id="name" defaultValue={user?.name || ''} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue={user?.email || ''} />
                        </div>
                        <div>
                          <Label htmlFor="phone">Nomor Telepon</Label>
                          <Input id="phone" defaultValue="" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Notifikasi</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Email Notifikasi</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Terima notifikasi via email</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Push Notifikasi</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Terima notifikasi real-time</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Promo & Penawaran</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Terima informasi promo</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        toast({
                          title: "Berhasil",
                          description: "Pengaturan telah disimpan",
                        });
                      }}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Simpan Perubahan
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "Reset",
                          description: "Pengaturan telah direset ke default",
                        });
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Demo Controls */}
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <HelpCircle className="w-5 h-5" />
                    Demo Controls
                  </CardTitle>
                  <CardDescription className="text-amber-700 dark:text-amber-300">
                    Kontrol untuk testing dan development
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white border-0" 
                      variant="default"
                      onClick={() => {
                        localStorage.setItem('initializeDemoData', '1');
                        toast({
                          title: "Demo Data",
                          description: "Data demo akan diinisialisasi setelah refresh halaman",
                        });
                        setTimeout(() => window.location.reload(), 1500);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Load Demo Data
                    </Button>
                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white border-0" 
                      variant="default"
                      onClick={() => {
                        if (confirm('Apakah Anda yakin ingin menghapus semua data demo? User akan tetap login.')) {
                          clearDemoData();
                        }
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Clear Demo Data
                    </Button>
                  </div>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0" 
                    variant="default"
                    onClick={() => {
                      toast({
                        title: "Info Demo",
                        description: "Data demo menggunakan villa real: Sinar Pelangi, Arizky Sawarna, dan Aliya Sawarna",
                      });
                    }}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Info Demo Data
                  </Button>
                  <div className="text-xs text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 p-3 rounded-lg">
                    <p className="font-medium mb-2">Data Demo yang Tersedia:</p>
                    <ul className="space-y-1">
                      <li>• 3 booking villa dengan data real</li>
                      <li>• 2 review villa dengan rating dan komentar</li>
                      <li>• Notifikasi dan percakapan</li>
                      <li>• Travel plans dan support tickets</li>
                    </ul>
                  </div>
                  
                  {/* Debug Info */}
                  <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                    <p className="font-medium mb-2">🔍 Debug Info:</p>
                    <div className="space-y-1">
                      <p><strong>Current Bookings:</strong> {bookings.length}</p>
                      <p><strong>Current Reviews:</strong> {reviews.length}</p>
                      <p><strong>Data Source:</strong> {bookings.length > 0 ? 'Demo Data' : 'No Data'}</p>
                      {bookings.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium">Sample Booking Data:</p>
                          {bookings.slice(0, 1).map(booking => (
                            <div key={booking.id} className="text-xs bg-white dark:bg-gray-800 p-2 rounded mt-1">
                              <p><strong>Villa:</strong> {booking.propertyName}</p>
                              <p><strong>Current Version:</strong> {getCurrentVersion()}</p>
                              <p><strong>Image:</strong> {booking.propertyImage?.substring(0, 50)}...</p>
                              <p><strong>Price:</strong> Rp {booking.totalPrice?.toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Update Checker */}
                  <UpdateChecker />
                </CardContent>
              </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dashboard Tour */}
      <DashboardTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onTabChange={setActiveTab}
        onComplete={() => {
          setIsTourOpen(false);
          // Simpan status bahwa tour sudah selesai
          try {
            localStorage.setItem('dashboardTourCompleted', 'true');
          } catch (error) {
            console.warn('Failed to save tour completion:', error);
          }
        }}
      />


    </div>
  );
};

export default UserDashboardPage;
