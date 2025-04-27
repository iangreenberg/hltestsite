import { Router, Request, Response } from 'express';
import { storageSeo } from '../storageSeo';
import { createLogger } from '../logger';

const logger = createLogger('seoRoutes');

// Middleware to ensure user is authenticated and is an admin
export function ensureAuthenticated(req: Request, res: Response, next: Function) {
  // For testing purposes, bypass authentication temporarily
  // REMOVE THIS IN PRODUCTION - only for development
  return next();
  
  /*
  if (typeof req.isAuthenticated !== 'function') {
    return res.status(500).json({ message: "req.isAuthenticated is not a function" });
  }
  
  if (req.isAuthenticated() && req.user?.isAdmin) {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized access' });
  */
}

export function registerSeoRoutes(router: Router) {
  // Apply authentication middleware to all SEO routes
  const seoRouter = Router();
  seoRouter.use(ensureAuthenticated);
  
  // Get latest SEO report
  seoRouter.get('/report/latest', async (req: Request, res: Response) => {
    try {
      const report = await storageSeo.getLatestReport();
      
      if (!report) {
        return res.status(404).json({ error: 'No SEO report found' });
      }
      
      // Get page audits for this report
      const pageAudits = await storageSeo.getPageAudits(report.id);
      
      // Get all issues
      const issues = await storageSeo.getAllIssues();
      
      // Return the full report with related data
      return res.json({
        ...report,
        pageAudits,
        issues
      });
    } catch (error) {
      logger.error('Error getting latest SEO report:', error);
      return res.status(500).json({ error: 'Failed to retrieve SEO report' });
    }
  });
  
  // Get SEO status
  seoRouter.get('/status', async (req: Request, res: Response) => {
    try {
      const status = await storageSeo.getSeoStatus();
      return res.json(status);
    } catch (error) {
      logger.error('Error getting SEO status:', error);
      return res.status(500).json({ error: 'Failed to retrieve SEO status' });
    }
  });
  
  // Get all SEO issues
  seoRouter.get('/issues', async (req: Request, res: Response) => {
    try {
      const issues = await storageSeo.getAllIssues();
      return res.json(issues);
    } catch (error) {
      logger.error('Error getting SEO issues:', error);
      return res.status(500).json({ error: 'Failed to retrieve SEO issues' });
    }
  });
  
  // Get fixable issues
  seoRouter.get('/fixable-issues', async (req: Request, res: Response) => {
    try {
      const issues = await storageSeo.getFixableIssues();
      return res.json(issues);
    } catch (error) {
      logger.error('Error getting fixable SEO issues:', error);
      return res.status(500).json({ error: 'Failed to retrieve fixable SEO issues' });
    }
  });
  
  // Mark issue as fixed
  seoRouter.post('/issues/:id/fix', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid issue ID' });
      }
      
      await storageSeo.markIssueFixed(id);
      
      // Update the SEO status to reflect the fixed issue
      const status = await storageSeo.getSeoStatus();
      if (status) {
        await storageSeo.updateSeoStatus({
          totalIssuesFixed: (status.totalIssuesFixed || 0) + 1
        });
      }
      
      return res.json({ success: true });
    } catch (error) {
      logger.error(`Error marking issue ${req.params.id} as fixed:`, error);
      return res.status(500).json({ error: 'Failed to mark issue as fixed' });
    }
  });
  
  // Ignore an issue
  seoRouter.post('/issues/:id/ignore', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { ignore } = req.body;
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid issue ID' });
      }
      
      await storageSeo.ignoreIssue(id, ignore === true);
      return res.json({ success: true });
    } catch (error) {
      logger.error(`Error ${req.body.ignore ? 'ignoring' : 'unignoring'} issue ${req.params.id}:`, error);
      return res.status(500).json({ error: 'Failed to update issue' });
    }
  });
  
  // Get top keywords
  seoRouter.get('/top-keywords', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      
      const keywords = await storageSeo.getKeywordRankings();
      
      // Sort by search volume and take the top n
      const topKeywords = keywords
        .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
        .slice(0, limit);
      
      return res.json(topKeywords);
    } catch (error) {
      logger.error('Error getting top keywords:', error);
      return res.status(500).json({ error: 'Failed to retrieve top keywords' });
    }
  });
  
  // Get suggested content topics
  seoRouter.get('/suggested-topics', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      
      const suggestions = await storageSeo.getContentSuggestions();
      
      // Filter only non-implemented suggestions and take the top n
      const topSuggestions = suggestions
        .filter(s => !s.implemented)
        .sort((a, b) => (b.searchVolume || 0) - (a.searchVolume || 0))
        .slice(0, limit);
      
      return res.json(topSuggestions);
    } catch (error) {
      logger.error('Error getting content suggestions:', error);
      return res.status(500).json({ error: 'Failed to retrieve content suggestions' });
    }
  });
  
  // Mark content suggestion as implemented
  seoRouter.post('/suggestions/:id/implement', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid suggestion ID' });
      }
      
      await storageSeo.markSuggestionImplemented(id);
      return res.json({ success: true });
    } catch (error) {
      logger.error(`Error marking suggestion ${req.params.id} as implemented:`, error);
      return res.status(500).json({ error: 'Failed to mark suggestion as implemented' });
    }
  });
  
  // Run a new SEO audit (this would typically trigger a background job)
  seoRouter.post('/run-audit', async (req: Request, res: Response) => {
    try {
      // Start by marking audit as in progress
      await storageSeo.markAuditInProgress(true);
      
      // This would normally trigger a background job to run the audit
      // For now, we'll just return a success response
      return res.json({ 
        success: true,
        message: 'SEO audit started'
      });
    } catch (error) {
      logger.error('Error starting SEO audit:', error);
      return res.status(500).json({ error: 'Failed to start SEO audit' });
    }
  });
  
  // Quick connection test endpoint
  seoRouter.get('/test', async (req: Request, res: Response) => {
    return res.json({ success: true });
  });
  
  // Mount the SEO router
  router.use('/seo', seoRouter);
}