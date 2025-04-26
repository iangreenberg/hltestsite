import { Router } from 'express';
import { seoEngine } from '../seo-engine';
import { storageSeo } from '../seo-engine/storage';
import { createLogger } from '../logger';

const logger = createLogger('seo-routes');
const router = Router();

// Get latest SEO report
router.get('/report/latest', async (req, res) => {
  try {
    const report = await storageSeo.getLatestReport();
    if (!report) {
      return res.status(404).json({ error: 'No SEO reports found' });
    }
    
    res.status(200).json(report);
  } catch (error) {
    logger.error('Error fetching latest SEO report:', error);
    res.status(500).json({ error: 'Failed to fetch SEO report' });
  }
});

// Get all daily reports (with optional limit)
router.get('/reports', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const reports = await storageSeo.getDailyReports(limit);
    
    res.status(200).json(reports);
  } catch (error) {
    logger.error('Error fetching SEO reports:', error);
    res.status(500).json({ error: 'Failed to fetch SEO reports' });
  }
});

// Get all page audits
router.get('/audits', async (req, res) => {
  try {
    const audits = await storageSeo.getAllPageAudits();
    res.status(200).json(audits);
  } catch (error) {
    logger.error('Error fetching page audits:', error);
    res.status(500).json({ error: 'Failed to fetch page audits' });
  }
});

// Get a specific page audit
router.get('/audits/:url', async (req, res) => {
  try {
    const decodedUrl = decodeURIComponent(req.params.url);
    const audit = await storageSeo.getPageAudit(decodedUrl);
    
    if (!audit) {
      return res.status(404).json({ error: 'Audit not found for specified URL' });
    }
    
    res.status(200).json(audit);
  } catch (error) {
    logger.error('Error fetching page audit:', error);
    res.status(500).json({ error: 'Failed to fetch page audit' });
  }
});

// Get all SEO issues
router.get('/issues', async (req, res) => {
  try {
    const issues = await storageSeo.getAllIssues();
    res.status(200).json(issues);
  } catch (error) {
    logger.error('Error fetching SEO issues:', error);
    res.status(500).json({ error: 'Failed to fetch SEO issues' });
  }
});

// Mark an issue as fixed
router.post('/issues/:id/fixed', async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await storageSeo.getIssue(id);
    
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    
    await storageSeo.markIssueFixed(id);
    res.status(200).json({ success: true, message: 'Issue marked as fixed' });
  } catch (error) {
    logger.error('Error marking issue as fixed:', error);
    res.status(500).json({ error: 'Failed to mark issue as fixed' });
  }
});

// Ignore/unignore an issue
router.post('/issues/:id/ignore', async (req, res) => {
  try {
    const { id } = req.params;
    const { ignored } = req.body;
    
    if (typeof ignored !== 'boolean') {
      return res.status(400).json({ error: 'Ignored parameter must be a boolean' });
    }
    
    const issue = await storageSeo.getIssue(id);
    
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    
    await storageSeo.ignoreIssue(id, ignored);
    
    res.status(200).json({ 
      success: true, 
      message: `Issue ${ignored ? 'ignored' : 'unignored'} successfully` 
    });
  } catch (error) {
    logger.error('Error updating issue ignored status:', error);
    res.status(500).json({ error: 'Failed to update issue ignored status' });
  }
});

// Get keyword rankings
router.get('/keywords', async (req, res) => {
  try {
    const keywords = await storageSeo.getKeywordRankings();
    res.status(200).json(keywords);
  } catch (error) {
    logger.error('Error fetching keyword rankings:', error);
    res.status(500).json({ error: 'Failed to fetch keyword rankings' });
  }
});

// Get content suggestions
router.get('/content-suggestions', async (req, res) => {
  try {
    const suggestions = await storageSeo.getContentSuggestions();
    res.status(200).json(suggestions);
  } catch (error) {
    logger.error('Error fetching content suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch content suggestions' });
  }
});

// Mark content suggestion as implemented
router.post('/content-suggestions/:id/implemented', async (req, res) => {
  try {
    const { id } = req.params;
    await storageSeo.markSuggestionImplemented(id);
    res.status(200).json({ success: true, message: 'Content suggestion marked as implemented' });
  } catch (error) {
    logger.error('Error marking content suggestion as implemented:', error);
    res.status(500).json({ error: 'Failed to mark content suggestion as implemented' });
  }
});

// Get SEO actions
router.get('/actions', async (req, res) => {
  try {
    const status = req.query.status as string | undefined;
    const actions = await storageSeo.getActions(status);
    res.status(200).json(actions);
  } catch (error) {
    logger.error('Error fetching SEO actions:', error);
    res.status(500).json({ error: 'Failed to fetch SEO actions' });
  }
});

// Update action status
router.post('/actions/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['pending', 'in_progress', 'completed', 'skipped'].includes(status)) {
      return res.status(400).json({ 
        error: 'Invalid status. Must be one of: pending, in_progress, completed, skipped' 
      });
    }
    
    await storageSeo.updateActionStatus(id, status);
    
    res.status(200).json({ 
      success: true, 
      message: `Action status updated to ${status}` 
    });
  } catch (error) {
    logger.error('Error updating action status:', error);
    res.status(500).json({ error: 'Failed to update action status' });
  }
});

// Run a new SEO audit (admin only)
router.post('/run-audit', async (req, res) => {
  try {
    // Check if the engine is already running
    const status = seoEngine.getStatus();
    if (status.isRunning) {
      return res.status(409).json({ 
        error: 'An SEO audit is already running',
        status
      });
    }
    
    // Start the audit in the background
    seoEngine.runDailyAudit().catch(error => {
      logger.error('Error running SEO audit:', error);
    });
    
    // Return immediately with a success message
    res.status(202).json({ 
      success: true, 
      message: 'SEO audit started successfully',
      status: seoEngine.getStatus()
    });
  } catch (error) {
    logger.error('Error starting SEO audit:', error);
    res.status(500).json({ error: 'Failed to start SEO audit' });
  }
});

// Get the current status of the SEO engine
router.get('/status', (req, res) => {
  try {
    const status = seoEngine.getStatus();
    res.status(200).json(status);
  } catch (error) {
    logger.error('Error getting SEO engine status:', error);
    res.status(500).json({ error: 'Failed to get SEO engine status' });
  }
});

// Generate and return a weekly email report
router.get('/weekly-report', async (req, res) => {
  try {
    const emailContent = await seoEngine.generateWeeklyEmailReport();
    res.status(200).json({ content: emailContent });
  } catch (error) {
    logger.error('Error generating weekly email report:', error);
    res.status(500).json({ error: 'Failed to generate weekly email report' });
  }
});

export default router;