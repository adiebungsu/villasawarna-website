import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  openGraph?: {
    type?: string;
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      section?: string;
      tags?: string[];
    };
  };
  hreflangAlternates?: Array<{ hrefLang: string; href: string }>;
}

const SEO = ({
  title,
  description,
  keywords,
  image = "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80",
  url,
  type = "website",
  structuredData,
  noindex = false,
  openGraph,
  hreflangAlternates
}: SEOProps) => {
  const siteTitle = "Villa Sawarna";
  const fullTitle = `${title} | ${siteTitle}`;
  // Determine effective absolute URL
  const effectiveUrl =
    url || (typeof window !== 'undefined' ? window.location.href : "https://villasawarna.com");

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="language" content="Indonesian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Villa Sawarna" />
      <meta name="geo.region" content="ID-BT" />
      <meta name="geo.placename" content="Sawarna" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={openGraph?.type || type} />
      <meta property="og:url" content={effectiveUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="id_ID" />
      {openGraph?.article && (
        <>
          {openGraph.article.publishedTime && (
            <meta property="article:published_time" content={openGraph.article.publishedTime} />
          )}
          {openGraph.article.modifiedTime && (
            <meta property="article:modified_time" content={openGraph.article.modifiedTime} />
          )}
          {openGraph.article.section && (
            <meta property="article:section" content={openGraph.article.section} />
          )}
          {openGraph.article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={effectiveUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={effectiveUrl} />

      {/* Hreflang Alternates */}
      {hreflangAlternates && hreflangAlternates.length > 0 ? (
        hreflangAlternates.map((alt, idx) => (
          <link key={`${alt.hrefLang}-${idx}`} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
        ))
      ) : (
        <>
          <link rel="alternate" hrefLang="id-ID" href={effectiveUrl} />
          <link rel="alternate" hrefLang="x-default" href={effectiveUrl} />
        </>
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 