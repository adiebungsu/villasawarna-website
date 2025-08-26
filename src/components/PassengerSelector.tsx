import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Bus, Navigation, Users, Info, CheckCircle2 } from 'lucide-react';

interface PassengerOption {
  id: string;
  range: string;
  type: string;
  description: string;
  icon: JSX.Element;
  bgColor: string;
  borderColor: string;
}

interface VehicleRecommendation {
  name: string;
  type: string;
  description: string;
  image: string;
  capacity: string;
  price: string;
  features: string[];
  specs: {
    seats: string;
    engine: string;
    luggage: string;
    transmission: string;
  };
}

const PassengerSelector = () => {
  const [selectedPassenger, setSelectedPassenger] = useState<string>('1-2');

  const passengerOptions: PassengerOption[] = [
    {
      id: '1-2',
      range: '1-2 orang',
      type: 'Perjalanan Pasangan/Romantic',
      description: 'Cocok untuk pasangan yang ingin perjalanan romantis ke Sawarna',
      icon: <Users className="w-5 h-5" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: '3-4',
      range: '3-4 orang',
      type: 'Keluarga Kecil',
      description: 'Ideal untuk keluarga kecil dengan anak-anak',
      icon: <Users className="w-5 h-5" />,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: '5-6',
      range: '5-6 orang',
      type: 'Keluarga Besar',
      description: 'Untuk keluarga besar atau grup teman',
      icon: <Users className="w-5 h-5" />,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: '7-8',
      range: '7-8 orang',
      type: 'Group Travel',
      description: 'Grup kecil untuk perjalanan bersama',
      icon: <Users className="w-5 h-5" />,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: '9-15',
      range: '9-15 orang',
      type: 'Group Besar',
      description: 'Grup besar untuk acara atau tour',
      icon: <Users className="w-5 h-5" />,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: '16-25',
      range: '16-25 orang',
      type: 'Group Sangat Besar',
      description: 'Untuk acara perusahaan atau rombongan besar',
      icon: <Users className="w-5 h-5" />,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: '26-45',
      range: '26-45 orang',
      type: 'Group Massal',
      description: 'Untuk acara besar atau tour massal',
      icon: <Users className="w-5 h-5" />,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: '38-48',
      range: '38-48 orang',
      type: 'Big Bus',
      description: 'Untuk acara perusahaan besar atau tour massal',
      icon: <Bus className="w-5 h-5" />,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    },
    {
      id: '48-52',
      range: '48-52 orang',
      type: 'Bus SHD',
      description: 'Untuk acara sangat besar atau tour massal premium',
      icon: <Bus className="w-5 h-5" />,
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

     const vehicleRecommendations: Record<string, VehicleRecommendation> = {
          '1-2': {
        name: 'Honda Scoopy / Yamaha Nmax',
        type: 'Scooter Premium',
        description: 'Kendaraan ekonomis dan fleksibel untuk eksplorasi Sawarna. Cocok untuk pasangan yang ingin perjalanan romantis dengan budget terbatas.',
        image: '/images/transport/sewa motor/sewa-motor-scoopy-768x474.png',
        capacity: '2 Penumpang',
        price: 'Rp 200.000/hari',
        features: ['Bensin Penuh', 'Helm Standar', 'Mudah Parkir', 'Efisien BBM'],
        specs: {
          seats: '2 Kursi',
          engine: '110-155cc',
          luggage: 'Bagasi 20L',
          transmission: 'Automatic'
        }
      },
                   '3-4': {
        name: 'Honda Brio / Honda Jazz',
        type: 'City Car',
        description: 'Mobil kompak yang nyaman untuk keluarga kecil. Mudah parkir dan efisien bahan bakar.',
        image: '/images/transport/sewa mobil/Rental-Xpander.webp',
        capacity: '4-5 Penumpang',
        price: 'Rp 600.000/hari',
        features: ['AC Dingin', 'Efisien BBM', 'Mudah Parkir', 'Bagasi Fleksibel'],
        specs: {
          seats: '5 Kursi (2+3)',
          engine: '1.2L-1.5L',
          luggage: 'Bagasi 200L',
          transmission: 'Manual/AT'
        }
      },
                   '5-6': {
        name: 'Toyota Avanza / Daihatsu Xenia',
        type: 'MPV Kecil',
        description: 'Kendaraan ekonomis dengan kapasitas 7 penumpang. Cocok untuk keluarga kecil atau grup backpacker dengan budget terbatas.',
        image: '/images/transport/sewa mobil/Rental-Avanza.webp',
        capacity: '7 Penumpang',
        price: 'Rp 750.000/hari',
        features: ['AC Dingin', 'Audio System', 'Kursi Nyaman', 'Bagasi Luas'],
        specs: {
          seats: '7 Kursi (2+2+3)',
          engine: 'Bensin 1.3L',
          luggage: 'Bagasi 200L',
          transmission: 'Manual/AT'
        }
      },
                   '7-8': {
        name: 'Honda Mobilio / Suzuki Ertiga',
        type: 'MPV Menengah',
        description: 'MPV yang nyaman untuk grup kecil dengan bagasi yang cukup luas.',
        image: '/images/transport/sewa mobil/Rental-Innova.webp',
        capacity: '7-8 Penumpang',
        price: 'Rp 800.000/hari',
        features: ['AC Dingin', 'MPV Nyaman', 'Bagasi Luas', 'Kursi Fleksibel'],
        specs: {
          seats: '8 Kursi (2+3+3)',
          engine: 'Bensin 1.5L',
          luggage: 'Bagasi 300L',
          transmission: 'Manual/AT'
        }
      },
                   '9-15': {
        name: 'Toyota Hiace / Daihatsu Gran Max',
        type: 'Minibus',
        description: 'Minibus yang nyaman untuk grup besar dengan fasilitas lengkap.',
        image: '/images/transport/sewa bus/sewa-hiace-768x474.png',
        capacity: '12-15 Penumpang',
        price: 'Rp 1.500.000/hari',
        features: ['AC Dingin', 'Reclining Seat', 'Bagasi Luas', 'Audio System'],
        specs: {
          seats: '15 Kursi (2+2+2+2+2+2+3)',
          engine: 'Diesel 2.5L',
          luggage: 'Bagasi 500L',
          transmission: 'Manual'
        }
      },
                   '16-25': {
        name: 'Medium Bus / Elf Long',
        type: 'Bus Menengah',
        description: 'Bus menengah untuk rombongan besar dengan fasilitas lengkap.',
        image: '/images/transport/sewa bus/sewa-medium-bus-768x474.png',
        capacity: '25 Penumpang',
        price: 'Hubungi Kami',
        features: ['AC Dingin', 'Mic + Audio', 'Bagasi Besar', 'Toilet'],
        specs: {
          seats: '25 Kursi',
          engine: 'Diesel 4.0L',
          luggage: 'Bagasi 1000L',
          transmission: 'Manual'
        }
      },
                                       '26-45': {
         name: 'Big Bus / Bus Pariwisata',
         type: 'Bus Besar',
         description: 'Bus besar untuk acara massal dengan fasilitas premium.',
         image: '/images/transport/sewa bus/sewa-big-bus-768x474.png',
         capacity: '45 Penumpang',
         price: 'Hubungi Kami',
         features: ['AC Dingin', 'Mic + Audio', 'Bagasi Besar', 'Toilet + WiFi'],
         specs: {
           seats: '45 Kursi',
           engine: 'Diesel 6.0L',
           luggage: 'Bagasi 2000L',
           transmission: 'Manual'
         }
       },
                        '38-48': {
         name: 'Big Bus Premium',
         type: 'Bus Besar Premium',
         description: 'Bus besar premium untuk acara perusahaan besar dengan fasilitas lengkap dan kenyamanan maksimal.',
         image: '/images/transport/sewa bus/sewa-big-bus-768x474.png',
         capacity: '48 Penumpang',
         price: 'Hubungi Kami',
         features: ['AC Dingin', 'Mic + Audio', 'Bagasi Besar', 'Toilet + WiFi + Reclining Seat'],
         specs: {
           seats: '48 Kursi (2+2)',
           engine: 'Diesel 7.0L',
           luggage: 'Bagasi 2500L',
           transmission: 'Manual'
         }
       },
                        '48-52': {
         name: 'Bus SHD Premium',
         type: 'Bus SHD',
         description: 'Bus SHD premium untuk acara sangat besar dengan fasilitas terbaik dan kapasitas maksimal.',
         image: '/images/transport/sewa bus/sewa-bus-SHD-768x474.png',
         capacity: '52 Penumpang',
         price: 'Hubungi Kami',
         features: ['AC Dingin', 'Mic + Audio', 'Bagasi Besar', 'Toilet + WiFi + Reclining Seat + TV'],
         specs: {
           seats: '52 Kursi (2+2)',
           engine: 'Diesel 8.0L',
           luggage: 'Bagasi 3000L',
           transmission: 'Manual'
         }
       }
  };

  const currentRecommendation = vehicleRecommendations[selectedPassenger];
  const currentOption = passengerOptions.find(opt => opt.id === selectedPassenger);

  return (
    <div className="space-y-8">
             {/* Passenger Selection Grid */}
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {passengerOptions.map((option) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedPassenger === option.id
                ? 'bg-blue-50 border-blue-300 shadow-md'
                : 'bg-white border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedPassenger(option.id)}
          >
            <CardContent className="p-4 text-center">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${
                selectedPassenger === option.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {option.icon}
              </div>
              <div className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                {option.range}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {option.type}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Vehicle Recommendation */}
      {currentRecommendation && currentOption && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Rekomendasi untuk {currentOption.type}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {currentOption.description}
            </p>
          </div>

          {/* Why This Recommendation */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Mengapa rekomendasi ini?
                </div>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  {currentRecommendation.description}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Card */}
          <Card className="border border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                             {/* Vehicle Image */}
               <div className="relative h-64 lg:h-full bg-gray-200 dark:bg-gray-700 rounded-t-lg lg:rounded-l-lg lg:rounded-t-none overflow-hidden">
                 {currentRecommendation.image ? (
                   <img 
                     src={currentRecommendation.image} 
                     alt={currentRecommendation.name}
                     className="w-full h-full object-cover"
                     onError={(e) => {
                       const target = e.target as HTMLImageElement;
                       target.style.display = 'none';
                       target.nextElementSibling?.classList.remove('hidden');
                     }}
                   />
                 ) : null}
                 <div className={`absolute inset-0 flex items-center justify-center ${currentRecommendation.image ? 'hidden' : ''}`}>
                   <div className="text-center text-gray-500 dark:text-gray-400">
                     {currentRecommendation.type.includes('Scooter') || currentRecommendation.type.includes('Motor') ? (
                       <Navigation className="w-16 h-16 mx-auto mb-2" />
                     ) : currentRecommendation.type.includes('Bus') ? (
                       <Bus className="w-16 h-16 mx-auto mb-2" />
                     ) : (
                       <Car className="w-16 h-16 mx-auto mb-2" />
                     )}
                     <div className="text-sm">{currentRecommendation.name}</div>
                   </div>
                 </div>
               </div>

              {/* Vehicle Details */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {currentRecommendation.name}
                  </h4>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {currentRecommendation.type}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Kapasitas</div>
                      <div className="text-gray-600 dark:text-gray-400">{currentRecommendation.capacity}</div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Harga</div>
                      <div className="text-ocean dark:text-ocean-light font-semibold">{currentRecommendation.price}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white mb-2">Fitur Utama</div>
                    <div className="grid grid-cols-2 gap-2">
                      {currentRecommendation.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specs */}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white mb-2">Spesifikasi Teknis</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Kursi:</span>
                        <span className="text-gray-900 dark:text-white">{currentRecommendation.specs.seats}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Mesin:</span>
                        <span className="text-gray-900 dark:text-white">{currentRecommendation.specs.engine}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Bagasi:</span>
                        <span className="text-gray-900 dark:text-white">{currentRecommendation.specs.luggage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Transmisi:</span>
                        <span className="text-gray-900 dark:text-white">{currentRecommendation.specs.transmission}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" className="flex-1">
                      Lihat Detail
                    </Button>
                    <Button className="flex-1 bg-ocean hover:bg-ocean/90">
                      Pilih
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PassengerSelector;
