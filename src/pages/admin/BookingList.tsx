import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, CheckCircle, XCircle, Clock, Calendar, User, Building2 } from 'lucide-react';
import SEO from '@/components/SEO';

const BookingList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  // Data dummy untuk contoh
  const bookings = [
    {
      id: '1',
      propertyName: 'Villa Sawarna Indah',
      propertyType: 'villa',
      guestName: 'John Doe',
      checkIn: '2024-03-20',
      checkOut: '2024-03-22',
      totalPrice: 2500000,
      status: 'pending',
      createdAt: '2024-03-15'
    },
    // Tambahkan data dummy lainnya
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Menunggu</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Dikonfirmasi</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Dibatalkan</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <SEO 
        title="Manajemen Booking"
        description="Panel admin untuk mengelola pemesanan Villa Sawarna"
      />
      
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manajemen Booking</h1>
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
                    placeholder="Cari booking..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Status */}
              <div className="flex gap-2">
                <Button
                  variant={selectedStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus('all')}
                >
                  Semua
                </Button>
                <Button
                  variant={selectedStatus === 'pending' ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus('pending')}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Menunggu
                </Button>
                <Button
                  variant={selectedStatus === 'confirmed' ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus('confirmed')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Dikonfirmasi
                </Button>
                <Button
                  variant={selectedStatus === 'cancelled' ? 'default' : 'outline'}
                  onClick={() => setSelectedStatus('cancelled')}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Dibatalkan
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Properti</TableHead>
                    <TableHead>Tamu</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{booking.propertyName}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.propertyType === 'villa' ? 'Villa' : 'Homestay'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.guestName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.checkIn}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{booking.checkOut}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-coral">
                          Rp {booking.totalPrice.toLocaleString('id-ID')}
                        </p>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(booking.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/admin/bookings/${booking.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          {booking.status === 'pending' && (
                            <>
                              <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-900">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-900">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
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

export default BookingList; 