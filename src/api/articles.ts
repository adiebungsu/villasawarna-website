import { Article } from '@/types/article';

// Simulasi database dengan localStorage
const STORAGE_KEY = 'villa_sawarna_articles';

// Helper untuk mendapatkan semua artikel
const getAllArticles = (): Article[] => {
  const articles = localStorage.getItem(STORAGE_KEY);
  return articles ? JSON.parse(articles) : [];
};

// Helper untuk menyimpan artikel
const saveArticles = (articles: Article[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
};

// API untuk mendapatkan semua artikel
export const getArticles = async (): Promise<Article[]> => {
  return getAllArticles();
};

// API untuk mendapatkan artikel berdasarkan ID
export const getArticleById = async (id: string): Promise<Article | null> => {
  const articles = getAllArticles();
  return articles.find(article => article.id === id) || null;
};

// API untuk membuat artikel baru
export const createArticle = async (article: Omit<Article, 'id'>): Promise<Article> => {
  const articles = getAllArticles();
  const newArticle: Article = {
    ...article,
    id: `article-${Date.now()}`,
    date: new Date().toISOString().split('T')[0]
  };
  
  articles.push(newArticle);
  saveArticles(articles);
  return newArticle;
};

// API untuk mengupdate artikel
export const updateArticle = async (id: string, article: Partial<Article>): Promise<Article | null> => {
  const articles = getAllArticles();
  const index = articles.findIndex(a => a.id === id);
  
  if (index === -1) return null;
  
  const updatedArticle = { ...articles[index], ...article };
  articles[index] = updatedArticle;
  saveArticles(articles);
  return updatedArticle;
};

// API untuk menghapus artikel
export const deleteArticle = async (id: string): Promise<boolean> => {
  const articles = getAllArticles();
  const filteredArticles = articles.filter(article => article.id !== id);
  
  if (filteredArticles.length === articles.length) return false;
  
  saveArticles(filteredArticles);
  return true;
};

// API untuk mencari artikel
export const searchArticles = async (query: string): Promise<Article[]> => {
  const articles = getAllArticles();
  const searchTerm = query.toLowerCase();
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm) ||
    article.content.toLowerCase().includes(searchTerm) ||
    article.category.toLowerCase().includes(searchTerm)
  );
}; 