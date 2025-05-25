import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  X,
  Loader2,
  MapPin,
  Image as ImageIcon,
  Plus,
  Trash2,
  Wifi,
  Tv,
  AirVent,
  Coffee,
  Utensils,
  Car,
  Dumbbell,
  Waves,
  Sun,
  Moon,
  Shield,
  Key,
  Bell,
  Camera,
  Video,
  Music,
  BookOpen,
  Gamepad2,
  Baby,
  PawPrint,
  Sparkles,
  Wind,
  Droplets,
  Snowflake,
  Flame,
  Drill,
  SunDim,
  MoonStar,
  ArrowLeft,
  Bath,
  BedDouble,
  Users,
  Home,
  Building2,
  Mountain,
  Trees,
  Umbrella,
  Lock,
  Phone,
  Printer,
  Projector,
  Speaker,
  Gamepad,
  Book,
  Sofa,
  Table,
  Lamp,
  Stars,
  Dog,
  Cat,
  Plane,
  Star,
  Heart
} from 'lucide-react';
import SEO from '@/components/SEO';
import RichTextEditor from '@/components/RichTextEditor';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/ui/loading-spinner';
import ErrorMessage from '@/components/ui/error-message';
import { debounce } from 'lodash';

interface RoomImage {
  url: string;
  alt: string;
}

interface RoomImages {
  [key: string]: {
    images: RoomImage[];
    tab: string;
  };
}

// Tambahkan ke schema validasi
const validateImageUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Tambahkan ke schema validasi
const propertySchema = z.object({
  name: z.string().min(1, 'Nama properti harus diisi'),
  type: z.enum(['villa', 'homestay']),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  location: z.string().min(1, 'Lokasi harus diisi'),
  price: z.number().min(1, 'Harga harus lebih dari 0'),
  capacity: z.number().min(1, 'Kapasitas harus lebih dari 0'),
  bedrooms: z.number().min(1, 'Jumlah kamar tidur harus lebih dari 0'),
  bathrooms: z.number().min(1, 'Jumlah kamar mandi harus lebih dari 0'),
  amenities: z.array(z.string()),
  images: z.object({
    main: z.array(z.object({
      url: z.string().refine(validateImageUrl, {
        message: 'URL gambar tidak valid'
      }),
      alt: z.string()
    })).min(1, 'Minimal harus ada 1 gambar utama'),
    rooms: z.record(z.object({
      images: z.array(z.object({
        url: z.string().refine(validateImageUrl, {
          message: 'URL gambar tidak valid'
        }),
        alt: z.string()
      })),
      tab: z.string()
    })),
    amenities: z.array(z.object({
      url: z.string().refine(validateImageUrl, {
        message: 'URL gambar tidak valid'
      }),
      alt: z.string()
    })),
    surroundings: z.array(z.object({
      url: z.string().refine(validateImageUrl, {
        message: 'URL gambar tidak valid'
      }),
      alt: z.string()
    }))
  }),
  status: z.enum(['published', 'draft']),
  featured: z.boolean(),
  instantBooking: z.boolean(),
  allowReviews: z.boolean(),
  checkInTime: z.string(),
  checkOutTime: z.string(),
  minStay: z.number().min(1, 'Minimal menginap harus lebih dari 0'),
  maxStay: z.number().min(1, 'Maksimal menginap harus lebih dari 0'),
  cancellationPolicy: z.string(),
  houseRules: z.array(z.string()),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180)
  }).refine((value) => {
    if (value.lat < -90 || value.lat > 90) {
      return 'Latitude tidak valid';
    }
    if (value.lng < -180 || value.lng > 180) {
      return 'Longitude tidak valid';
    }
    return true;
  }, {
    message: 'Koordinat tidak valid'
  }),
  distanceToBeach: z.number().min(0, 'Jarak ke pantai tidak boleh negatif'),
  roomTypes: z.array(z.object({
    type: z.string().min(1, 'Tipe kamar harus diisi'),
    count: z.number().min(1, 'Jumlah kamar harus lebih dari 0'),
    bedType: z.string().min(1, 'Tipe tempat tidur harus diisi'),
    size: z.string().min(1, 'Ukuran kamar harus diisi'),
    tab: z.string()
  })).min(1, 'Minimal harus ada 1 tipe kamar'),
  buildingSize: z.number().min(1, 'Luas bangunan harus lebih dari 0'),
  landSize: z.number().min(1, 'Luas tanah harus lebih dari 0'),
  yearBuilt: z.number().min(1900, 'Tahun pembangunan tidak valid'),
  lastRenovation: z.number().min(1900, 'Tahun renovasi tidak valid'),
  floorCount: z.number().min(1, 'Jumlah lantai harus lebih dari 0'),
  view: z.array(z.string()),
  nearbyAttractions: z.array(z.object({
    name: z.string().min(1, 'Nama tempat harus diisi'),
    distance: z.number().min(0, 'Jarak tidak boleh negatif'),
    type: z.string().min(1, 'Tipe tempat harus diisi')
  })),
  additionalFees: z.array(z.object({
    name: z.string().min(1, 'Nama biaya harus diisi'),
    amount: z.number().min(0, 'Jumlah biaya tidak boleh negatif'),
    type: z.enum(['fixed', 'percentage']),
    description: z.string().min(1, 'Deskripsi biaya harus diisi')
  }))
});

type PropertyFormData = z.infer<typeof propertySchema>;

const PropertyEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [uploadingImages, setUploadingImages] = useState<{[key: string]: boolean}>({});
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: '',
      type: 'villa',
      description: '',
      location: '',
      price: 0,
      capacity: 0,
      bedrooms: 0,
      bathrooms: 0,
      amenities: [],
      images: {
        main: [],
        rooms: {},
        amenities: [],
        surroundings: []
      },
      status: 'draft',
      featured: false,
      instantBooking: false,
      allowReviews: true,
      checkInTime: '14:00',
      checkOutTime: '12:00',
      minStay: 1,
      maxStay: 30,
      cancellationPolicy: '',
      houseRules: [],
      coordinates: {
        lat: 0,
        lng: 0
      },
      distanceToBeach: 0,
      roomTypes: [],
      buildingSize: 0,
      landSize: 0,
      yearBuilt: 0,
      lastRenovation: 0,
      floorCount: 1,
      view: [],
      nearbyAttractions: [],
      additionalFees: []
    }
  });

  // Fungsi untuk menangani perubahan nilai numerik dengan debounce
  const handleNumericChange = useCallback(
    debounce((name: keyof PropertyFormData, value: number) => {
      const numericFields = [
        'price', 'capacity', 'bedrooms', 'bathrooms', 'minStay', 'maxStay',
        'buildingSize', 'landSize', 'yearBuilt', 'lastRenovation', 'floorCount',
        'distanceToBeach'
      ] as const;
      
      if (numericFields.includes(name as typeof numericFields[number])) {
        setValue(name, value);
      }
    }, 300),
    [setValue]
  );

  const amenities = [
    // Fasilitas Dasar
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'ac', label: 'AC', icon: Snowflake },
    { id: 'fan', label: 'Kipas Angin', icon: AirVent },
    { id: 'tv', label: 'TV', icon: Tv },
    { id: 'parking', label: 'Parkir', icon: Car },
    
    // Kamar Mandi
    { id: 'hot_water', label: 'Air Panas', icon: Waves },
    { id: 'bathroom', label: 'Kamar Mandi', icon: Bath },
    { id: 'bathtub', label: 'Bath Tub', icon: Bath },
    
    // Dapur
    { id: 'kitchen', label: 'Dapur', icon: Utensils },
    { id: 'refrigerator', label: 'Kulkas', icon: Home },
    { id: 'microwave', label: 'Microwave', icon: Home },
    { id: 'coffee', label: 'Kopi', icon: Coffee },
    { id: 'toaster', label: 'Toaster', icon: Home },
    
    // Ruang Tamu
    { id: 'sofa', label: 'Sofa', icon: Home },
    { id: 'dining_table', label: 'Meja Makan', icon: Table },
    { id: 'living_room', label: 'Ruang Tamu', icon: Home },
    
    // Fasilitas Tambahan
    { id: 'pool', label: 'Kolam Renang', icon: Waves },
    { id: 'gym', label: 'Gym', icon: Dumbbell },
    { id: 'bbq', label: 'BBQ Grill', icon: Flame },
    { id: 'garden', label: 'Taman', icon: Trees },
    { id: 'beach_access', label: 'Akses Pantai', icon: Waves },
    { id: 'mountain_view', label: 'Pemandangan Gunung', icon: Mountain },
    
    // Keamanan
    { id: 'security', label: 'Keamanan 24 Jam', icon: Shield },
    { id: 'cctv', label: 'CCTV', icon: Camera },
    { id: 'safe', label: 'Safety Box', icon: Key },
    
    // Layanan
    { id: 'housekeeping', label: 'Housekeeping', icon: Bell },
    { id: 'laundry', label: 'Laundry', icon: Home },
    { id: 'iron', label: 'Setrika', icon: Home },
    { id: 'printer', label: 'Printer', icon: Printer },
    
    // Hiburan
    { id: 'game_room', label: 'Ruang Game', icon: Gamepad2 },
    { id: 'projector', label: 'Proyektor', icon: Projector },
    { id: 'speaker', label: 'Speaker', icon: Speaker },
    { id: 'books', label: 'Perpustakaan', icon: BookOpen },
    
    // Aksesibilitas
    { id: 'elevator', label: 'Elevator', icon: Home },
    { id: 'wheelchair', label: 'Akses Kursi Roda', icon: Home },
    { id: 'stairs', label: 'Tangga', icon: Home },
    
    // Kebijakan
    { id: 'pet_friendly', label: 'Pet Friendly', icon: PawPrint },
    { id: 'smoking', label: 'Merokok Diizinkan', icon: Flame },
    { id: 'child_friendly', label: 'Ramah Anak', icon: Baby }
  ];

  const houseRules = [
    'Tidak merokok',
    'Tidak boleh membawa hewan peliharaan',
    'Tidak boleh mengadakan pesta',
    'Tidak boleh membawa tamu tambahan',
    'Harus menjaga kebersihan',
    'Harus menghemat listrik dan air'
  ];

  useEffect(() => {
    if (id) {
      // Fetch property data
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setValue('name', 'Villa Sawarna Indah');
        setValue('type', 'villa');
        setValue('description', 'Villa mewah dengan pemandangan pantai');
        setValue('location', 'Sawarna, Bayah, Lebak');
        setValue('price', 2500000);
        setValue('capacity', 8);
        setValue('bedrooms', 4);
        setValue('bathrooms', 3);
        setValue('amenities', ['wifi', 'parking', 'kitchen', 'pool']);
        setValue('images.main', [{ url: 'https://example.com/villa1.jpg', alt: 'Villa Sawarna Indah' }]);
        setValue('images.rooms', {
              Master_Bedroom: { images: [{ url: 'https://example.com/villa1.jpg', alt: 'Master Bedroom' }], tab: 'tab1' },
              Guest_Room: { images: [{ url: 'https://example.com/villa1.jpg', alt: 'Guest Room' }], tab: 'tab1' },
              Children_Room: { images: [{ url: 'https://example.com/villa1.jpg', alt: 'Children Room' }], tab: 'tab1' }
        });
        setValue('status', 'published');
        setValue('featured', true);
        setValue('instantBooking', true);
        setValue('allowReviews', true);
        setValue('checkInTime', '14:00');
        setValue('checkOutTime', '12:00');
        setValue('minStay', 1);
        setValue('maxStay', 30);
        setValue('cancellationPolicy', 'Pembatalan 24 jam sebelum check-in');
        setValue('houseRules', ['Tidak merokok', 'Tidak boleh membawa hewan peliharaan']);
        setValue('coordinates', { lat: -6.9876, lng: 106.1234 });
        setValue('distanceToBeach', 500);
        setValue('roomTypes', [
            { type: 'Master Bedroom', count: 2, bedType: 'King Size', size: '4x4 m', tab: 'tab1' },
            { type: 'Guest Room', count: 2, bedType: 'Queen Size', size: '3x4 m', tab: 'tab1' },
            { type: 'Children Room', count: 1, bedType: 'Twin Size', size: '2x3 m', tab: 'tab1' }
        ]);
        setValue('buildingSize', 200);
        setValue('landSize', 500);
        setValue('yearBuilt', 2010);
        setValue('lastRenovation', 2020);
        setValue('floorCount', 2);
        setValue('view', ['Beach', 'Mountain']);
        setValue('nearbyAttractions', [
            { name: 'Sawarna Beach', distance: 500, type: 'Beach' },
            { name: 'Bayah Waterfall', distance: 1000, type: 'Waterfall' }
        ]);
        setValue('additionalFees', [
            { name: 'Cleaning Fee', amount: 100000, type: 'fixed', description: 'Fee for cleaning the property' },
            { name: 'Security Deposit', amount: 500000, type: 'fixed', description: 'Deposit to secure the property' }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [id, setValue]);

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingImages(prev => ({ ...prev, main: true }));
    try {
      const newImages = await Promise.all(
        Array.from(files).map(async (file) => {
          if (file.size > 5 * 1024 * 1024) {
            throw new Error(`File ${file.name} terlalu besar. Maksimal 5MB`);
          }

          if (!file.type.startsWith('image/')) {
            throw new Error(`File ${file.name} bukan gambar yang valid`);
          }

          const optimizedFile = await optimizeImage(file);
          const formData = new FormData();
          formData.append('image', optimizedFile);
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Gagal mengupload gambar');
          }

          const data = await response.json();
          return {
            url: data.url,
            alt: file.name
          };
        })
      );

      setValue('images.main', [...watch('images.main'), ...newImages]);
      toast.success('Gambar berhasil diupload');
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal mengupload gambar');
    } finally {
      setUploadingImages(prev => ({ ...prev, main: false }));
    }
  };

  const optimizeImage = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1920;
          const MAX_HEIGHT = 1080;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const optimizedFile = new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now()
                });
                resolve(optimizedFile);
              } else {
                reject(new Error('Gagal mengoptimasi gambar'));
              }
            },
            'image/jpeg',
            0.8
          );
        };
        img.onerror = () => reject(new Error('Gagal memuat gambar'));
      };
      reader.onerror = () => reject(new Error('Gagal membaca file'));
    });
  };

  const handleSubmitForm = async (data: PropertyFormData) => {
    setLoading(true);
    try {
      // Validasi tambahan sebelum submit
      if (data.minStay > data.maxStay) {
        throw new Error('Minimal menginap tidak boleh lebih dari maksimal menginap');
      }

      if (data.yearBuilt > new Date().getFullYear()) {
        throw new Error('Tahun pembangunan tidak boleh lebih dari tahun sekarang');
      }

      if (data.lastRenovation > new Date().getFullYear()) {
        throw new Error('Tahun renovasi tidak boleh lebih dari tahun sekarang');
      }

      const response = await fetch(`/api/properties${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan properti');
      }

      toast.success('Properti berhasil disimpan');
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal menyimpan properti');
    } finally {
      setLoading(false);
    }
  };

  const handleRoomImageUpload = (e: React.ChangeEvent<HTMLInputElement>, roomType: string, tab: string) => {
    const files = e.target.files;
    if (files) {
      const newImages: RoomImage[] = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        alt: roomType
      }));

      setValue(`images.rooms.${roomType}.images`, [...watch(`images.rooms.${roomType}.images`) || [], ...newImages]);
    }
  };

  const handleAmenityImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        alt: file.name
      }));
      
      setValue('images.amenities', [...watch('images.amenities') || [], ...newImages]);
    }
  };

  const handleSurroundingImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        alt: file.name
      }));
      
      setValue('images.surroundings', [...watch('images.surroundings') || [], ...newImages]);
    }
  };

  const handleDeleteMainImage = (index: number) => {
    setValue('images.main', watch('images.main').filter((_, i) => i !== index));
  };

  const handleDeleteRoomImage = (roomType: string, index: number) => {
    setValue(`images.rooms.${roomType}.images`, watch(`images.rooms.${roomType}.images`).filter((_, i) => i !== index));
  };

  const handleDeleteAmenityImage = (index: number) => {
    setValue('images.amenities', watch('images.amenities').filter((_, i) => i !== index));
  };

  const handleDeleteSurroundingImage = (index: number) => {
    setValue('images.surroundings', watch('images.surroundings').filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenityId: string) => {
    setValue('amenities', watch('amenities').includes(amenityId)
      ? watch('amenities').filter(id => id !== amenityId)
      : [...watch('amenities'), amenityId]);
  };

  const toggleHouseRule = (rule: string) => {
    setValue('houseRules', watch('houseRules').includes(rule)
      ? watch('houseRules').filter(r => r !== rule)
      : [...watch('houseRules'), rule]);
  };

  const handleAddRoomType = () => {
    setValue('roomTypes', [
      ...watch('roomTypes'),
        { type: '', count: 1, bedType: '', size: '', tab: 'tab1' }
    ]);
  };

  const handleRoomTabChange = (roomType: string, newTab: string) => {
    setValue(`images.rooms.${roomType}.tab`, newTab);
  };

  const handleAddImageByUrl = (url: string, alt: string, category: 'main' | 'rooms' | 'amenities' | 'surroundings', roomType?: string, tab?: string) => {
    const newImage = { url, alt };

      if (category === 'main') {
      setValue('images.main', [...watch('images.main'), newImage]);
      } else if (category === 'rooms' && roomType && tab) {
      const currentImages = watch(`images.rooms.${roomType}.images`) || [];
      setValue(`images.rooms.${roomType}.images`, [...currentImages, newImage]);
      setValue(`images.rooms.${roomType}.tab`, tab);
      } else if (category === 'amenities') {
      setValue('images.amenities', [...watch('images.amenities'), newImage]);
      } else if (category === 'surroundings') {
      setValue('images.surroundings', [...watch('images.surroundings'), newImage]);
    }
  };

  const handleCancel = () => {
    if (Object.keys(errors).length > 0 || watch('name') !== '') {
      setShowConfirmDialog(true);
    } else {
      navigate('/admin/properties');
    }
  };

  const handleConfirmCancel = () => {
    setShowConfirmDialog(false);
    navigate('/admin/properties');
  };

  // Tambahkan keyboard navigation untuk form
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          (submitButton as HTMLButtonElement).click();
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          text="Memuat data properti..." 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage
          title="Gagal Memuat Data"
          message={error}
          variant="destructive"
          onDismiss={() => setError(null)}
        />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={id ? "Edit Properti" : "Tambah Properti Baru"}
        description="Panel admin untuk mengelola properti Villa Sawarna"
      />
      
      <div className="container-custom py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">
            {id ? "Edit Properti" : "Tambah Properti Baru"}
          </h1>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-red-800 font-medium mb-2">Terdapat kesalahan pada form:</h3>
            <ul className="list-disc list-inside text-red-600">
              {Object.entries(errors).map(([key, error]) => (
                <li key={key}>{error.message}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-6">
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
              <TabsTrigger value="details">Detail & Fasilitas</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="settings">Pengaturan</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Properti</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Masukkan nama properti"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipe Properti</Label>
                      <Select
                        onValueChange={(value) => setValue('type', value as 'villa' | 'homestay')}
                        defaultValue={watch('type')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tipe properti" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="homestay">Homestay</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.type && (
                        <p className="text-sm text-red-500">{errors.type.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <RichTextEditor
                      content={watch('description')}
                      onChange={(content) => setValue('description', content)}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi</Label>
                    <div className="flex gap-2">
                      <Input
                        id="location"
                        {...register('location')}
                        placeholder="Masukkan lokasi properti"
                      />
                      <Button type="button" variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        Pilih di Peta
                      </Button>
                    </div>
                    {errors.location && (
                      <p className="text-sm text-red-500">{errors.location.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Harga per Malam</Label>
                      <Input
                        id="price"
                        type="number"
                        {...register('price', { valueAsNumber: true })}
                        placeholder="Masukkan harga"
                        onChange={(e) => handleNumericChange('price', Number(e.target.value))}
                      />
                      {errors.price && (
                        <p className="text-sm text-red-500">{errors.price.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Kapasitas</Label>
                      <Input
                        id="capacity"
                        type="number"
                        {...register('capacity', { valueAsNumber: true })}
                        placeholder="Jumlah tamu"
                        onChange={(e) => handleNumericChange('capacity', Number(e.target.value))}
                      />
                      {errors.capacity && (
                        <p className="text-sm text-red-500">{errors.capacity.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Kamar Tidur</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        {...register('bedrooms', { valueAsNumber: true })}
                        placeholder="Jumlah kamar"
                        onChange={(e) => handleNumericChange('bedrooms', Number(e.target.value))}
                      />
                      {errors.bedrooms && (
                        <p className="text-sm text-red-500">{errors.bedrooms.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Kamar Mandi</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        {...register('bathrooms', { valueAsNumber: true })}
                        placeholder="Jumlah kamar mandi"
                        onChange={(e) => handleNumericChange('bathrooms', Number(e.target.value))}
                      />
                      {errors.bathrooms && (
                        <p className="text-sm text-red-500">{errors.bathrooms.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Detail & Fasilitas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buildingSize">Luas Bangunan</Label>
                      <Input
                        id="buildingSize"
                        type="number"
                        {...register('buildingSize', { valueAsNumber: true })}
                        placeholder="Luas dalam m²"
                        onChange={(e) => handleNumericChange('buildingSize', Number(e.target.value))}
                      />
                      {errors.buildingSize && (
                        <p className="text-sm text-red-500">{errors.buildingSize.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="landSize">Luas Tanah</Label>
                      <Input
                        id="landSize"
                        type="number"
                        {...register('landSize', { valueAsNumber: true })}
                        placeholder="Luas dalam m²"
                        onChange={(e) => handleNumericChange('landSize', Number(e.target.value))}
                      />
                      {errors.landSize && (
                        <p className="text-sm text-red-500">{errors.landSize.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yearBuilt">Tahun Dibangun</Label>
                      <Input
                        id="yearBuilt"
                        type="number"
                        {...register('yearBuilt', { 
                          valueAsNumber: true,
                          min: { value: 1900, message: 'Tahun tidak valid' },
                          max: { value: new Date().getFullYear(), message: 'Tahun tidak valid' }
                        })}
                        placeholder="Tahun pembangunan"
                        onChange={(e) => handleNumericChange('yearBuilt', Number(e.target.value))}
                      />
                      {errors.yearBuilt && (
                        <p className="text-sm text-red-500">{errors.yearBuilt.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastRenovation">Renovasi Terakhir</Label>
                      <Input
                        id="lastRenovation"
                        type="number"
                        {...register('lastRenovation', {
                          valueAsNumber: true,
                          min: { value: 1900, message: 'Tahun tidak valid' },
                          max: { value: new Date().getFullYear(), message: 'Tahun tidak valid' }
                        })}
                        placeholder="Tahun renovasi"
                        onChange={(e) => handleNumericChange('lastRenovation', Number(e.target.value))}
                      />
                      {errors.lastRenovation && (
                        <p className="text-sm text-red-500">{errors.lastRenovation.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="floorCount">Jumlah Lantai</Label>
                      <Input
                        id="floorCount"
                        type="number"
                        {...register('floorCount', { valueAsNumber: true })}
                        placeholder="Jumlah lantai"
                        onChange={(e) => handleNumericChange('floorCount', Number(e.target.value))}
                      />
                      {errors.floorCount && (
                        <p className="text-sm text-red-500">{errors.floorCount.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="distanceToBeach">Jarak ke Pantai</Label>
                      <Input
                        id="distanceToBeach"
                        type="number"
                        {...register('distanceToBeach', { valueAsNumber: true })}
                        placeholder="Jarak dalam meter"
                        onChange={(e) => handleNumericChange('distanceToBeach', Number(e.target.value))}
                      />
                      {errors.distanceToBeach && (
                        <p className="text-sm text-red-500">{errors.distanceToBeach.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Pemandangan</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Pantai', 'Gunung', 'Kota', 'Taman', 'Kolam Renang', 'Laut'].map((view) => (
                        <div
                          key={view}
                          className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                            watch('view').includes(view)
                              ? 'bg-primary/10 border-primary'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            setValue('view', watch('view').includes(view)
                              ? watch('view').filter(v => v !== view)
                              : [...watch('view'), view]
                            );
                          }}
                        >
                          <span>{view}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Fasilitas</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {amenities.map((amenity) => {
                        const Icon = amenity.icon;
                        return (
                          <div
                            key={amenity.id}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                              watch('amenities').includes(amenity.id)
                                ? 'bg-primary/10 border-primary'
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => toggleAmenity(amenity.id)}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{amenity.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Aturan Rumah</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {houseRules.map((rule) => (
                        <div
                          key={rule}
                          className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                            watch('houseRules').includes(rule)
                              ? 'bg-primary/10 border-primary'
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => toggleHouseRule(rule)}
                        >
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="checkInTime">Waktu Check-in</Label>
                      <Input
                        id="checkInTime"
                        type="time"
                        {...register('checkInTime', {
                          required: 'Waktu check-in harus diisi'
                        })}
                      />
                      {errors.checkInTime && (
                        <p className="text-sm text-red-500">{errors.checkInTime.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="checkOutTime">Waktu Check-out</Label>
                      <Input
                        id="checkOutTime"
                        type="time"
                        {...register('checkOutTime', {
                          required: 'Waktu check-out harus diisi'
                        })}
                      />
                      {errors.checkOutTime && (
                        <p className="text-sm text-red-500">{errors.checkOutTime.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minStay">Minimal Menginap</Label>
                      <Input
                        id="minStay"
                        type="number"
                        {...register('minStay', {
                          valueAsNumber: true,
                          min: { value: 1, message: 'Minimal 1 hari' },
                          validate: (value) => {
                            const maxStay = watch('maxStay');
                            return value <= maxStay || 'Minimal menginap tidak boleh lebih dari maksimal menginap';
                          }
                        })}
                        placeholder="Minimal hari menginap"
                        onChange={(e) => handleNumericChange('minStay', Number(e.target.value))}
                      />
                      {errors.minStay && (
                        <p className="text-sm text-red-500">{errors.minStay.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxStay">Maksimal Menginap</Label>
                      <Input
                        id="maxStay"
                        type="number"
                        {...register('maxStay', {
                          valueAsNumber: true,
                          min: { value: 1, message: 'Minimal 1 hari' },
                          validate: (value) => {
                            const minStay = watch('minStay');
                            return value >= minStay || 'Maksimal menginap tidak boleh kurang dari minimal menginap';
                          }
                        })}
                        placeholder="Maksimal hari menginap"
                        onChange={(e) => handleNumericChange('maxStay', Number(e.target.value))}
                      />
                      {errors.maxStay && (
                        <p className="text-sm text-red-500">{errors.maxStay.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cancellationPolicy">Kebijakan Pembatalan</Label>
                    <Textarea
                      id="cancellationPolicy"
                      {...register('cancellationPolicy', {
                        required: 'Kebijakan pembatalan harus diisi'
                      })}
                      placeholder="Masukkan kebijakan pembatalan"
                      rows={3}
                    />
                    {errors.cancellationPolicy && (
                      <p className="text-sm text-red-500">{errors.cancellationPolicy.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Galeri Foto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Gambar Utama */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Gambar Utama</h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Masukkan URL gambar"
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement;
                              if (input.value) {
                                const newImage = { url: input.value, alt: 'Gambar Utama' };
                                setValue('images.main', [...watch('images.main'), newImage]);
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input.value) {
                              const newImage = { url: input.value, alt: 'Gambar Utama' };
                              setValue('images.main', [...watch('images.main'), newImage]);
                              input.value = '';
                            }
                          }}
                        >
                          Tambah URL
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {watch('images.main').map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleDeleteMainImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <label className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 ${
                          uploadingImages.main ? 'opacity-50 cursor-not-allowed' : ''
                        }`}>
                          {uploadingImages.main ? (
                            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                          ) : (
                            <>
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">Tambah Foto Utama</span>
                            </>
                          )}
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleMainImageUpload}
                            disabled={uploadingImages.main}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Gambar Tipe Kamar */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Gambar Tipe Kamar</h3>
                    {watch('roomTypes').map((room, index) => (
                      <div key={index} className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">{room.type}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Tab: {room.tab}</span>
                            <Select
                              value={room.tab}
                              onValueChange={(value) => handleRoomTabChange(room.type, value)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Pilih Tab" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tab1">Tab 1</SelectItem>
                                <SelectItem value="tab2">Tab 2</SelectItem>
                                <SelectItem value="tab3">Tab 3</SelectItem>
                                <SelectItem value="tab4">Tab 4</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Masukkan URL gambar"
                              className="flex-1"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  const input = e.target as HTMLInputElement;
                                  if (input.value) {
                                    const newImage = { url: input.value, alt: room.type };
                                    setValue(`images.rooms.${room.type}.images`, [...watch(`images.rooms.${room.type}.images`) || [], newImage]);
                                    input.value = '';
                                  }
                                }
                              }}
                            />
                            <Button
                              type="button"
                              onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (input.value) {
                                  const newImage = { url: input.value, alt: room.type };
                                  setValue(`images.rooms.${room.type}.images`, [...watch(`images.rooms.${room.type}.images`) || [], newImage]);
                                  input.value = '';
                                }
                              }}
                            >
                              Tambah URL
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(watch(`images.rooms.${room.type}.images`) || []).map((image, imgIndex) => (
                              <div key={imgIndex} className="relative group">
                                <img
                                  src={image.url}
                                  alt={image.alt}
                                  className="w-full h-32 object-cover rounded-lg"
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => handleDeleteRoomImage(room.type, imgIndex)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                              <ImageIcon className="h-8 w-8 text-gray-400" />
                              <span className="mt-2 text-sm text-gray-500">Tambah Foto {room.type}</span>
                              <input
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleRoomImageUpload(e, room.type, room.tab)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Gambar Fasilitas */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Gambar Fasilitas</h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Masukkan URL gambar"
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement;
                              if (input.value) {
                                const newImage = { url: input.value, alt: 'Fasilitas' };
                                setValue('images.amenities', [...watch('images.amenities'), newImage]);
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input.value) {
                              const newImage = { url: input.value, alt: 'Fasilitas' };
                              setValue('images.amenities', [...watch('images.amenities'), newImage]);
                              input.value = '';
                            }
                          }}
                        >
                          Tambah URL
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {watch('images.amenities').map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleDeleteAmenityImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">Tambah Foto Fasilitas</span>
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleAmenityImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Gambar Lingkungan */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Gambar Lingkungan</h3>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Masukkan URL gambar"
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const input = e.target as HTMLInputElement;
                              if (input.value) {
                                const newImage = { url: input.value, alt: 'Sekitar' };
                                setValue('images.surroundings', [...watch('images.surroundings'), newImage]);
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <Button
                          type="button"
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            if (input.value) {
                              const newImage = { url: input.value, alt: 'Sekitar' };
                              setValue('images.surroundings', [...watch('images.surroundings'), newImage]);
                              input.value = '';
                            }
                          }}
                        >
                          Tambah URL
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {watch('images.surroundings').map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleDeleteSurroundingImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                          <ImageIcon className="h-8 w-8 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">Tambah Foto Sekitar</span>
                          <input
                            type="file"
                            className="hidden"
                            multiple
                            accept="image/*"
                            onChange={handleSurroundingImageUpload}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Status Publikasi</Label>
                      <p className="text-sm text-muted-foreground">
                        Tampilkan properti di website
                      </p>
                    </div>
                    <Switch
                      checked={watch('status') === 'published'}
                      onCheckedChange={(checked) =>
                        setValue('status', checked ? 'published' : 'draft')
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Properti Unggulan</Label>
                      <p className="text-sm text-muted-foreground">
                        Tampilkan di halaman utama
                      </p>
                    </div>
                    <Switch
                      checked={watch('featured')}
                      onCheckedChange={(checked) =>
                        setValue('featured', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Booking Instan</Label>
                      <p className="text-sm text-muted-foreground">
                        Izinkan booking tanpa konfirmasi
                      </p>
                    </div>
                    <Switch
                      checked={watch('instantBooking')}
                      onCheckedChange={(checked) =>
                        setValue('instantBooking', checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Izinkan Review</Label>
                      <p className="text-sm text-muted-foreground">
                        Izinkan tamu memberikan ulasan
                      </p>
                    </div>
                    <Switch
                      checked={watch('allowReviews')}
                      onCheckedChange={(checked) =>
                        setValue('allowReviews', checked)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </Button>
          </div>
        </form>

        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Konfirmasi Pembatalan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin keluar?
                </p>
              </CardContent>
              <div className="flex justify-end gap-4 p-6">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmDialog(false)}
                >
                  Kembali
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleConfirmCancel}
                >
                  Keluar
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyEditor; 