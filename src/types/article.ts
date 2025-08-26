export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  pinned?: boolean;
  translations?: {
    en?: {
      title?: string;
      excerpt?: string;
      content?: string;
      category?: string;
    };
  };
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
    canonical?: string;
    robots?: string;
    viewport?: string;
    publishedTime?: string;
    modifiedTime?: string;
    articleSection?: string;
    articleTag?: string[];
  };
}

