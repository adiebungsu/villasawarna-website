import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getVillasData } from '@/data/properties';
import { propertyRoomTypes } from '@/data/roomTypes';
import VillaSchema from '@/components/VillaSchema';
import OptimizedImage from '@/components/OptimizedImage';
import { Property } from '@/types';

const VillaDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const villasData = getVillasData();
  const villa = villasData.find(v => v.id === id) as Property;
  const roomTypes = propertyRoomTypes[id as string] || [];

  if (!villa) {
    return <div>Villa tidak ditemukan</div>;
  }

  // Format harga untuk meta description
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(villa.price);

  return (
    <>
      <Head>
        <title>{`${villa.name} - Villa Terbaik di ${villa.location}`}</title>
        <meta name="description" content={`${villa.name} di ${villa.location}. ${villa.description.substring(0, 150)}... Harga mulai ${formattedPrice}. Rating ${villa.rating} dari ${villa.reviews} review.`} />
        <meta name="keywords" content={`${villa.name}, villa sawarna, penginapan sawarna, ${villa.location}, villa murah sawarna`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${villa.name} - Villa Terbaik di ${villa.location}`} />
        <meta property="og:description" content={`${villa.name} di ${villa.location}. ${villa.description.substring(0, 150)}...`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://villasawarna.com/villas/${villa.id}`} />
        <meta property="og:image" content={villa.mainImages[0]} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${villa.name} - Villa Terbaik di ${villa.location}`} />
        <meta name="twitter:description" content={`${villa.name} di ${villa.location}. ${villa.description.substring(0, 150)}...`} />
        <meta name="twitter:image" content={villa.mainImages[0]} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://villasawarna.com/villas/${villa.id}`} />
      </Head>

      {/* Schema Markup */}
      <VillaSchema
        name={villa.name}
        description={villa.description}
        image={villa.mainImages[0]}
        price={villa.price}
        rating={villa.rating}
        reviewCount={villa.reviews}
        address={villa.location}
        amenities={villa.amenities}
        roomTypes={roomTypes.map(room => ({
          name: room.name,
          price: room.price,
          capacity: room.capacity
        }))}
      />

      {/* Konten Villa */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-[60vh] mb-8">
          <OptimizedImage
            src={villa.mainImages[0]}
            alt={`${villa.name} - Villa di ${villa.location}`}
            width={1920}
            height={1080}
            className="w-full h-full object-cover rounded-lg"
            priority
          />
        </div>

        {/* Informasi Villa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{villa.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-yellow-500">★ {villa.rating}</span>
              <span className="text-gray-600">({villa.reviews} review)</span>
              <span className="text-gray-600">•</span>
              <span className="text-gray-600">{villa.location}</span>
            </div>
            <p className="text-gray-700 mb-6">{villa.description}</p>
            
            {/* Fasilitas */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Fasilitas</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {villa.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Tipe Kamar</h2>
            {roomTypes.map((room, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg w-full">
                <div className="flex justify-between items-center mb-1 w-full">
                  <span className="text-lg font-bold text-blue-600 whitespace-nowrap">
                    Rp {room.price.toLocaleString('id-ID')} <span className="font-normal text-xs text-gray-500">/malam</span>
                  </span>
                  <h3 className="font-semibold text-base sm:text-lg text-right truncate">{room.name}</h3>
                </div>
                <div style={{color: 'red', fontWeight: 'bold'}}>DEBUG MOBILE</div>
                <span className="text-xs text-gray-500 mb-2 block">Kapasitas: {room.capacity} tamu</span>
                <div className="flex flex-wrap gap-2 mb-2">
                  {room.amenities && room.amenities.map((amenity, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-500 px-2 py-1 rounded text-xs flex items-center gap-1">
                      {amenity}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mb-1">{room.description}</p>
                <div className="flex justify-end">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Pesan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default VillaDetail; 