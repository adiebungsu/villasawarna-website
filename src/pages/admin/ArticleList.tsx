import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { articleData } from '@/data/articles';
import SEO from '@/components/SEO';

const ArticleList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articleData.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO 
        title="Manajemen Artikel"
        description="Panel admin untuk mengelola artikel Villa Sawarna"
      />
      <div className="container-custom py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manajemen Artikel</h1>
            <Button asChild>
              <Link to="/admin/articles/new">
                <Plus className="mr-2 h-4 w-4" />
                Artikel Baru
              </Link>
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Cari artikel..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Articles Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Judul
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Penulis
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{article.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" asChild className="mr-2">
                        <Link to={`/admin/articles/edit/${article.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleList; 