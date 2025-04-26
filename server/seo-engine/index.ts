import { createLogger } from '../logger';
import { auditPage, auditSite } from './audit';
import { storageSeo } from './storage';
import { 
  DailySEOReport,
  SEOIssue,
  KeywordRanking,
  ContentSuggestion,
  SEOAction
} from './types';
import { v4 as uuidv4 } from 'uuid';

const logger = createLogger('seo-engine');

/**
 * SEO Engine main class
 * Central manager for all SEO monitoring, auditing, and reporting functions
 */
class SEOEngine {
  private isAuditRunning: boolean = false;
  private lastAuditStartedAt: Date | null = null;
  private lastAuditCompletedAt: Date | null = null;
  private currentAuditProgress: number = 0;
  
  /**
   * Get the current status of the SEO engine
   */
  getStatus() {
    return {
      isRunning: this.isAuditRunning,
      lastAuditStartedAt: this.lastAuditStartedAt,
      lastAuditCompletedAt: this.lastAuditCompletedAt,
      currentProgress: this.currentAuditProgress
    };
  }
  
  /**
   * Run a full daily SEO audit
   * - Crawls all site pages
   * - Audits each page for SEO issues
   * - Gathers keyword rankings
   * - Generates a daily report
   */
  async runDailyAudit(): Promise<DailySEOReport> {
    if (this.isAuditRunning) {
      throw new Error('An audit is already running');
    }
    
    this.isAuditRunning = true;
    this.lastAuditStartedAt = new Date();
    this.currentAuditProgress = 0;
    
    logger.info('Starting daily SEO audit');
    
    try {
      // Step 1: Get previous issues to track changes
      const previousIssues = await storageSeo.getAllIssues();
      const previousFixedCount = previousIssues.filter(issue => issue.fixed).length;
      
      // Step 2: Run site-wide audit
      this.currentAuditProgress = 10;
      const siteAuditResults = await auditSite();
      
      this.currentAuditProgress = 50;
      
      // Step 3: Get the latest report for comparison
      const latestReport = await storageSeo.getLatestReport();
      
      // Step 4: Get keyword rankings
      // In a real implementation, this would fetch data from a service like SEMrush, Ahrefs, etc.
      const keywordRankings: KeywordRanking[] = [];
      
      this.currentAuditProgress = 70;
      
      // Step 5: Generate content suggestions
      // In a real implementation, this would analyze competitor content, keyword gaps, etc.
      const contentSuggestions: ContentSuggestion[] = [];
      
      // Step 6: Create recommended actions
      const actions: SEOAction[] = [];
      
      this.currentAuditProgress = 90;
      
      // Step 7: Generate the daily report
      const allIssues = await storageSeo.getAllIssues();
      const newIssues = allIssues.filter(issue => 
        !previousIssues.some(prevIssue => prevIssue.id === issue.id)
      );
      
      const fixedIssues = allIssues.filter(issue => 
        issue.fixed && 
        !previousIssues.some(prevIssue => prevIssue.id === issue.id && prevIssue.fixed)
      );
      
      // Count issues by severity
      const totalIssues = {
        critical: allIssues.filter(issue => issue.severity === 'critical' && !issue.fixed && !issue.ignored).length,
        high: allIssues.filter(issue => issue.severity === 'high' && !issue.fixed && !issue.ignored).length,
        medium: allIssues.filter(issue => issue.severity === 'medium' && !issue.fixed && !issue.ignored).length,
        low: allIssues.filter(issue => issue.severity === 'low' && !issue.fixed && !issue.ignored).length,
        info: allIssues.filter(issue => issue.severity === 'info' && !issue.fixed && !issue.ignored).length
      };
      
      // Calculate overall score (0-100)
      const totalActiveIssues = 
        totalIssues.critical + 
        totalIssues.high + 
        totalIssues.medium + 
        totalIssues.low;
      
      // More issues = lower score, weighted by severity
      const scoreDeductions = 
        totalIssues.critical * 10 + 
        totalIssues.high * 3 + 
        totalIssues.medium * 1 + 
        totalIssues.low * 0.5;
      
      const overallScore = Math.max(0, Math.min(100, 100 - scoreDeductions));
      
      // Create the report
      const dailyReport: DailySEOReport = {
        date: new Date(),
        totalIssues,
        newIssues: newIssues.length,
        fixedIssues: fixedIssues.length,
        overallScore: Math.round(overallScore),
        keywordRankings,
        // Get high-priority issues
        topPriorityFixes: allIssues
          .filter(issue => 
            (issue.severity === 'critical' || issue.severity === 'high') && 
            !issue.fixed && 
            !issue.ignored
          )
          .slice(0, 5),
        contentSuggestions,
        performanceMetrics: []
      };
      
      // Save the report
      await storageSeo.saveDailyReport(dailyReport);
      
      this.currentAuditProgress = 100;
      this.lastAuditCompletedAt = new Date();
      this.isAuditRunning = false;
      
      logger.info('Daily SEO audit completed successfully');
      
      return dailyReport;
    } catch (error) {
      this.isAuditRunning = false;
      logger.error('Error running daily SEO audit:', error);
      throw error;
    }
  }
  
  /**
   * Generate a weekly email report for stakeholders
   */
  async generateWeeklyEmailReport(): Promise<string> {
    try {
      // Get the latest report
      const latestReport = await storageSeo.getLatestReport();
      
      if (!latestReport) {
        return 'No SEO data available for weekly report';
      }
      
      // Get historical reports for the past week
      const weeklyReports = await storageSeo.getDailyReports(7);
      
      // Generate HTML email content
      const html = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h1 { color: #2F5D50; }
              h2 { color: #2F5D50; margin-top: 20px; }
              .score { font-size: 24px; font-weight: bold; }
              .good { color: #4CAF50; }
              .average { color: #FF9800; }
              .poor { color: #F44336; }
              table { width: 100%; border-collapse: collapse; margin-top: 10px; }
              th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
              th { background-color: #f2f2f2; }
              .highlight { background-color: #ffffcc; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Weekly SEO Performance Report</h1>
              <p>Here's your SEO performance summary for the week ending ${new Date().toLocaleDateString()}.</p>
              
              <h2>Overall SEO Score</h2>
              <p class="score ${
                latestReport.overallScore > 80 ? 'good' : 
                latestReport.overallScore > 60 ? 'average' : 'poor'
              }">${latestReport.overallScore}/100</p>
              
              <h2>Issue Summary</h2>
              <table>
                <tr>
                  <th>Severity</th>
                  <th>Count</th>
                </tr>
                <tr>
                  <td>Critical</td>
                  <td>${latestReport.totalIssues.critical}</td>
                </tr>
                <tr>
                  <td>High</td>
                  <td>${latestReport.totalIssues.high}</td>
                </tr>
                <tr>
                  <td>Medium</td>
                  <td>${latestReport.totalIssues.medium}</td>
                </tr>
                <tr>
                  <td>Low</td>
                  <td>${latestReport.totalIssues.low}</td>
                </tr>
              </table>
              
              <h2>Top Priority Fixes</h2>
              ${latestReport.topPriorityFixes.length > 0 ? `
                <table>
                  <tr>
                    <th>Issue</th>
                    <th>Page</th>
                    <th>Severity</th>
                  </tr>
                  ${latestReport.topPriorityFixes.map(issue => `
                    <tr>
                      <td>${issue.title}</td>
                      <td>${issue.url}</td>
                      <td>${issue.severity}</td>
                    </tr>
                  `).join('')}
                </table>
              ` : '<p>No high-priority issues to fix. Great job!</p>'}
              
              <h2>Changes This Week</h2>
              <p>New issues detected: ${latestReport.newIssues}</p>
              <p>Issues fixed: ${latestReport.fixedIssues}</p>
              
              <p>For more details, please visit your <a href="${process.env.BASE_URL || 'https://hltestsite-4vq3.vercel.app'}/admin/seo">SEO Dashboard</a>.</p>
            </div>
          </body>
        </html>
      `;
      
      return html;
    } catch (error) {
      logger.error('Error generating weekly email report:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const seoEngine = new SEOEngine();