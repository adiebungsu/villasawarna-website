import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, MessageSquare, ThumbsUp, Calendar, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
  verified: boolean;
}

export interface ReviewFormData {
  rating: number;
  comment: string;
}

interface ReviewSystemProps {
  propertyId: string;
  propertyName: string;
  reviews: Review[];
  onReviewSubmit: (data: ReviewFormData) => Promise<void>;
  userCanReview: boolean;
  userHasBooked: boolean;
  className?: string;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({
  propertyId,
  propertyName,
  reviews,
  onReviewSubmit,
  userCanReview,
  userHasBooked,
  className
}) => {
  const { toast } = useToast();
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    rating: 0,
    comment: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate average rating and distribution
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const count = reviews.filter(review => review.rating === 5 - i).length;
    const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { rating: 5 - i, count, percentage };
  });

  const handleRatingChange = (rating: number) => {
    setReviewForm(prev => ({ ...prev, rating }));
  };

  const handleReviewSubmit = async () => {
    if (reviewForm.rating === 0) {
      toast({
        title: "Rating Diperlukan",
        description: "Silakan berikan rating sebelum mengirim review",
        variant: "destructive"
      });
      return;
    }

    if (reviewForm.comment.trim().length < 10) {
      toast({
        title: "Komentar Terlalu Pendek",
        description: "Komentar minimal 10 karakter",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onReviewSubmit(reviewForm);
      toast({
        title: "Review Berhasil Dikirim",
        description: "Terima kasih atas review Anda!",
      });
      setIsReviewDialogOpen(false);
      setReviewForm({ rating: 0, comment: '' });
    } catch (error) {
      toast({
        title: "Gagal Mengirim Review",
        description: "Terjadi kesalahan, silakan coba lagi",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number, interactive = false, size = 'default') => {
    const starSize = size === 'small' ? 'w-4 h-4' : size === 'large' ? 'w-6 h-6' : 'w-5 h-5';
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              starSize,
              'transition-colors',
              {
                'text-yellow-400 fill-yellow-400': star <= rating,
                'text-gray-300 dark:text-gray-600': star > rating,
                'cursor-pointer hover:text-yellow-400': interactive,
                'text-yellow-400 fill-yellow-400': interactive && star <= hoveredRating
              }
            )}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            onClick={() => interactive && handleRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const renderRatingBar = (rating: number, count: number, percentage: number) => (
    <div key={rating} className="flex items-center gap-2">
      <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
        {rating} <Star className="w-3 h-3 inline text-yellow-400 fill-yellow-400" />
      </span>
      <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400 w-12 text-right">
        {count}
      </span>
    </div>
  );

  return (
    <div className={cn("space-y-6", className)}>
      {/* Review Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Review & Rating
          </CardTitle>
          <CardDescription>
            {reviews.length} review dari tamu yang pernah menginap
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {renderStars(Math.round(averageRating), false, 'large')}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Berdasarkan {reviews.length} review
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => 
                renderRatingBar(rating, count, percentage)
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Button */}
      {userCanReview && userHasBooked && (
        <div className="text-center">
          <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="px-8">
                <MessageSquare className="w-4 h-4 mr-2" />
                Tulis Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Tulis Review untuk {propertyName}</DialogTitle>
                <DialogDescription>
                  Bagikan pengalaman Anda menginap di properti ini
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Rating Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Rating
                  </label>
                  <div className="flex justify-center">
                    {renderStars(reviewForm.rating, true, 'large')}
                  </div>
                  {reviewForm.rating > 0 && (
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {reviewForm.rating} bintang
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div>
                  <label htmlFor="review-comment" className="text-sm font-medium mb-2 block">
                    Komentar
                  </label>
                  <Textarea
                    id="review-comment"
                    placeholder="Bagikan pengalaman Anda menginap di properti ini..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                    rows={4}
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1 text-right">
                    {reviewForm.comment.length}/500
                  </p>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsReviewDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
                <Button 
                  onClick={handleReviewSubmit}
                  disabled={isSubmitting || reviewForm.rating === 0}
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Review'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Review Requirements */}
      {!userCanReview && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-1">
                  Belum Bisa Review
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {!userHasBooked 
                    ? 'Anda harus menginap di properti ini terlebih dahulu untuk dapat memberikan review'
                    : 'Silakan login untuk memberikan review'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Review Terbaru</h3>
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    {review.userAvatar ? (
                      <img 
                        src={review.userAvatar} 
                        alt={review.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-ocean text-white rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {review.userName}
                      </h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Tamu Terverifikasi
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(review.rating, false, 'small')}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {review.comment}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <button className="flex items-center gap-1 hover:text-ocean transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {review.helpful} membantu
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Reviews */}
      {reviews.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Belum Ada Review
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Jadilah yang pertama memberikan review untuk properti ini
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewSystem;
