import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Star, MapPin, Users, Calendar } from 'lucide-react';
import SEO from '@/components/SEO';
import ReviewSystem, { Review, ReviewFormData } from '@/components/ReviewSystem';
import { useToast } from '@/components/ui/use-toast';

const ReviewDemoPage: React.FC = () => {
  const { toast } = useToast();
  
  // Sample property data
  const property = {
    id: 'villa-sinar-pelangi',
    name: 'Villa Sinar Pelangi',
    type: 'Villa',
    location: 'Pantai Sawarna, Banten',
    rating: 4.7,
    totalReviews: 24,
    capacity: 8,
    bedrooms: 3,
    price: 1500000,
    images: [
      '/images/villa-1.jpg',
      '/images/villa-2.jpg',
      '/images/villa-3.jpg'
    ]
  };

  // Sample reviews data
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: 'user-1',
      userName: 'Ahmad Rizki',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Villa yang sangat nyaman dan bersih! Lokasi strategis dekat pantai, view sunset yang indah. Staff ramah dan pelayanan cepat. Kolam renang pribadi yang menyegarkan. Sangat recommended untuk liburan keluarga!',
      createdAt: '2024-03-15T10:30:00Z',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      userId: 'user-2',
      userName: 'Sarah Putri',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      comment: 'Pengalaman menginap yang menyenangkan. Villa luas dengan desain modern, kamar tidur nyaman. Hanya saja AC di kamar utama agak berisik. Tapi overall sangat puas dengan fasilitas yang tersedia.',
      createdAt: '2024-03-10T14:20:00Z',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      userId: 'user-3',
      userName: 'Budi Santoso',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      comment: 'Liburan terbaik di Sawarna! Villa ini punya semua yang dibutuhkan untuk staycation yang nyaman. Dapur lengkap, ruang tamu luas, dan yang paling penting - lokasi yang perfect untuk menikmati sunrise dan sunset.',
      createdAt: '2024-03-05T09:15:00Z',
      helpful: 15,
      verified: true
    },
    {
      id: '4',
      userId: 'user-4',
      userName: 'Dewi Sari',
      userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4,
      comment: 'Villa yang bagus untuk liburan keluarga. Anak-anak suka dengan kolam renang dan taman bermain. Hanya perlu perbaikan di beberapa area yang sudah mulai aus. Tapi untuk harga segini sudah sangat worth it.',
      createdAt: '2024-02-28T16:45:00Z',
      helpful: 6,
      verified: true
    },
    {
      id: '5',
      userId: 'user-5',
      userName: 'Rendi Pratama',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 3,
      comment: 'Villa cukup nyaman tapi ada beberapa hal yang perlu diperbaiki. WiFi kadang lambat, dan beberapa lampu tidak berfungsi dengan baik. Tapi staff sangat membantu dan cepat merespons keluhan.',
      createdAt: '2024-02-20T11:30:00Z',
      helpful: 4,
      verified: true
    }
  ]);

  // Mock user state (in real app this would come from auth context)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);

  const handleReviewSubmit = async (data: ReviewFormData): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new review
    const newReview: Review = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'User Saat Ini',
      userAvatar: undefined,
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date().toISOString(),
      helpful: 0,
      verified: false
    };

    // Add to reviews list
    setReviews(prev => [newReview, ...prev]);
    
    toast({
      title: "Review Berhasil Ditambahkan",
      description: "Review Anda akan muncul setelah diverifikasi oleh admin.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <SEO 
        title="Demo Review System | Villa Sawarna"
        description="Lihat bagaimana sistem review dan rating bekerja di Villa Sawarna"
        keywords="demo review, sistem rating, review villa sawarna"
        url="https://villasawarna.com/review-demo"
        type="website"
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Demo Review System
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Halaman ini menampilkan bagaimana sistem review dan rating bekerja di Villa Sawarna. 
              Anda dapat melihat review yang ada dan mencoba fitur submit review.
            </p>
          </div>

          {/* Demo Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Demo Controls</CardTitle>
              <CardDescription>
                Ubah status untuk melihat bagaimana komponen berperilaku
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="login-status"
                    checked={isLoggedIn}
                    onChange={(e) => setIsLoggedIn(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="login-status" className="text-sm font-medium">
                    User Login
                  </label>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="booking-status"
                    checked={hasBooked}
                    onChange={(e) => setHasBooked(e.target.checked)}
                    className="rounded border-gray-300"
                    disabled={!isLoggedIn}
                  />
                  <label htmlFor="booking-status" className="text-sm font-medium">
                    Sudah Booking
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setHasBooked(false);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Info */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-ocean" />
                    {property.name}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    {property.type} • {property.location}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  {formatCurrency(property.price)}/malam
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({property.totalReviews} review)
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-ocean" />
                  <span className="font-medium">{property.capacity} tamu</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    • {property.bedrooms} kamar tidur
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-ocean" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {property.location}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review System Component */}
          <ReviewSystem
            propertyId={property.id}
            propertyName={property.name}
            reviews={reviews}
            onReviewSubmit={handleReviewSubmit}
            userCanReview={isLoggedIn}
            userHasBooked={hasBooked}
          />

          {/* Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Petunjuk Penggunaan</CardTitle>
              <CardDescription>
                Cara menggunakan demo review system ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    1
                  </span>
                  <p>
                    <strong>Login Status:</strong> Centang "User Login" untuk mensimulasikan user yang sudah login
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    2
                  </span>
                  <p>
                    <strong>Booking Status:</strong> Centang "Sudah Booking" untuk mensimulasikan user yang sudah pernah menginap
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    3
                  </span>
                  <p>
                    <strong>Submit Review:</strong> Setelah kedua status dicentang, Anda dapat melihat tombol "Tulis Review" dan mencoba submit review
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    4
                  </span>
                  <p>
                    <strong>Lihat Perubahan:</strong> Review yang Anda submit akan muncul di daftar review (akan ditandai sebagai "belum diverifikasi")
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ReviewDemoPage;
