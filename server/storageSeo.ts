import { db } from './db';
import { 
  seoReports, seoIssues, pageAudits, keywordRankings, contentSuggestions, seoStatus,
  type SeoReport, type SeoIssue, type PageAudit, type KeywordRanking, 
  type ContentSuggestion, type SeoStatusRecord
} from '@shared/schema';
import { eq, desc, asc } from 'drizzle-orm';
import { createLogger } from './logger';

const logger = createLogger('seoStorage');

export interface SeoStorage {
  // Reports
  getLatestReport(): Promise<SeoReport | null>;
  getAllReports(): Promise<SeoReport[]>;
  createReport(report: Omit<SeoReport, 'id'>): Promise<SeoReport>;
  updateReport(id: number, data: Partial<Omit<SeoReport, 'id'>>): Promise<SeoReport>;
  getReportById(id: number): Promise<SeoReport | null>;
  
  // Issues
  getAllIssues(): Promise<SeoIssue[]>;
  getIssueById(id: number): Promise<SeoIssue | null>;
  getIssuesByReportId(reportId: number): Promise<SeoIssue[]>;
  createIssue(issue: Omit<SeoIssue, 'id'>): Promise<SeoIssue>;
  markIssueFixed(id: number): Promise<void>;
  ignoreIssue(id: number, ignore: boolean): Promise<void>;
  getFixableIssues(): Promise<SeoIssue[]>;
  
  // Page Audits
  getPageAudits(reportId: number): Promise<PageAudit[]>;
  getPageAuditByUrl(url: string): Promise<PageAudit | null>;
  createPageAudit(audit: Omit<PageAudit, 'id'>): Promise<PageAudit>;
  
  // Keywords
  getKeywordRankings(): Promise<KeywordRanking[]>;
  createKeywordRanking(keyword: Omit<KeywordRanking, 'id'>): Promise<KeywordRanking>;
  updateKeywordRanking(id: number, data: Partial<KeywordRanking>): Promise<void>;
  
  // Content Suggestions
  getContentSuggestions(): Promise<ContentSuggestion[]>;
  createContentSuggestion(suggestion: Omit<ContentSuggestion, 'id'>): Promise<ContentSuggestion>;
  markSuggestionImplemented(id: number): Promise<void>;
  
  // SEO Status
  getSeoStatus(): Promise<SeoStatusRecord | null>;
  updateSeoStatus(data: Partial<SeoStatusRecord>): Promise<void>;
  markAuditInProgress(inProgress: boolean): Promise<void>;
}

class DatabaseSeoStorage implements SeoStorage {
  // Reports
  async getLatestReport(): Promise<SeoReport | null> {
    try {
      const [report] = await db.select().from(seoReports).orderBy(desc(seoReports.date)).limit(1);
      return report || null;
    } catch (error) {
      logger.error('Error getting latest report:', error);
      return null;
    }
  }

  async getAllReports(): Promise<SeoReport[]> {
    try {
      return await db.select().from(seoReports).orderBy(desc(seoReports.date));
    } catch (error) {
      logger.error('Error getting all reports:', error);
      return [];
    }
  }

  async createReport(report: Omit<SeoReport, 'id'>): Promise<SeoReport> {
    try {
      const [newReport] = await db.insert(seoReports).values(report).returning();
      return newReport;
    } catch (error) {
      logger.error('Error creating report:', error);
      throw error;
    }
  }
  
  async updateReport(id: number, data: Partial<Omit<SeoReport, 'id'>>): Promise<SeoReport> {
    try {
      const [updatedReport] = await db.update(seoReports)
        .set(data)
        .where(eq(seoReports.id, id))
        .returning();
      
      return updatedReport;
    } catch (error) {
      logger.error(`Error updating report ${id}:`, error);
      throw error;
    }
  }
  
  async getReportById(id: number): Promise<SeoReport | null> {
    try {
      const [report] = await db.select().from(seoReports).where(eq(seoReports.id, id));
      return report || null;
    } catch (error) {
      logger.error(`Error getting report by id ${id}:`, error);
      return null;
    }
  }

  // Issues
  async getAllIssues(): Promise<SeoIssue[]> {
    try {
      return await db.select().from(seoIssues).orderBy(desc(seoIssues.detectedDate));
    } catch (error) {
      logger.error('Error getting all issues:', error);
      return [];
    }
  }

  async getIssueById(id: number): Promise<SeoIssue | null> {
    try {
      const [issue] = await db.select().from(seoIssues).where(eq(seoIssues.id, id));
      return issue || null;
    } catch (error) {
      logger.error(`Error getting issue by id ${id}:`, error);
      return null;
    }
  }

  async createIssue(issue: Omit<SeoIssue, 'id'>): Promise<SeoIssue> {
    try {
      const [newIssue] = await db.insert(seoIssues).values(issue).returning();
      return newIssue;
    } catch (error) {
      logger.error('Error creating issue:', error);
      throw error;
    }
  }

  async markIssueFixed(id: number): Promise<void> {
    try {
      await db.update(seoIssues)
        .set({ 
          fixed: true,
          fixedDate: new Date()
        })
        .where(eq(seoIssues.id, id));
    } catch (error) {
      logger.error(`Error marking issue ${id} as fixed:`, error);
      throw error;
    }
  }

  async ignoreIssue(id: number, ignore: boolean): Promise<void> {
    try {
      await db.update(seoIssues)
        .set({ ignored: ignore })
        .where(eq(seoIssues.id, id));
    } catch (error) {
      logger.error(`Error setting ignore=${ignore} for issue ${id}:`, error);
      throw error;
    }
  }

  async getFixableIssues(): Promise<SeoIssue[]> {
    try {
      return await db.select().from(seoIssues).where(eq(seoIssues.autoFixable, true));
    } catch (error) {
      logger.error('Error getting fixable issues:', error);
      return [];
    }
  }
  
  async getIssuesByReportId(reportId: number): Promise<SeoIssue[]> {
    try {
      return await db.select()
        .from(seoIssues)
        .where(eq(seoIssues.reportId, reportId))
        .orderBy(desc(seoIssues.severity));
    } catch (error) {
      logger.error(`Error getting issues for report ${reportId}:`, error);
      return [];
    }
  }

  // Page Audits
  async getPageAudits(reportId: number): Promise<PageAudit[]> {
    try {
      return await db.select()
        .from(pageAudits)
        .where(eq(pageAudits.reportId, reportId))
        .orderBy(asc(pageAudits.url));
    } catch (error) {
      logger.error(`Error getting page audits for report ${reportId}:`, error);
      return [];
    }
  }

  async getPageAuditByUrl(url: string): Promise<PageAudit | null> {
    try {
      // Get the most recent audit for this URL
      const [audit] = await db.select()
        .from(pageAudits)
        .where(eq(pageAudits.url, url))
        .orderBy(desc(pageAudits.lastAuditDate))
        .limit(1);
      
      return audit || null;
    } catch (error) {
      logger.error(`Error getting page audit for URL ${url}:`, error);
      return null;
    }
  }

  async createPageAudit(audit: Omit<PageAudit, 'id'>): Promise<PageAudit> {
    try {
      const [newAudit] = await db.insert(pageAudits).values(audit).returning();
      return newAudit;
    } catch (error) {
      logger.error('Error creating page audit:', error);
      throw error;
    }
  }

  // Keywords
  async getKeywordRankings(): Promise<KeywordRanking[]> {
    try {
      return await db.select()
        .from(keywordRankings)
        .orderBy(asc(keywordRankings.keyword));
    } catch (error) {
      logger.error('Error getting keyword rankings:', error);
      return [];
    }
  }

  async createKeywordRanking(keyword: Omit<KeywordRanking, 'id'>): Promise<KeywordRanking> {
    try {
      const [newKeyword] = await db.insert(keywordRankings).values(keyword).returning();
      return newKeyword;
    } catch (error) {
      logger.error('Error creating keyword ranking:', error);
      throw error;
    }
  }

  async updateKeywordRanking(id: number, data: Partial<KeywordRanking>): Promise<void> {
    try {
      await db.update(keywordRankings)
        .set({ ...data, lastUpdated: new Date() })
        .where(eq(keywordRankings.id, id));
    } catch (error) {
      logger.error(`Error updating keyword ranking ${id}:`, error);
      throw error;
    }
  }

  // Content Suggestions
  async getContentSuggestions(): Promise<ContentSuggestion[]> {
    try {
      return await db.select()
        .from(contentSuggestions)
        .orderBy(desc(contentSuggestions.suggestedDate));
    } catch (error) {
      logger.error('Error getting content suggestions:', error);
      return [];
    }
  }

  async createContentSuggestion(suggestion: Omit<ContentSuggestion, 'id'>): Promise<ContentSuggestion> {
    try {
      const [newSuggestion] = await db.insert(contentSuggestions).values(suggestion).returning();
      return newSuggestion;
    } catch (error) {
      logger.error('Error creating content suggestion:', error);
      throw error;
    }
  }

  async markSuggestionImplemented(id: number): Promise<void> {
    try {
      await db.update(contentSuggestions)
        .set({ 
          implemented: true,
          implementedDate: new Date()
        })
        .where(eq(contentSuggestions.id, id));
    } catch (error) {
      logger.error(`Error marking content suggestion ${id} as implemented:`, error);
      throw error;
    }
  }

  // SEO Status
  async getSeoStatus(): Promise<SeoStatusRecord | null> {
    try {
      // Get the current status record, or create a default one if none exists
      const [status] = await db.select().from(seoStatus).limit(1);
      
      if (status) {
        return status;
      }
      
      // Create a default status record if none exists
      const [newStatus] = await db.insert(seoStatus)
        .values({ 
          lastAuditDate: new Date(),
          auditInProgress: false,
          totalPagesAudited: 0,
          totalIssuesFound: 0,
          totalIssuesFixed: 0,
          health: 100
        })
        .returning();
        
      return newStatus;
    } catch (error) {
      logger.error('Error getting SEO status:', error);
      return null;
    }
  }

  async updateSeoStatus(data: Partial<SeoStatusRecord>): Promise<void> {
    try {
      // Make sure we have a status record first
      const status = await this.getSeoStatus();
      
      if (status) {
        await db.update(seoStatus)
          .set(data)
          .where(eq(seoStatus.id, status.id));
      }
    } catch (error) {
      logger.error('Error updating SEO status:', error);
      throw error;
    }
  }

  async markAuditInProgress(inProgress: boolean): Promise<void> {
    try {
      const status = await this.getSeoStatus();
      
      if (status) {
        await db.update(seoStatus)
          .set({ 
            auditInProgress: inProgress,
            lastAuditDate: inProgress ? status.lastAuditDate : new Date()
          })
          .where(eq(seoStatus.id, status.id));
      }
    } catch (error) {
      logger.error(`Error marking audit in progress=${inProgress}:`, error);
      throw error;
    }
  }
}

// Export a singleton instance
export const storageSeo = new DatabaseSeoStorage();