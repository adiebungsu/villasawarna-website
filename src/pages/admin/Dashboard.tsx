import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Building2, 
  Calendar, 
  Newspaper, 
  MapPin, 
  Settings,
  TrendingUp,
  DollarSign,
  Star,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Data dummy untuk contoh
  const stats = {
    visitors: 1234,
    bookings: 56,
    revenue: 15000000,
    properties: 12,
    articles: 25,
    destinations: 8,
    users: 89,
    reviews: 45
  };

  return (
    <>
      <SEO 
        title="Dashboard Admin"
        description="Panel admin Villa Sawarna"
      />
      
      <div className="container-custom py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/admin/settings">
                <Settings className="w-4 h-4 mr-2" />
                Pengaturan
              </Link>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properti</TabsTrigger>
            <TabsTrigger value="bookings">Booking</TabsTrigger>
            <TabsTrigger value="content">Konten</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pengunjung</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.visitors}</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% dari bulan lalu
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Booking</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.bookings}</div>
                  <p className="text-xs text-muted-foreground">
                    +12% dari bulan lalu
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pendapatan</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    Rp {stats.revenue.toLocaleString('id-ID')}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +8.2% dari bulan lalu
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating Rata-rata</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">
                    +0.2 dari bulan lalu
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" asChild className="h-auto py-4">
                      <Link to="/admin/properties/new">
                        <Building2 className="w-4 h-4 mr-2" />
                        Tambah Properti
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-auto py-4">
                      <Link to="/admin/articles/new">
                        <Newspaper className="w-4 h-4 mr-2" />
                        Buat Artikel
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-auto py-4">
                      <Link to="/admin/destinations/new">
                        <MapPin className="w-4 h-4 mr-2" />
                        Tambah Destinasi
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-auto py-4">
                      <Link to="/admin/bookings">
                        <Calendar className="w-4 h-4 mr-2" />
                        Lihat Booking
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Statistik Konten</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span>Total Properti</span>
                      </div>
                      <span className="font-medium">{stats.properties}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Newspaper className="w-4 h-4 mr-2" />
                        <span>Total Artikel</span>
                      </div>
                      <span className="font-medium">{stats.articles}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>Total Destinasi</span>
                      </div>
                      <span className="font-medium">{stats.destinations}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        <span>Total Review</span>
                      </div>
                      <span className="font-medium">{stats.reviews}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Daftar Properti</CardTitle>
                  <Button asChild>
                    <Link to="/admin/properties/new">
                      Tambah Properti
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Tabel properti akan ditambahkan di sini */}
                <p className="text-muted-foreground">Fitur dalam pengembangan...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Daftar Booking</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Tabel booking akan ditambahkan di sini */}
                <p className="text-muted-foreground">Fitur dalam pengembangan...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manajemen Konten</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link to="/admin/articles/new">
                        Buat Artikel
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/admin/destinations/new">
                        Tambah Destinasi
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Tabel konten akan ditambahkan di sini */}
                <p className="text-muted-foreground">Fitur dalam pengembangan...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Dashboard; 