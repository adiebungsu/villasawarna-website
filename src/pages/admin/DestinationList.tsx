import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Eye, MapPin, Image, Star } from 'lucide-react';
import SEO from '@/components/SEO';

const DestinationList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Data dummy untuk contoh
  const destinations = [
    {
      id: '1',
      name: 'Pantai Sawarna',
      category: 'Pantai',
      location: 'Bayah, Lebak',
      rating: 4.8,
      reviews: 156,
      image: 'https://example.com/sawarna.jpg',
      status: 'published'
    },
    // Tambahkan data dummy lainnya
  ];

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO 
        title="Manajemen Destinasi"
        description="Panel admin untuk mengelola destinasi wisata Villa Sawarna"
      />
      
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manajemen Destinasi</h1>
          <Button asChild>
            <Link to="/admin/destinations/new">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Destinasi
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="text"
                    placeholder="Cari destinasi..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Destinasi</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDestinations.map((destination) => (
                    <TableRow key={destination.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-medium">{destination.name}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="w-3 h-3" />
                              <span>{destination.rating}</span>
                              <span>•</span>
                              <span>{destination.reviews} ulasan</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {destination.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{destination.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{destination.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {destination.status === 'published' ? 'Dipublikasi' : 'Draft'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/destination/${destination.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/admin/destinations/edit/${destination.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DestinationList; 