import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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
  MessageSquare,
  Eye,
  User,
  X,
  Send,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import DashboardTour from '@/components/DashboardTour';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window === 'undefined') return 'overview';
    return localStorage.getItem('admin_dashboard_active_tab') || 'overview';
  });

  // Tour state
  const [showTour, setShowTour] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('admin_dashboard_tour_completed') !== 'true';
  });

  // Support tickets state
  const [supportTickets, setSupportTickets] = useState([
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      category: 'booking' as const,
      priority: 'high' as const,
      status: 'open' as const,
      subject: 'Masalah dengan booking villa',
      description: 'Saya sudah booking villa untuk tanggal 15-17 Desember tapi belum dapat konfirmasi',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      assignedTo: 'admin',
      messages: [
        {
          id: 'msg1',
          sender: 'user',
          content: 'Saya sudah booking villa untuk tanggal 15-17 Desember tapi belum dapat konfirmasi',
          timestamp: '2024-01-15T10:30:00Z'
        }
      ]
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Jane Smith',
      userEmail: 'jane@example.com',
      category: 'payment' as const,
      priority: 'medium' as const,
      status: 'in_progress' as const,
      subject: 'Pembayaran tidak terverifikasi',
      description: 'Sudah transfer tapi status masih pending',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-15T09:15:00Z',
      assignedTo: 'admin',
      messages: [
        {
          id: 'msg1',
          sender: 'user',
          content: 'Sudah transfer tapi status masih pending',
          timestamp: '2024-01-14T14:20:00Z'
        },
        {
          id: 'msg2',
          sender: 'admin',
          content: 'Kami sedang memverifikasi pembayaran Anda. Mohon tunggu 1-2 jam kerja.',
          timestamp: '2024-01-15T09:15:00Z'
        }
      ]
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [ticketFilter, setTicketFilter] = useState('all');
  const [ticketSort, setTicketSort] = useState('newest');

  const handleTabChange = (val: string) => {
    setActiveTab(val);
    try {
      localStorage.setItem('admin_dashboard_active_tab', val);
    } catch (error) {
      console.warn('Failed to save active tab:', error);
    }
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.warn('Failed to scroll to top:', error);
    }
  };

  const handleTourComplete = () => {
    setShowTour(false);
    try {
      localStorage.setItem('admin_dashboard_tour_completed', 'true');
    } catch (error) {
      console.warn('Failed to save tour completion:', error);
    }
  };

  const handleTourClose = () => {
    setShowTour(false);
  };

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
            <Button 
              variant="outline" 
              onClick={() => setShowTour(true)}
              className="flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Mulai Tour
            </Button>
            <Button variant="outline" asChild data-tour="settings-button">
              <Link to="/admin/settings">
                <Settings className="w-4 h-4 mr-2" />
                Pengaturan
              </Link>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid grid-cols-5 gap-4">
            <TabsTrigger value="overview" data-tour="overview-tab">Overview</TabsTrigger>
            <TabsTrigger value="properties" data-tour="properties-tab">Properti</TabsTrigger>
            <TabsTrigger value="bookings" data-tour="bookings-tab">Booking</TabsTrigger>
            <TabsTrigger value="content" data-tour="content-tab">Konten</TabsTrigger>
            <TabsTrigger value="support" data-tour="support-tab">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-tour="stats-cards">
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
              <Card data-tour="quick-actions">
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

              <Card data-tour="content-stats">
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

          <TabsContent value="support">
            <Card>
              <CardHeader>
                <CardTitle>Support Ticket Management</CardTitle>
                <CardDescription>
                  Kelola dan tanggapi ticket support dari pengguna
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Filter and Sort Controls */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="ticket-filter">Filter:</Label>
                    <Select value={ticketFilter} onValueChange={setTicketFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label htmlFor="ticket-sort">Sort:</Label>
                    <Select value={ticketSort} onValueChange={setTicketSort}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Terbaru</SelectItem>
                        <SelectItem value="oldest">Terlama</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Support Tickets List */}
                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div key={ticket.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{ticket.subject}</h4>
                            <Badge variant={
                              ticket.status === 'open' ? 'default' :
                              ticket.status === 'in_progress' ? 'secondary' :
                              ticket.status === 'resolved' ? 'outline' : 'destructive'
                            }>
                              {ticket.status === 'open' ? 'Open' :
                               ticket.status === 'in_progress' ? 'In Progress' :
                               ticket.status === 'resolved' ? 'Resolved' : 'Closed'}
                            </Badge>
                            <Badge variant={
                              ticket.priority === 'high' ? 'destructive' :
                              ticket.priority === 'medium' ? 'secondary' : 'outline'
                            }>
                              {ticket.priority === 'high' ? 'High' :
                               ticket.priority === 'medium' ? 'Medium' : 'Low'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{ticket.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {ticket.userName} ({ticket.userEmail})
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(ticket.createdAt).toLocaleDateString('id-ID')}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-3 h-3" />
                              {ticket.messages.length} messages
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setShowTicketModal(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ticket Detail Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ticket Detail</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowTicketModal(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Ticket Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{selectedTicket.subject}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{selectedTicket.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={
                        selectedTicket.status === 'open' ? 'default' :
                        selectedTicket.status === 'in_progress' ? 'secondary' :
                        selectedTicket.status === 'resolved' ? 'outline' : 'destructive'
                      }>
                        {selectedTicket.status === 'open' ? 'Open' :
                         selectedTicket.status === 'in_progress' ? 'In Progress' :
                         selectedTicket.status === 'resolved' ? 'Resolved' : 'Closed'}
                      </Badge>
                      <Badge variant={
                        selectedTicket.priority === 'high' ? 'destructive' :
                        selectedTicket.priority === 'medium' ? 'secondary' : 'outline'
                      }>
                        {selectedTicket.priority === 'high' ? 'High' :
                         selectedTicket.priority === 'medium' ? 'Medium' : 'Low'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p><strong>User:</strong> {selectedTicket.userName} ({selectedTicket.userEmail})</p>
                    <p><strong>Category:</strong> {selectedTicket.category}</p>
                    <p><strong>Created:</strong> {new Date(selectedTicket.createdAt).toLocaleDateString('id-ID')}</p>
                    <p><strong>Updated:</strong> {new Date(selectedTicket.updatedAt).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Conversation History</h4>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {selectedTicket.messages.map((message: any) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-xs p-3 rounded-lg ${
                        message.sender === 'user' 
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' 
                          : 'bg-blue-600 text-white'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {new Date(message.timestamp).toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Form */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">Reply to Ticket</h4>
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Tulis pesan balasan..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    rows={3}
                  />
                  <Button 
                    onClick={() => {
                      if (newMessage.trim()) {
                        // Add new message logic here
                        setNewMessage('');
                      }
                    }}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Tour */}
      <DashboardTour 
        isOpen={showTour}
        onClose={handleTourClose}
        onComplete={handleTourComplete}
      />
    </>
  );
};

export default Dashboard; 