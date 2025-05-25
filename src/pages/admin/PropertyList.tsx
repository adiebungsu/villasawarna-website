import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Eye, Star, MapPin, Users, BedDouble, Bath } from 'lucide-react';
import SEO from '@/components/SEO';
import { getAllProperties } from '@/data/properties';

const PropertyList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'villa' | 'homestay'>('all');

  const filteredProperties = getAllProperties().filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || property.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <SEO 
        title="Manajemen Properti"
        description="Panel admin untuk mengelola properti Villa Sawarna"
      />
      
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manajemen Properti</h1>
          <Button asChild>
            <Link to="/admin/properties/new">
              <Plus className="mr-2 h-4 w-4" />
              Tambah Properti
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
                    placeholder="Cari properti..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Type */}
              <div className="flex gap-2">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                >
                  Semua
                </Button>
                <Button
                  variant={selectedType === 'villa' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('villa')}
                >
                  Villa
                </Button>
                <Button
                  variant={selectedType === 'homestay' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('homestay')}
                >
                  Homestay
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama Properti</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Fasilitas</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={property.image}
                            alt={property.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-medium">{property.name}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="w-3 h-3" />
                              <span>{property.rating}</span>
                              <span>•</span>
                              <span>{property.reviews} ulasan</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={property.type === 'villa' ? 'default' : 'secondary'}>
                          {property.type === 'villa' ? 'Villa' : 'Homestay'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="w-3 h-3" />
                          <span>{property.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{property.capacity}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BedDouble className="w-3 h-3" />
                            <span>{property.bedrooms}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-3 h-3" />
                            <span>{property.bathrooms}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-coral">
                          Rp {property.price.toLocaleString('id-ID')}
                        </p>
                        <p className="text-xs text-muted-foreground">per malam</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Tersedia
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/${property.type}s/${property.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/admin/properties/edit/${property.id}`}>
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

export default PropertyList; 