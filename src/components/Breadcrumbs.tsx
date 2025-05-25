import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://villasawarna.com${item.href}` : undefined
    }))
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="flex items-center hover:text-ocean">
          <Home size={16} className="mr-1" />
          Beranda
        </Link>
        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <ChevronRight size={16} className="mx-2" />
            {item.href ? (
              <Link to={item.href} className="hover:text-ocean">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700">{item.label}</span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs; 