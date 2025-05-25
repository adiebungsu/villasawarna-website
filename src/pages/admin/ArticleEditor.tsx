import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createArticle, updateArticle, getArticleById } from '@/api/articles';
import ArticlePreview from '@/components/ArticlePreview';
import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { Article } from '@/types/article';
import { Calendar, Image as ImageIcon, Tag, Eye, Settings, FileText, Share2, Code } from 'lucide-react';
import RichTextEditor from '@/components/RichTextEditor';

// Perluas tipe Article untuk menambahkan properti baru
interface ExtendedArticle extends Article {
  isPublished?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  featured?: boolean;
  allowComments?: boolean;
  socialShare?: boolean;
}

const categories = [
  'Wisata',
  'Budaya',
  'Kuliner',
  'Akomodasi',
  'Event',
  'Tips Perjalanan'
];

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ExtendedArticle>({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    author: '',
    date: '',
    tags: [],
    isPublished: false,
    seoTitle: '',
    seoDescription: '',
    featured: false,
    allowComments: true,
    socialShare: true
  });

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        const article = await getArticleById(id);
        if (article) {
          const extendedArticle = article as Partial<ExtendedArticle>; // Gunakan Partial untuk optional properties
          setFormData({
            ...article,
            isPublished: extendedArticle.isPublished !== undefined ? extendedArticle.isPublished : false,
            seoTitle: extendedArticle.seoTitle !== undefined ? extendedArticle.seoTitle : article.title,
            seoDescription: extendedArticle.seoDescription !== undefined ? extendedArticle.seoDescription : article.excerpt,
            tags: article.tags || [],
            featured: extendedArticle.featured !== undefined ? extendedArticle.featured : false,
            allowComments: extendedArticle.allowComments !== undefined ? extendedArticle.allowComments : true,
            socialShare: extendedArticle.socialShare !== undefined ? extendedArticle.socialShare : true,
          });
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Buat objek Article baru dari formData, hanya ambil properti yang sesuai
    const articleData: Article = {
      id: formData.id, // Pastikan id ada jika update
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      image: formData.image,
      author: formData.author,
      date: formData.date,
      tags: formData.tags,
      // Properti tambahan di ExtendedArticle tidak disertakan di sini
    };
    
    try {
      if (id) {
        await updateArticle(id, articleData);
      } else {
        // Jika membuat artikel baru, mungkin id di-generate di backend
        // Jika tidak, pastikan id di-generate sebelum dikirim
        await createArticle(articleData);
      }
      navigate('/admin/articles');
    } catch (error) {
      console.error('Error saving article:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title={id ? "Edit Artikel" : "Artikel Baru"}
        description="Editor artikel Villa Sawarna"
      />
      <Navbar />
      
      <div className="container-custom py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{id ? "Edit Artikel" : "Artikel Baru"}</h1>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => navigate('/admin/articles')}>
                Batal
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </div>

          <Tabs defaultValue="edit" className="space-y-6">
            <TabsList className="grid grid-cols-6 gap-4">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <FileText size={16} />
                Edit
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-2">
                <Code size={16} />
                Kode
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye size={16} />
                Preview
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Share2 size={16} />
                SEO
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <ImageIcon size={16} />
                Media
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings size={16} />
                Pengaturan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="edit">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Konten Artikel</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Judul Artikel</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="excerpt">Ringkasan</Label>
                        <Textarea
                          id="excerpt"
                          value={formData.excerpt}
                          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content">Konten</Label>
                        <RichTextEditor
                          content={formData.content}
                          onChange={(content) => setFormData({ ...formData, content: content })}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informasi Dasar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Kategori</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="author">Penulis</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Tanggal</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tag</Label>
                        <Input
                          id="tags"
                          value={formData.tags.join(', ')}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                          placeholder="Pisahkan tag dengan koma"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="code">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Kode</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contentCode">Konten (Markdown/HTML)</Label>
                    <Textarea
                      id="contentCode"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="min-h-[500px] font-mono text-sm"
                      placeholder="Tulis konten dalam format Markdown atau HTML..."
                    />
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Tips:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Gunakan # untuk heading (contoh: # Judul Utama)</li>
                      <li>Gunakan ** untuk teks tebal (contoh: **teks tebal**)</li>
                      <li>Gunakan * untuk teks miring (contoh: *teks miring*)</li>
                      <li>Gunakan - untuk list (contoh: - item list)</li>
                      <li>Gunakan ``` untuk blok kode</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview">
              <ArticlePreview article={{ ...formData, id: 'preview' }} />
            </TabsContent>

            <TabsContent value="seo">
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan SEO</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seoTitle">Judul SEO</Label>
                    <Input
                      id="seoTitle"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      placeholder="Masukkan judul untuk SEO"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seoDescription">Deskripsi SEO</Label>
                    <Textarea
                      id="seoDescription"
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      placeholder="Masukkan deskripsi singkat untuk SEO"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media">
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">URL Gambar Utama</Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                    />
                  </div>

                  <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Artikel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="isPublished">Status Publikasi</Label>
                      <p className="text-sm text-gray-500">
                        Artikel akan muncul di halaman publik
                      </p>
                    </div>
                    <Switch
                      id="isPublished"
                      checked={formData.isPublished}
                      onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Artikel Unggulan</Label>
                      <p className="text-sm text-gray-500">
                        Tampilkan di bagian unggulan
                      </p>
                    </div>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allowComments">Izinkan Komentar</Label>
                      <p className="text-sm text-gray-500">
                        Pengunjung dapat memberikan komentar
                      </p>
                    </div>
                    <Switch
                      id="allowComments"
                      checked={formData.allowComments}
                      onCheckedChange={(checked) => setFormData({ ...formData, allowComments: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="socialShare">Bagikan ke Media Sosial</Label>
                      <p className="text-sm text-gray-500">
                        Tampilkan tombol berbagi
                      </p>
                    </div>
                    <Switch
                      id="socialShare"
                      checked={formData.socialShare}
                      onCheckedChange={(checked) => setFormData({ ...formData, socialShare: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default ArticleEditor; 