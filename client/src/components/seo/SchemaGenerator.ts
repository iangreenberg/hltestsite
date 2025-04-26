type BusinessInfo = {
  name: string;
  url: string;
  logo: string;
  contactPoint?: {
    telephone: string;
    email: string;
    contactType: string;
  };
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs?: string[];  // Social media URLs
  description?: string;
};

const defaultBusinessInfo: BusinessInfo = {
  name: 'HempLaunch',
  url: 'https://hltestsite-4vq3.vercel.app',
  logo: 'https://hltestsite-4vq3.vercel.app/images/hempLaunch-logo.png',
  contactPoint: {
    telephone: '+1234567890', // Update with your real phone number
    email: 'contact@hempLaunch.com', // Update with your real email
    contactType: 'Customer Support'
  },
  description: 'Turnkey Hemp Business Solutions - From entity formation to product launch, start your brand with zero hassle.'
};

/**
 * Generates Organization schema markup
 */
export function generateOrganizationSchema(info: Partial<BusinessInfo> = {}): object {
  const businessData = { ...defaultBusinessInfo, ...info };
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': businessData.name,
    'url': businessData.url,
    'logo': businessData.logo,
    'description': businessData.description,
    ...(businessData.contactPoint && { 'contactPoint': businessData.contactPoint }),
    ...(businessData.address && { 'address': {
      '@type': 'PostalAddress',
      ...businessData.address
    }}),
    ...(businessData.sameAs && { 'sameAs': businessData.sameAs })
  };
}

/**
 * Generates LocalBusiness schema markup
 */
export function generateLocalBusinessSchema(info: Partial<BusinessInfo> = {}): object {
  const businessData = { ...defaultBusinessInfo, ...info };
  
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': businessData.name,
    'url': businessData.url,
    'logo': businessData.logo,
    'description': businessData.description,
    ...(businessData.contactPoint && { 'telephone': businessData.contactPoint.telephone }),
    ...(businessData.contactPoint && { 'email': businessData.contactPoint.email }),
    ...(businessData.address && { 'address': {
      '@type': 'PostalAddress',
      ...businessData.address
    }}),
    ...(businessData.sameAs && { 'sameAs': businessData.sameAs })
  };
}

/**
 * Generates WebPage schema markup
 */
export function generateWebPageSchema(
  url: string,
  title: string,
  description: string,
  lastUpdated?: string,
  image?: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'url': url,
    'name': title,
    'description': description,
    'isPartOf': {
      '@type': 'WebSite',
      'url': defaultBusinessInfo.url,
      'name': defaultBusinessInfo.name,
      'description': defaultBusinessInfo.description
    },
    ...(image && { 'primaryImageOfPage': {
      '@type': 'ImageObject',
      'url': image
    }}),
    ...(lastUpdated && { 'dateModified': lastUpdated }),
  };
}

/**
 * Generates WebSite schema markup with SearchAction for sitelinks search box
 */
export function generateWebsiteSchema(searchUrl?: string): object {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': defaultBusinessInfo.url,
    'name': defaultBusinessInfo.name,
    'description': defaultBusinessInfo.description,
  };
  
  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': `${searchUrl}?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    };
  }
  
  return schema;
}

/**
 * Generates Article schema markup
 */
export function generateArticleSchema(
  url: string,
  headline: string,
  image: string,
  datePublished: string,
  dateModified: string,
  authorName: string,
  description: string,
  publisherName = defaultBusinessInfo.name,
  publisherLogo = defaultBusinessInfo.logo
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': url
    },
    'headline': headline,
    'image': [image],
    'datePublished': datePublished,
    'dateModified': dateModified,
    'author': {
      '@type': 'Person',
      'name': authorName
    },
    'publisher': {
      '@type': 'Organization',
      'name': publisherName,
      'logo': {
        '@type': 'ImageObject',
        'url': publisherLogo
      }
    },
    'description': description
  };
}

/**
 * Generates product schema markup
 */
export function generateProductSchema(
  name: string,
  description: string,
  image: string,
  url: string,
  price?: number,
  currencyCode?: string,
  availability?: string,
  sku?: string,
  brand?: string
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': name,
    'description': description,
    'image': image,
    'url': url,
    ...(brand && { 'brand': {
      '@type': 'Brand',
      'name': brand
    }}),
    ...(sku && { 'sku': sku }),
    ...(price && currencyCode && { 'offers': {
      '@type': 'Offer',
      'price': price,
      'priceCurrency': currencyCode,
      ...(availability && { 'availability': `https://schema.org/${availability}` })
    }}),
  };
}

/**
 * Generates FAQ schema markup
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Generates BreadcrumbList schema markup
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

/**
 * Combines multiple schema objects into a single array for use in SEOHead component
 */
export function combineSchemas(...schemas: object[]): object[] {
  return schemas;
}