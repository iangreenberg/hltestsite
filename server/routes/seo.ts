import { Router } from 'express';
import { createLogger } from '../logger';
import { seoEngine } from '../seo-engine';
import { storageSeo } from '../seo-engine/storage';
import { auditSite, auditPage } from '../seo-engine/audit';
import { SEOIssue } from '../seo-engine/types';

const logger = createLogger('seo-routes');
const router = Router();

/**
 * Get the latest SEO report
 */
router.get('/report/latest', async (req, res) => {
  try {
    const report = await storageSeo.getLatestReport();
    
    if (!report) {
      return res.status(404).json({ 
        message: 'No SEO reports available. Run an audit to generate a report.' 
      });
    }
    
    return res.json(report);
  } catch (error) {
    logger.error('Error fetching latest report:', error);
    return res.status(500).json({ message: 'Failed to fetch latest SEO report' });
  }
});

/**
 * Get all SEO reports
 */
router.get('/reports', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const reports = await storageSeo.getDailyReports(limit);
    
    return res.json(reports);
  } catch (error) {
    logger.error('Error fetching reports:', error);
    return res.status(500).json({ message: 'Failed to fetch SEO reports' });
  }
});

/**
 * Get the SEO engine status
 */
router.get('/status', (req, res) => {
  try {
    const status = seoEngine.getStatus();
    return res.json(status);
  } catch (error) {
    logger.error('Error fetching SEO engine status:', error);
    return res.status(500).json({ message: 'Failed to fetch SEO engine status' });
  }
});

/**
 * Simple test endpoint to verify API connectivity
 */
router.get('/test', (req, res) => {
  return res.json({ 
    success: true, 
    message: 'SEO API is working correctly',
    timestamp: new Date().toISOString() 
  });
});

/**
 * Run a new SEO audit
 * This is a long-running task, so it returns immediately and runs in the background
 */
router.post('/run-audit', async (req, res) => {
  try {
    // Check if an audit is already running
    const status = seoEngine.getStatus();
    
    if (status.isRunning) {
      return res.status(409).json({ 
        message: 'An audit is already running', 
        progress: status.currentProgress 
      });
    }
    
    // Start the audit in the background
    seoEngine.runDailyAudit().catch(error => {
      logger.error('Error running daily audit:', error);
    });
    
    return res.json({ 
      message: 'SEO audit started', 
      status: 'running' 
    });
  } catch (error) {
    logger.error('Error starting SEO audit:', error);
    return res.status(500).json({ message: 'Failed to start SEO audit' });
  }
});

/**
 * Get all page audits
 */
router.get('/audits', async (req, res) => {
  try {
    const audits = await storageSeo.getAllPageAudits();
    return res.json(audits);
  } catch (error) {
    logger.error('Error fetching page audits:', error);
    return res.status(500).json({ message: 'Failed to fetch page audits' });
  }
});

/**
 * Get a specific page audit
 */
router.get('/audit/:url', async (req, res) => {
  try {
    const url = req.params.url;
    const decodedUrl = decodeURIComponent(url);
    
    const audit = await storageSeo.getPageAudit(decodedUrl);
    
    if (!audit) {
      return res.status(404).json({ message: 'Page audit not found' });
    }
    
    return res.json(audit);
  } catch (error) {
    logger.error('Error fetching page audit:', error);
    return res.status(500).json({ message: 'Failed to fetch page audit' });
  }
});

/**
 * Get all SEO issues
 */
router.get('/issues', async (req, res) => {
  try {
    const issues = await storageSeo.getAllIssues();
    return res.json(issues);
  } catch (error) {
    logger.error('Error fetching SEO issues:', error);
    return res.status(500).json({ message: 'Failed to fetch SEO issues' });
  }
});

/**
 * Mark an issue as fixed
 */
router.post('/issues/:id/fix', async (req, res) => {
  try {
    const id = req.params.id;
    
    await storageSeo.markIssueFixed(id);
    
    return res.json({ message: 'Issue marked as fixed' });
  } catch (error) {
    logger.error('Error marking issue as fixed:', error);
    return res.status(500).json({ message: 'Failed to mark issue as fixed' });
  }
});

/**
 * Ignore an issue
 */
router.post('/issues/:id/ignore', async (req, res) => {
  try {
    const id = req.params.id;
    const ignore = req.body.ignore === true;
    
    await storageSeo.ignoreIssue(id, ignore);
    
    return res.json({ 
      message: ignore ? 'Issue ignored' : 'Issue un-ignored' 
    });
  } catch (error) {
    logger.error('Error updating issue ignore status:', error);
    return res.status(500).json({ message: 'Failed to update issue' });
  }
});

/**
 * Get all keyword rankings
 */
router.get('/keywords', async (req, res) => {
  try {
    const rankings = await storageSeo.getKeywordRankings();
    return res.json(rankings);
  } catch (error) {
    logger.error('Error fetching keyword rankings:', error);
    return res.status(500).json({ message: 'Failed to fetch keyword rankings' });
  }
});

/**
 * Get all content suggestions
 */
router.get('/content-suggestions', async (req, res) => {
  try {
    const suggestions = await storageSeo.getContentSuggestions();
    return res.json(suggestions);
  } catch (error) {
    logger.error('Error fetching content suggestions:', error);
    return res.status(500).json({ message: 'Failed to fetch content suggestions' });
  }
});

/**
 * Mark a content suggestion as implemented
 */
router.post('/content-suggestions/:id/implement', async (req, res) => {
  try {
    const id = req.params.id;
    
    await storageSeo.markSuggestionImplemented(id);
    
    return res.json({ message: 'Content suggestion marked as implemented' });
  } catch (error) {
    logger.error('Error marking content suggestion as implemented:', error);
    return res.status(500).json({ message: 'Failed to mark content suggestion as implemented' });
  }
});

/**
 * Generate weekly email report
 */
router.get('/email-report', async (req, res) => {
  try {
    const html = await seoEngine.generateWeeklyEmailReport();
    
    // Return the HTML of the email
    return res.send(html);
  } catch (error) {
    logger.error('Error generating email report:', error);
    return res.status(500).json({ message: 'Failed to generate email report' });
  }
});

/**
 * Get all issues that can be automatically fixed
 */
router.get('/fixable-issues', async (req, res) => {
  try {
    const issues = await seoEngine.getFixableIssues();
    return res.json(issues);
  } catch (error) {
    logger.error('Error fetching fixable issues:', error);
    return res.status(500).json({ message: 'Failed to fetch fixable issues' });
  }
});

/**
 * Auto-fix all fixable issues
 */
router.post('/fix-all-issues', async (req, res) => {
  try {
    const result = await seoEngine.fixIssues();
    return res.json(result);
  } catch (error) {
    logger.error('Error fixing issues:', error);
    return res.status(500).json({ message: 'Failed to fix issues' });
  }
});

/**
 * Fix a specific issue
 */
router.post('/fix-issue/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await seoEngine.fixIssue(id);
    return res.json(result);
  } catch (error) {
    logger.error(`Error fixing issue ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Failed to fix issue' });
  }
});

/**
 * Perform keyword research
 */
router.post('/research-keywords', async (req, res) => {
  try {
    const request = req.body;
    
    // Validate the request
    if (!request.seedKeywords || !Array.isArray(request.seedKeywords) || request.seedKeywords.length === 0) {
      return res.status(400).json({ message: 'seedKeywords is required and must be a non-empty array' });
    }
    
    const results = await seoEngine.researchKeywords(request);
    return res.json(results);
  } catch (error) {
    logger.error('Error researching keywords:', error);
    return res.status(500).json({ message: 'Failed to research keywords' });
  }
});

/**
 * Get top keywords
 */
router.get('/top-keywords', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const minSearchVolume = req.query.minSearchVolume ? parseInt(req.query.minSearchVolume as string) : 100;
    
    const keywords = await seoEngine.getTopKeywords(limit, minSearchVolume);
    return res.json(keywords);
  } catch (error) {
    logger.error('Error fetching top keywords:', error);
    return res.status(500).json({ message: 'Failed to fetch top keywords' });
  }
});

/**
 * Get suggested content topics
 */
router.get('/suggested-topics', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const minSearchVolume = req.query.minSearchVolume ? parseInt(req.query.minSearchVolume as string) : 100;
    
    const topics = await seoEngine.getSuggestedContentTopics(minSearchVolume, limit);
    return res.json(topics);
  } catch (error) {
    logger.error('Error fetching suggested topics:', error);
    return res.status(500).json({ message: 'Failed to fetch suggested topics' });
  }
});

export default router;