import { Article } from '@/types/article';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from './OptimizedImage';

interface ArticlePreviewProps {
  article: Article;
}

const ArticlePreview = ({ article }: ArticlePreviewProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">{article.category}</Badge>
          <span className="text-sm text-gray-500">{formatDate(article.date)}</span>
        </div>
        <h2 className="text-2xl font-bold mt-2">{article.title}</h2>
        <p className="text-gray-500">Oleh: {article.author}</p>
      </CardHeader>
      <CardContent>
        <div className="aspect-video relative mb-4">
          <OptimizedImage
            src={article.image}
            alt={article.title}
            className="object-cover w-full h-full rounded-lg"
            quality={85}
          />
        </div>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">{article.excerpt}</p>
          <div className="whitespace-pre-wrap">{article.content}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticlePreview; 