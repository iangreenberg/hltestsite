import fs from 'fs';
import path from 'path';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import { createLogger } from './logger';
import { fileURLToPath } from 'url';

const logger = createLogger('sitemap');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITEMAP_PATH = path.join(__dirname, '../client/public/sitemap.xml');
const BASE_URL = 'https://hltestsite-4vq3.vercel.app';

interface SitemapEntry {
  url: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  lastmod?: string | Date;
  img?: Array<{ url: string; caption?: string; title?: string; geoLocation?: string; license?: string }>;
  links?: Array<{ lang: string; url: string }>;
  news?: {
    publication: {
      name: string;
      language: string;
    };
    publication_date: string;
    title: string;
  };
}

/**
 * Builds a dynamic sitemap for the application
 * @returns Promise with the XML string of the sitemap
 */
export async function buildSitemap(): Promise<string> {
  try {
    // Create static routes list (core pages that don't change)
    const staticRoutes: SitemapEntry[] = [
      { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() },
      { url: '/packages', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
      { url: '/how-it-works', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/about', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
      { url: '/contact', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
      { url: '/apply', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      
      // Service pages
      { url: '/services', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
      { url: '/services/compliance', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/services/product-development', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/services/brand-development', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/services/distribution', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/services/marketing', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/services/support', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      
      // Blog and main blog posts
      { url: '/blog', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
      { 
        url: '/blog/farm-bill-updates', 
        changefreq: 'monthly', 
        priority: 0.7, 
        lastmod: new Date().toISOString(),
        news: {
          publication: {
            name: 'HempLaunch',
            language: 'en'
          },
          publication_date: new Date().toISOString().split('T')[0],
          title: 'Latest Farm Bill Updates for Hemp Business Owners'
        }
      },
      { 
        url: '/blog/meta-ads-strategies', 
        changefreq: 'monthly', 
        priority: 0.7, 
        lastmod: new Date().toISOString(),
        news: {
          publication: {
            name: 'HempLaunch',
            language: 'en'
          },
          publication_date: new Date().toISOString().split('T')[0],
          title: 'Effective Meta Ads Strategies for Hemp Businesses'
        }
      },
      { 
        url: '/blog/llc-vs-corporation', 
        changefreq: 'monthly', 
        priority: 0.7, 
        lastmod: new Date().toISOString(),
        news: {
          publication: {
            name: 'HempLaunch',
            language: 'en'
          },
          publication_date: new Date().toISOString().split('T')[0],
          title: 'LLC vs Corporation: Choosing the Right Structure for Your Hemp Business'
        }
      },
      { 
        url: '/blog/vetting-manufacturers', 
        changefreq: 'monthly', 
        priority: 0.7, 
        lastmod: new Date().toISOString(),
        news: {
          publication: {
            name: 'HempLaunch',
            language: 'en'
          },
          publication_date: new Date().toISOString().split('T')[0],
          title: 'How to Properly Vet Hemp Product Manufacturers'
        }
      },
      { 
        url: '/blog/brand-differentiation', 
        changefreq: 'monthly', 
        priority: 0.7, 
        lastmod: new Date().toISOString(),
        news: {
          publication: {
            name: 'HempLaunch',
            language: 'en'
          },
          publication_date: new Date().toISOString().split('T')[0],
          title: 'Brand Differentiation Strategies in the Competitive Hemp Market'
        }
      },
      { 
        url: '/blog/payment-processing', 
        changefreq: 'monthly', 
        priority: 0.7, 
        lastmod: new Date().toISOString(),
        news: {
          publication: {
            name: 'HempLaunch',
            language: 'en'
          },
          publication_date: new Date().toISOString().split('T')[0],
          title: 'Navigating Payment Processing Challenges in the Hemp Industry'
        }
      },
    ];

    // TODO: Add dynamic route collection here when we have dynamic content
    // For example, blog posts from a database, product pages, etc.
    // const dynamicRoutes = await collectDynamicRoutes();
    
    // Combine static and dynamic routes
    const allRoutes = [...staticRoutes];

    // Create sitemap stream
    const stream = new SitemapStream({ hostname: BASE_URL });
    
    // Return the sitemap XML as a string
    return streamToPromise(
      Readable.from(allRoutes).pipe(stream)
    ).then((data) => data.toString());
    
  } catch (error) {
    logger.error('Error building sitemap:', error);
    throw error;
  }
}

/**
 * Generates and saves the sitemap.xml file
 */
export async function generateSitemap(): Promise<void> {
  try {
    const sitemap = await buildSitemap();
    fs.writeFileSync(SITEMAP_PATH, sitemap);
    logger.info(`Sitemap generated successfully at ${SITEMAP_PATH}`);
  } catch (error) {
    logger.error('Error generating sitemap:', error);
  }
}

/**
 * Schedules regular sitemap generation using cron
 * @param cronExpression cron expression for scheduling (default is daily at midnight)
 */
export function scheduleSitemapGeneration(cronExpression: string = '0 0 * * *'): void {
  import('node-cron').then(cron => {
    if (cron.validate(cronExpression)) {
      cron.schedule(cronExpression, async () => {
        logger.info('Running scheduled sitemap generation');
        await generateSitemap();
      });
      logger.info(`Sitemap generation scheduled with cron expression: ${cronExpression}`);
    } else {
      logger.error(`Invalid cron expression: ${cronExpression}`);
    }
  }).catch(err => {
    logger.error('Error loading node-cron module:', err);
  });
}