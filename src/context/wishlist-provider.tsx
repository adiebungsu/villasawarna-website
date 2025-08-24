import React, { useState, useEffect, ReactNode } from 'react';
import { WishlistContext, WishlistContextType, WishlistFolder, WishlistItem } from './wishlist-context-helpers';
import { useAuth } from './use-auth';
import { toast } from '@/components/ui/use-toast';

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [wishlistFolders, setWishlistFolders] = useState<WishlistFolder[]>([]);

  // Load wishlist data from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        try {
          setWishlistFolders(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('Error loading wishlist:', error);
        }
      } else {
        // Initialize with default folder if no saved data
        const defaultFolder: WishlistFolder = {
          id: '1',
          name: 'Favorit Saya',
          description: 'Properti favorit yang ingin dikunjungi',
          items: [],
          isPublic: false,
          createdAt: new Date().toISOString()
        };
        setWishlistFolders([defaultFolder]);
      }
    } else {
      setWishlistFolders([]);
    }
  }, [user]);

  // Save wishlist data to localStorage whenever it changes
  useEffect(() => {
    if (user && wishlistFolders.length > 0) {
      localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(wishlistFolders));
    }
  }, [wishlistFolders, user]);

  const addToWishlist = (propertyId: string, propertyData: Omit<WishlistItem, 'id' | 'addedAt'>) => {
    if (!user) {
      toast({
        title: "Login Diperlukan",
        description: "Silakan login terlebih dahulu untuk menambahkan ke wishlist.",
        variant: "destructive"
      });
      return;
    }

    // Check if property already exists in any folder
    const existingItem = wishlistFolders.some(folder => 
      folder.items.some(item => item.propertyId === propertyId)
    );

    if (existingItem) {
      toast({
        title: "Sudah Ada di Wishlist",
        description: "Properti ini sudah ada di wishlist Anda.",
        variant: "destructive"
      });
      return;
    }

    // Add to first folder (default folder)
    const newItem: WishlistItem = {
      ...propertyData,
      id: Date.now().toString(),
      addedAt: new Date().toISOString()
    };

    setWishlistFolders(prev => prev.map(folder => 
      folder.id === '1' 
        ? { ...folder, items: [...folder.items, newItem] }
        : folder
    ));

    toast({
      title: "Berhasil Ditambahkan",
      description: `${propertyData.propertyName} telah ditambahkan ke wishlist.`,
    });
  };

  const removeFromWishlist = (propertyId: string) => {
    setWishlistFolders(prev => prev.map(folder => ({
      ...folder,
      items: folder.items.filter(item => item.propertyId !== propertyId)
    })));

    toast({
      title: "Berhasil Dihapus",
      description: "Properti telah dihapus dari wishlist.",
    });
  };

  const isInWishlist = (propertyId: string): boolean => {
    return wishlistFolders.some(folder => 
      folder.items.some(item => item.propertyId === propertyId)
    );
  };

  const getWishlistItem = (propertyId: string): WishlistItem | null => {
    for (const folder of wishlistFolders) {
      const item = folder.items.find(item => item.propertyId === propertyId);
      if (item) return item;
    }
    return null;
  };

  const contextValue: WishlistContextType = {
    wishlistFolders,
    setWishlistFolders,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getWishlistItem
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};
