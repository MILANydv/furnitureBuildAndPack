import { Metadata } from 'next';
import { Product, Category } from '@/types';

const siteConfig = {
  name: 'ModuLiving Nepal',
  description: 'IKEA-style modular furniture for Nepal - easy assembly + online customization. Custom sizes, flatpack delivery, and affordable prices.',
  url: 'https://moduliving.np',
  ogImage: 'https://moduliving.np/og-image.jpg',
};

export function generateHomeMetadata(): Metadata {
  return {
    title: {
      default: 'ModuLiving Nepal | Modular Furniture & Custom Sizes',
      template: '%s | ModuLiving Nepal',
    },
    description: siteConfig.description,
    keywords: ['modular furniture nepal', 'custom furniture kathmandu', 'flatpack furniture', 'ikea style nepal', 'online furniture store nepal', 'custom size furniture'],
    authors: [{ name: 'ModuLiving Nepal' }],
    creator: 'ModuLiving Nepal',
    publisher: 'ModuLiving Nepal',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title: 'ModuLiving Nepal | Modular Furniture & Custom Sizes',
      description: siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: 'ModuLiving Nepal - Modular Furniture',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ModuLiving Nepal | Modular Furniture & Custom Sizes',
      description: siteConfig.description,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export function generateProductMetadata(product: Product): Metadata {
  const title = product.seoTitle || `${product.name} | Buy Online in Nepal`;
  const description = product.seoDescription || product.shortDescription || product.description.slice(0, 160);
  const url = `${siteConfig.url}/products/${product.slug}`;
  const image = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url;

  return {
    title,
    description,
    keywords: [
      product.name.toLowerCase(),
      'furniture nepal',
      `${product.category.name.toLowerCase()} nepal`,
      'custom furniture',
      'modular furniture',
      ...product.tags,
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: image ? [
        {
          url: image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateCategoryMetadata(category: Category): Metadata {
  const title = category.seoTitle || `${category.name} Furniture | ModuLiving Nepal`;
  const description = category.seoDescription || `Shop ${category.name.toLowerCase()} furniture online in Nepal. Custom sizes, flatpack delivery, easy assembly.`;
  const url = `${siteConfig.url}/products/category/${category.slug}`;

  return {
    title,
    description,
    keywords: [
      `${category.name.toLowerCase()} furniture nepal`,
      `${category.name.toLowerCase()} furniture kathmandu`,
      'modular furniture',
      'custom furniture',
      'flatpack furniture',
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: category.imageUrl ? [
        {
          url: category.imageUrl,
          width: 400,
          height: 400,
          alt: category.name,
        },
      ] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateProductJsonLd(product: Product) {
  const image = product.images.find(img => img.isPrimary)?.url || product.images[0]?.url;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map(img => img.url),
    description: product.description,
    sku: product.variants[0]?.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: 'ModuLiving Nepal',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'NPR',
      lowPrice: Math.min(...product.variants.map(v => v.price)),
      highPrice: Math.max(...product.variants.map(v => v.price)),
      availability: product.variants.some(v => v.stock > 0)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'ModuLiving Nepal',
      },
    },
    aggregateRating: product.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    } : undefined,
    ...(product.dimensions && {
      depth: {
        '@type': 'QuantitativeValue',
        value: product.dimensions.length,
        unitCode: product.dimensions.unit === 'cm' ? 'CMT' : 'INH',
      },
      width: {
        '@type': 'QuantitativeValue',
        value: product.dimensions.width,
        unitCode: product.dimensions.unit === 'cm' ? 'CMT' : 'INH',
      },
      height: {
        '@type': 'QuantitativeValue',
        value: product.dimensions.height,
        unitCode: product.dimensions.unit === 'cm' ? 'CMT' : 'INH',
      },
    }),
    ...(product.weight && {
      weight: {
        '@type': 'QuantitativeValue',
        value: product.weight,
        unitCode: 'KGM',
      },
    }),
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ModuLiving Nepal',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      'https://facebook.com/modulivingnepal',
      'https://instagram.com/modulivingnepal',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+977-1-XXXXXXX',
      contactType: 'customer service',
      areaServed: 'NP',
      availableLanguage: ['English', 'Nepali'],
    },
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
