import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Bell, Mail, MessageSquare, Star, Gift, AlertTriangle, CheckCircle, X, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/use-auth';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'booking' | 'promo' | 'review' | 'system' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  types: {
    booking: boolean;
    promo: boolean;
    review: boolean;
    system: boolean;
    reminder: boolean;
  };
  frequency: 'immediate' | 'daily' | 'weekly';
}

const NotificationSystem: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Booking Dikonfirmasi',
      message: 'Booking Anda untuk Villa Sinar Pelangi pada 15-17 Maret 2024 telah dikonfirmasi.',
      timestamp: '2024-03-10T10:30:00Z',
      isRead: false,
      actionUrl: '/dashboard/bookings',
      priority: 'high'
    },
    {
      id: '2',
      type: 'promo',
      title: 'Promo Spesial Akhir Pekan',
      message: 'Dapatkan diskon 20% untuk booking akhir pekan di semua villa. Berlaku hingga 31 Maret 2024.',
      timestamp: '2024-03-09T15:45:00Z',
      isRead: false,
      actionUrl: '/promos',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'review',
      title: 'Review Baru',
      message: 'Tamu Anda telah memberikan review 5 bintang untuk Villa Arizky. Lihat review lengkapnya.',
      timestamp: '2024-03-08T09:15:00Z',
      isRead: true,
      actionUrl: '/dashboard/reviews',
      priority: 'low'
    },
    {
      id: '4',
      type: 'reminder',
      title: 'Reminder Check-in',
      message: 'Jangan lupa check-in besok di Villa Sinar Pelangi. Check-in tersedia dari jam 14:00 WIB.',
      timestamp: '2024-03-09T08:00:00Z',
      isRead: false,
      actionUrl: '/dashboard/bookings',
      priority: 'high'
    },
    {
      id: '5',
      type: 'system',
      title: 'Maintenance Website',
      message: 'Website akan mengalami maintenance pada 20 Maret 2024 pukul 02:00-04:00 WIB.',
      timestamp: '2024-03-07T16:30:00Z',
      isRead: true,
      priority: 'medium'
    }
  ]);

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
    types: {
      booking: true,
      promo: true,
      review: true,
      system: true,
      reminder: true
    },
    frequency: 'immediate'
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.isRead).length);
  }, [notifications]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'promo':
        return <Gift className="w-5 h-5 text-orange-500" />;
      case 'review':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'system':
        return <AlertTriangle className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <Bell className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'booking':
        return 'Booking';
      case 'promo':
        return 'Promo';
      case 'review':
        return 'Review';
      case 'system':
        return 'Sistem';
      case 'reminder':
        return 'Reminder';
      default:
        return 'Notifikasi';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: 'Rendah', variant: 'secondary' as const, color: 'bg-gray-100 text-gray-800' },
      medium: { label: 'Sedang', variant: 'outline' as const, color: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'Tinggi', variant: 'default' as const, color: 'bg-red-100 text-red-800' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return (
      <Badge className={config.color} variant={config.variant}>
        {config.label}
      </Badge>
    );
  };

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
    
    toast({
      title: "Semua Notifikasi Ditandai Dibaca",
      description: "Semua notifikasi telah ditandai sebagai telah dibaca.",
    });
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    
    toast({
      title: "Notifikasi Dihapus",
      description: "Notifikasi telah dihapus dari daftar.",
    });
  };

  const handlePreferenceChange = (key: keyof NotificationPreferences['types'], value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      types: {
        ...prev.types,
        [key]: value
      }
    }));
  };

  const handleSavePreferences = () => {
    // Simulate API call
    toast({
      title: "Preferensi Disimpan",
      description: "Pengaturan notifikasi Anda telah disimpan.",
    });
    setIsSettingsOpen(false);
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Baru saja';
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} hari yang lalu`;
    }
  };

  const filteredNotifications = notifications.filter(n => 
    preferences.types[n.type]
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <Card>
            <CardContent className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Login untuk Mengakses Notifikasi
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Dapatkan notifikasi real-time tentang booking, promo, dan update penting
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 md:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Notifikasi
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                Kelola notifikasi dan preferensi pengiriman
              </p>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs md:text-sm">
                  {unreadCount} baru
                </Badge>
              )}
              
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs md:text-sm">
                    <Settings className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    <span className="hidden sm:inline">Pengaturan</span>
                    <span className="sm:hidden">Set</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Pengaturan Notifikasi</DialogTitle>
                    <DialogDescription>
                      Atur preferensi notifikasi dan cara pengiriman
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Delivery Methods */}
                    <div>
                      <h4 className="font-medium mb-3">Metode Pengiriman</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>Email</span>
                          </div>
                          <Switch
                            checked={preferences.email}
                            onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, email: checked }))}
                            aria-label="Aktifkan notifikasi email"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="w-4 h-4" />
                            <span>Push Notification</span>
                          </div>
                          <Switch
                            checked={preferences.push}
                            onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, push: checked }))}
                            aria-label="Aktifkan push notification"
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>SMS</span>
                          </div>
                          <Switch
                            checked={preferences.sms}
                            onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, sms: checked }))}
                            aria-label="Aktifkan notifikasi SMS"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Notification Types */}
                    <div>
                      <h4 className="font-medium mb-3">Jenis Notifikasi</h4>
                      <div className="space-y-3">
                        {Object.entries(preferences.types).map(([type, enabled]) => (
                          <div key={type} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getNotificationIcon(type)}
                              <span className="capitalize">{getNotificationTypeLabel(type)}</span>
                            </div>
                            <Switch
                              checked={enabled}
                              onCheckedChange={(checked) => handlePreferenceChange(type as keyof NotificationPreferences['types'], checked)}
                              aria-label={`Aktifkan notifikasi ${type}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Frequency */}
                    <div>
                      <h4 className="font-medium mb-3">Frekuensi Pengiriman</h4>
                      <select
                        value={preferences.frequency}
                        onChange={(e) => setPreferences(prev => ({ ...prev, frequency: e.target.value as any }))}
                        className="w-full p-2 border rounded-md"
                        aria-label="Pilih frekuensi pengiriman notifikasi"
                      >
                        <option value="immediate">Segera</option>
                        <option value="daily">Harian (digest)</option>
                        <option value="weekly">Mingguan (digest)</option>
                      </select>
                    </div>
                    
                    <Button onClick={handleSavePreferences} className="w-full">
                      Simpan Pengaturan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg md:text-xl">Daftar Notifikasi</CardTitle>
                <CardDescription className="text-sm">
                  {filteredNotifications.length} notifikasi
                </CardDescription>
              </div>
              
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="text-xs md:text-sm">
                  Tandai Semua Dibaca
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 md:py-12 text-gray-500 dark:text-gray-400">
                <Bell className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-50" />
                <p className="text-base md:text-lg font-medium mb-2">Tidak Ada Notifikasi</p>
                <p className="text-sm">Semua notifikasi telah dibaca atau tidak ada notifikasi baru</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border rounded-lg p-3 md:p-4 transition-colors ${
                      notification.isRead 
                        ? 'bg-gray-50 dark:bg-gray-800' 
                        : 'bg-white dark:bg-gray-900 border-ocean/20'
                    }`}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className={`font-medium text-sm md:text-base truncate ${
                                notification.isRead 
                                  ? 'text-gray-700 dark:text-gray-300' 
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {notification.title}
                              </h3>
                              {!notification.isRead && (
                                <Badge variant="default" className="text-xs">
                                  Baru
                                </Badge>
                              )}
                              <div className="hidden sm:block">
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>
                            
                            <p className={`text-xs md:text-sm line-clamp-2 ${
                              notification.isRead 
                                ? 'text-gray-600 dark:text-gray-400' 
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {notification.message}
                            </p>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-2 text-xs text-gray-500">
                              <span>{formatTimestamp(notification.timestamp)}</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="capitalize">{getNotificationTypeLabel(notification.type)}</span>
                              <div className="sm:hidden">
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1 sm:gap-2">
                            {!notification.isRead && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification.id)}
                                className="text-xs h-7 px-2"
                              >
                                <span className="hidden sm:inline">Tandai Dibaca</span>
                                <span className="sm:hidden">Dibaca</span>
                              </Button>
                            )}
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNotification(notification.id)}
                              className="text-xs h-7 px-2"
                            >
                              <X className="w-3 h-3 md:w-4 md:h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {notification.actionUrl && (
                          <div className="mt-3">
                            <Button variant="outline" size="sm" asChild className="text-xs">
                              <a href={notification.actionUrl}>
                                Lihat Detail
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationSystem;
