import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Star, Users, Building2, Trash2, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/use-auth';
import { useWishlist } from '@/context/use-wishlist';
import { WishlistFolder } from '@/context/wishlist-context-helpers';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const WishlistSystem: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { wishlistFolders, setWishlistFolders } = useWishlist();
  
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const [newFolder, setNewFolder] = useState({ name: '', description: '', isPublic: false });

  // Set default selected folder when component mounts or folders change
  useEffect(() => {
    if (wishlistFolders.length > 0 && !selectedFolder) {
      setSelectedFolder(wishlistFolders[0].id);
    }
  }, [wishlistFolders, selectedFolder]);

  const currentFolder = wishlistFolders.find(f => f.id === selectedFolder);
  const currentItems = currentFolder?.items || [];

  const handleCreateFolder = () => {
    if (!newFolder.name.trim()) {
      toast({
        title: "Nama Folder Diperlukan",
        description: "Silakan berikan nama untuk folder baru.",
        variant: "destructive",
      });
      return;
    }

    const folder = {
      id: Date.now().toString(),
      name: newFolder.name.trim(),
      description: newFolder.description.trim(),
      items: [],
      isPublic: newFolder.isPublic,
      createdAt: new Date().toISOString()
    };

    setWishlistFolders([...wishlistFolders, folder]);
    setNewFolder({ name: '', description: '', isPublic: false });
    setIsCreateFolderOpen(false);

    toast({
      title: "Folder Berhasil Dibuat",
      description: `Folder "${folder.name}" telah dibuat.`,
    });
  };

  const handleRemoveFromWishlist = (itemId: string, folderId: string) => {
    const item = currentItems.find(item => item.id === itemId);
    
    if (window.confirm(`Apakah Anda yakin ingin menghapus "${item?.propertyName}" dari wishlist?`)) {
      // Remove from the specific folder
      setWishlistFolders(prev => prev.map(f => 
        f.id === folderId 
          ? { ...f, items: f.items.filter(item => item.id !== itemId) }
          : f
      ));

      toast({
        title: "Berhasil Dihapus",
        description: `${item?.propertyName} telah dihapus dari wishlist.`,
      });
    }
  };

  const handleShareWishlist = (folder: WishlistFolder) => {
    if (!folder.isPublic) {
      toast({
        title: "Wishlist Pribadi",
        description: "Hanya wishlist publik yang dapat dibagikan.",
        variant: "destructive",
      });
      return;
    }

    // Generate shareable link
    const shareUrl = `${window.location.origin}/wishlist/${folder.id}`;
    navigator.clipboard.writeText(shareUrl);

    toast({
      title: "Link Tersalin",
      description: "Link wishlist telah disalin ke clipboard.",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'villa':
        return <Building2 className="w-4 h-4" />;
      case 'homestay':
        return <Users className="w-4 h-4" />;
      case 'hotel':
        return <Building2 className="w-4 h-4" />;
      default:
        return <Building2 className="w-4 h-4" />;
    }
  };

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'villa':
        return 'Villa';
      case 'homestay':
        return 'Homestay';
      case 'hotel':
        return 'Hotel';
      default:
        return 'Properti';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 md:py-8 pb-20 md:pb-8">
        <div className="container mx-auto px-3 md:px-4">
          <Card>
            <CardContent className="text-center py-8 md:py-12">
              <Heart className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                Login untuk Mengakses Wishlist
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-6">
                Simpan properti favorit Anda dan buat folder wishlist pribadi
              </p>
              <Button asChild size="sm">
                <Link to="/login">Login Sekarang</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 md:py-8 pb-20 md:pb-8">
      <div className="container mx-auto px-3 md:px-4">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  Wishlist Saya
                </h1>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  Kelola properti favorit dan buat folder wishlist pribadi
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{wishlistFolders.length}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Folder</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{wishlistFolders.reduce((total, folder) => total + folder.items.length, 0)}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Properti</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{wishlistFolders.filter(f => f.isPublic).length}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Publik</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
          {/* Sidebar - Folder List */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border-gray-100 dark:border-gray-700">
              <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <CardTitle className="text-base md:text-lg">Folder Wishlist</CardTitle>
                  </div>
                  <Dialog open={isCreateFolderOpen} onOpenChange={setIsCreateFolderOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="text-xs md:text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <Heart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        <span className="hidden sm:inline">Buat</span>
                        <span className="sm:hidden">+</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                        <DialogTitle className="text-xl">Buat Folder Wishlist Baru</DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                          Buat folder untuk mengorganisir properti favorit Anda dengan lebih rapi
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="folder-name" className="text-sm font-medium">Nama Folder</Label>
                          <Input
                            id="folder-name"
                            value={newFolder.name}
                            onChange={(e) => setNewFolder(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Contoh: Liburan Keluarga"
                            className="border-gray-200 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-400"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="folder-description" className="text-sm font-medium">Deskripsi (Opsional)</Label>
                          <Textarea
                            id="folder-description"
                            value={newFolder.description}
                            onChange={(e) => setNewFolder(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Deskripsi folder ini..."
                            rows={3}
                            className="border-gray-200 dark:border-gray-700 focus:border-red-500 dark:focus:border-red-400"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <input
                            type="checkbox"
                            id="folder-public"
                            checked={newFolder.isPublic}
                            onChange={(e) => setNewFolder(prev => ({ ...prev, isPublic: e.target.checked }))}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            aria-label="Buat folder publik yang dapat dibagikan"
                          />
                          <div>
                            <Label htmlFor="folder-public" className="text-sm font-medium text-blue-900 dark:text-blue-100">
                              Folder Publik
                            </Label>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                              Folder ini dapat dibagikan dengan orang lain
                            </p>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleCreateFolder} 
                          className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium"
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Buat Folder
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-3 md:p-6">
                <div className="space-y-3">
                  {wishlistFolders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setSelectedFolder(folder.id)}
                      className={`w-full text-left p-3 md:p-4 rounded-xl transition-all duration-200 border ${
                        selectedFolder === folder.id
                          ? 'bg-gradient-to-r from-ocean to-blue-600 text-white shadow-lg border-ocean'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-100 dark:border-gray-700 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-2 h-2 rounded-full ${
                              selectedFolder === folder.id 
                                ? 'bg-white' 
                                : 'bg-gradient-to-r from-red-400 to-pink-400'
                            }`}></div>
                            <div className={`font-semibold text-sm md:text-base truncate ${
                              selectedFolder === folder.id 
                                ? 'text-white' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {folder.name}
                            </div>
                          </div>
                          <div className={`text-xs ${
                            selectedFolder === folder.id 
                              ? 'text-white/80' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {folder.items.length} properti tersimpan
                          </div>
                        </div>
                        {folder.isPublic && (
                          <Badge variant="secondary" className="text-xs hidden sm:inline-flex bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                            Publik
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Wishlist Items */}
          <div className="lg:col-span-3">
            <Card className="shadow-sm border-gray-100 dark:border-gray-700">
              <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-t-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg md:text-xl">{currentFolder?.name || 'Semua Item'}</CardTitle>
                      <CardDescription className="text-sm">
                        {currentItems.length} properti dalam wishlist
                      </CardDescription>
                    </div>
                  </div>
                  {currentFolder && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShareWishlist(currentFolder)}
                        className="text-xs md:text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Share2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        <span className="hidden sm:inline">Bagikan</span>
                        <span className="sm:hidden">Share</span>
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                {currentItems.length === 0 ? (
                  <div className="text-center py-12 md:py-16 text-gray-500 dark:text-gray-400">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-10 h-10 md:w-12 md:h-12 text-red-400" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">Wishlist Kosong</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      Belum ada properti yang disimpan dalam folder ini. Mulai jelajahi properti menarik dan tambahkan ke wishlist Anda!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild size="lg" className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                        <Link to="/villas">Jelajahi Properti</Link>
                      </Button>
                      <Button variant="outline" size="lg" onClick={() => setIsCreateFolderOpen(true)}>
                        Buat Folder Baru
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 md:space-y-6">
                    {currentItems.map((item) => (
                      <div key={item.id} className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800">
                        {/* Image Section - Full Width */}
                        <div className="relative w-full h-48 md:h-56">
                          <img
                            src={item.propertyImage}
                            alt={item.propertyName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://i.imgur.com/KNZs2rS.jpeg'; // Fallback image
                            }}
                          />
                          {/* Wishlist Badge */}
                          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                            Wishlist
                          </div>
                          {/* Property Type Badge */}
                          <div className="absolute top-3 right-3 bg-blue-500/90 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">
                            {getPropertyTypeLabel(item.propertyType)}
                          </div>
                        </div>
                        
                        {/* Content Section */}
                        <div className="p-4 md:p-6">
                          {/* Title and Location */}
                          <div className="mb-4">
                            <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-2 line-clamp-2">
                              {item.propertyName}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <MapPin className="w-4 h-4" />
                              <span className="truncate">{item.location}</span>
                            </div>
                          </div>
                          
                          {/* Price - Prominent Display */}
                          <div className="mb-4">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                              <div className="text-center">
                                <div className="font-bold text-xl md:text-2xl text-green-600 dark:text-green-400">
                                  {formatCurrency(item.price)}
                                </div>
                                <div className="text-sm text-green-600/70 dark:text-green-400/70">
                                  per malam
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Key Stats - Grid Layout */}
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-center border border-yellow-200 dark:border-yellow-800">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                <span className="font-bold text-yellow-700 dark:text-yellow-300">{item.rating}</span>
                              </div>
                              <div className="text-xs text-yellow-600 dark:text-yellow-400">
                                {item.reviews} ulasan
                              </div>
                            </div>
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center border border-blue-200 dark:border-blue-800">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Users className="w-4 h-4 text-blue-500" />
                                <span className="font-bold text-blue-700 dark:text-blue-300">{item.capacity}</span>
                              </div>
                              <div className="text-xs text-blue-600 dark:text-blue-400">
                                Maks orang
                              </div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center border border-purple-200 dark:border-purple-800">
                              <div className="flex items-center justify-center gap-1 mb-1">
                                <Building2 className="w-4 h-4 text-purple-500" />
                                <span className="font-bold text-purple-700 dark:text-purple-300">{item.bedrooms}</span>
                              </div>
                              <div className="text-xs text-purple-600 dark:text-purple-400">
                                Kamar tidur
                              </div>
                            </div>
                          </div>
                          
                          {/* Notes Section */}
                          {item.notes && (
                            <div className="mb-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                              <div className="flex items-start gap-2">
                                <div className="w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-white text-xs font-bold">!</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-1">Catatan Pribadi</p>
                                  <p className="text-sm text-orange-700 dark:text-orange-300 line-clamp-2">
                                    {item.notes}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Added Date */}
                          <div className="mb-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                              <span>Ditambahkan {formatDate(item.addedAt)}</span>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button asChild size="sm" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium flex-1">
                              <Link to={`/villas/${item.propertyId}`}>
                                <span className="hidden sm:inline">Lihat Detail</span>
                                <span className="sm:hidden">Detail</span>
                              </Link>
                            </Button>
                            
                            {currentFolder && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveFromWishlist(item.id, currentFolder.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20 flex-1"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">Hapus dari Wishlist</span>
                                <span className="sm:hidden">Hapus</span>
                              </Button>
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
      </div>
    </div>
  );
};

export default WishlistSystem;
