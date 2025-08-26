import { Helmet } from 'react-helmet-async';
import i18n from 'i18next';

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
  const titleHasBrand = typeof title === 'string' && title.toLowerCase().includes(siteTitle.toLowerCase());
  const fullTitle = titleHasBrand ? title : `${title} | ${siteTitle}`;
  // Determine effective absolute URL
  // Build effective canonical URL ensuring language prefix is present/normalized
  let effectiveUrl = url;
  if (typeof window !== 'undefined') {
    const { origin, pathname, search } = window.location;
    // If no explicit url passed, use current location
    const current = `${origin}${pathname}${search}`;
    const hasLangPrefix = /^\/(en|id)(\/|$)/i.test(pathname);
    if (!url) {
      effectiveUrl = hasLangPrefix ? current : `${origin}${pathname}${search}`;
    }
  }
  if (!effectiveUrl) {
    effectiveUrl = "https://villasawarna.com";
  }

  // Determine language and locale based on i18n
  const currentLang = (i18n?.language || 'id').toLowerCase();
  const ogLocale = currentLang.startsWith('en') ? 'en_US' : 'id_ID';
  const metaLanguage = currentLang.startsWith('en') ? 'English' : 'Indonesian';

  // Build default hreflang alternates when not provided
  let defaultAlternates: Array<{ hrefLang: string; href: string }> | null = null;
  if (typeof window !== 'undefined') {
    const { origin, pathname, search } = window.location;
    const cleanPath = pathname.replace(/^\/(en|id)(\/|$)/i, '/');
    const idHref = `${origin}${cleanPath}${search}`;
    const enHref = `${origin}/en${cleanPath}${search}`.replace(/\/+/, '/').replace(':/', '://');
    defaultAlternates = [
      { hrefLang: 'id-ID', href: idHref },
      { hrefLang: 'en-US', href: enHref },
      { hrefLang: 'x-default', href: idHref }
    ];
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="language" content={metaLanguage} />
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
      <meta property="og:locale" content={ogLocale} />
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
          {defaultAlternates ? (
            defaultAlternates.map((alt, idx) => (
              <link key={`${alt.hrefLang}-${idx}`} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
            ))
          ) : (
            <>
              <link rel="alternate" hrefLang="id-ID" href={effectiveUrl} />
              <link rel="alternate" hrefLang="x-default" href={effectiveUrl} />
            </>
          )}
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