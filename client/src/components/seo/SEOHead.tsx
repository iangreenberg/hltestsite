import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  canonicalUrl?: string;
  noIndex?: boolean;
  schema?: object | object[];
}

const BASE_URL = 'https://hltestsite-4vq3.vercel.app'; // Change to your actual domain in production
const DEFAULT_TITLE = 'HempLaunch | All-in-One Hemp Business Solutions';
const DEFAULT_DESCRIPTION = 'Turnkey Hemp Business Solutions - From entity formation to product launch, start your brand with zero hassle.';
const DEFAULT_KEYWORDS = 'hemp business, hemp launch, hemp derived products, cannabis business, hemp compliance, hemp brand development';
const DEFAULT_IMAGE = `${BASE_URL}/images/hempLaunch-social.jpg`;

export function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  article = false,
  canonicalUrl,
  noIndex = false,
  schema,
}: SEOHeadProps) {
  const [location] = useLocation();
  const currentUrl = BASE_URL + location;
  const finalCanonicalUrl = canonicalUrl || currentUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Robots Control */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Open Graph Tags */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="HempLaunch" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Mobile Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="theme-color" content="#2F5D50" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}