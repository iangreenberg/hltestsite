import { db } from '../server/db';
import { seoStatus, contentSuggestions, keywordRankings, seoReports } from '../shared/schema';
import { createLogger } from '../server/logger';

const logger = createLogger('seoInit');

async function initializeSeoDatabase() {
  logger.info('Initializing SEO database...');

  try {
    // Create initial SEO status if not exists
    const status = await db.select().from(seoStatus).limit(1);
    if (!status || status.length === 0) {
      logger.info('Creating initial SEO status record');
      await db.insert(seoStatus).values({
        health: 75, // Initial health score out of 100
        totalPagesAudited: 0,
        totalIssuesFound: 0,
        totalIssuesFixed: 0,
        auditInProgress: false
      });
    }

    // Create initial SEO report if not exists
    const reports = await db.select().from(seoReports).limit(1);
    if (!reports || reports.length === 0) {
      logger.info('Creating initial SEO report');
      await db.insert(seoReports).values({
        totalIssues: { 
          critical: 0,
          high: 0,
          medium: 0,
          low: 0,
          info: 0
        },
        newIssues: 0,
        fixedIssues: 0,
        overallScore: 75
      });
    }

    // Create sample keywords if none exist
    const keywords = await db.select().from(keywordRankings).limit(1);
    if (!keywords || keywords.length === 0) {
      logger.info('Inserting sample keywords');
      await db.insert(keywordRankings).values([
        {
          keyword: 'hemp business services',
          searchVolume: 480,
          difficulty: 43,
          cpc: '$3.20',
          position: 4,
          url: 'https://example.com/services',
          change: 2
        },
        {
          keyword: 'start hemp business',
          searchVolume: 1250,
          difficulty: 52,
          cpc: '$2.85',
          position: 7,
          url: 'https://example.com/guide',
          change: -1
        },
        {
          keyword: 'hemp compliance',
          searchVolume: 880,
          difficulty: 38,
          cpc: '$4.10',
          position: 2,
          url: 'https://example.com/compliance',
          change: 5
        }
      ]);
    }

    // Create sample content suggestions if none exist
    const suggestions = await db.select().from(contentSuggestions).limit(1);
    if (!suggestions || suggestions.length === 0) {
      logger.info('Inserting sample content suggestions');
      await db.insert(contentSuggestions).values([
        {
          title: 'Guide to Hemp Business Compliance in 2025',
          description: 'Comprehensive guide covering the latest regulations and compliance requirements for hemp businesses.',
          targetKeywords: ['hemp compliance', 'hemp business regulations', '2025 hemp laws'],
          searchVolume: 2300,
          difficulty: 45,
          type: 'guide'
        },
        {
          title: 'How to Create a Winning Hemp Business Plan',
          description: 'Step-by-step guide to creating a comprehensive business plan for your hemp venture with financial projections.',
          targetKeywords: ['hemp business plan', 'hemp startup', 'cannabis business planning'],
          searchVolume: 1800,
          difficulty: 40,
          type: 'article'
        },
        {
          title: 'Hemp vs CBD vs Cannabis: Understanding the Legal Differences',
          description: 'Clarifying the legal distinctions between hemp, CBD, and cannabis to help businesses navigate regulations correctly.',
          targetKeywords: ['hemp vs cbd', 'hemp legal status', 'cannabis legal differences'],
          searchVolume: 3400,
          difficulty: 58,
          type: 'article'
        }
      ]);
    }

    logger.info('SEO database initialization completed successfully');
  } catch (error) {
    logger.error('Error initializing SEO database:', error);
    throw error;
  }
}

// Run the initialization
initializeSeoDatabase()
  .then(() => {
    console.log('✅ SEO database initialization completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ SEO database initialization failed:', error);
    process.exit(1);
  });