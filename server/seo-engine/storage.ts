import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLogger } from '../logger';
import {
  SEOIssue,
  PageAudit,
  KeywordRanking,
  ContentSuggestion,
  DailySEOReport,
  SEOAction,
  CompetitorData,
  PerformanceMetric,
  KeywordResearchResult,
  FixStatus
} from './types';

const logger = createLogger('seo-storage');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../seo-data');

/**
 * Interface for SEO storage operations
 */
export interface SEOStorage {
  // Page audits
  savePageAudit(audit: PageAudit): Promise<void>;
  getPageAudit(url: string): Promise<PageAudit | null>;
  getAllPageAudits(): Promise<PageAudit[]>;
  
  // SEO issues
  saveIssue(issue: SEOIssue): Promise<void>;
  getIssue(id: string): Promise<SEOIssue | null>;
  getAllIssues(): Promise<SEOIssue[]>;
  markIssueFixed(id: string): Promise<void>;
  ignoreIssue(id: string, ignored: boolean): Promise<void>;
  
  // Keywords
  saveKeywordRanking(keyword: KeywordRanking): Promise<void>;
  getKeywordRankings(): Promise<KeywordRanking[]>;
  
  // Keyword Research
  saveKeywordResearchResult(result: KeywordResearchResult): Promise<void>;
  getKeywordResearchResults(keyword?: string): Promise<KeywordResearchResult[]>;
  getTopKeywords(limit?: number, minSearchVolume?: number): Promise<KeywordResearchResult[]>;
  
  // Content suggestions
  saveContentSuggestion(suggestion: ContentSuggestion): Promise<void>;
  getContentSuggestions(): Promise<ContentSuggestion[]>;
  markSuggestionImplemented(id: string): Promise<void>;
  
  // SEO actions
  saveAction(action: SEOAction): Promise<void>;
  getActions(status?: string): Promise<SEOAction[]>;
  updateActionStatus(id: string, status: string): Promise<void>;
  
  // Reports
  saveDailyReport(report: DailySEOReport): Promise<void>;
  getDailyReports(limit?: number): Promise<DailySEOReport[]>;
  getLatestReport(): Promise<DailySEOReport | null>;
  
  // Competitor data
  saveCompetitorData(competitor: CompetitorData): Promise<void>;
  getCompetitorData(domain: string): Promise<CompetitorData | null>;
  getAllCompetitorData(): Promise<CompetitorData[]>;
  
  // Performance metrics
  savePerformanceMetric(metric: PerformanceMetric): Promise<void>;
  getPerformanceMetrics(name?: string, limit?: number): Promise<PerformanceMetric[]>;
}

/**
 * JSON file-based implementation of SEO storage
 */
class FileSEOStorage implements SEOStorage {
  constructor() {
    this.ensureDirectoriesExist();
  }
  
  private ensureDirectoriesExist(): void {
    const directories = [
      DATA_DIR,
      path.join(DATA_DIR, 'audits'),
      path.join(DATA_DIR, 'issues'),
      path.join(DATA_DIR, 'keywords'),
      path.join(DATA_DIR, 'keyword-research'),
      path.join(DATA_DIR, 'suggestions'),
      path.join(DATA_DIR, 'actions'),
      path.join(DATA_DIR, 'reports'),
      path.join(DATA_DIR, 'competitors'),
      path.join(DATA_DIR, 'metrics')
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        logger.info(`Created directory: ${dir}`);
      }
    });
  }
  
  private async readJsonFile<T>(filePath: string): Promise<T | null> {
    try {
      if (!fs.existsSync(filePath)) {
        return null;
      }
      
      const data = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(data) as T;
    } catch (error) {
      logger.error(`Error reading file ${filePath}:`, error);
      return null;
    }
  }
  
  private async writeJsonFile<T>(filePath: string, data: T): Promise<void> {
    try {
      await fs.promises.writeFile(
        filePath, 
        JSON.stringify(data, null, 2), 
        'utf8'
      );
    } catch (error) {
      logger.error(`Error writing file ${filePath}:`, error);
      throw error;
    }
  }
  
  private async readDirectory<T>(dirPath: string): Promise<T[]> {
    try {
      if (!fs.existsSync(dirPath)) {
        return [];
      }
      
      const files = await fs.promises.readdir(dirPath);
      const jsonFiles = files.filter(file => file.endsWith('.json'));
      
      const results: T[] = [];
      for (const file of jsonFiles) {
        const data = await this.readJsonFile<T>(path.join(dirPath, file));
        if (data) {
          results.push(data);
        }
      }
      
      return results;
    } catch (error) {
      logger.error(`Error reading directory ${dirPath}:`, error);
      return [];
    }
  }
  
  // URL to filename conversion (handles special characters)
  private urlToFilename(url: string): string {
    return encodeURIComponent(url.replace(/https?:\/\//, ''))
      .replace(/%/g, '_')
      .replace(/\./g, '-') + '.json';
  }
  
  // Page audits implementation
  async savePageAudit(audit: PageAudit): Promise<void> {
    const filename = this.urlToFilename(audit.url);
    const filePath = path.join(DATA_DIR, 'audits', filename);
    await this.writeJsonFile(filePath, audit);
  }
  
  async getPageAudit(url: string): Promise<PageAudit | null> {
    const filename = this.urlToFilename(url);
    const filePath = path.join(DATA_DIR, 'audits', filename);
    return this.readJsonFile<PageAudit>(filePath);
  }
  
  async getAllPageAudits(): Promise<PageAudit[]> {
    return this.readDirectory<PageAudit>(path.join(DATA_DIR, 'audits'));
  }
  
  // SEO issues implementation
  async saveIssue(issue: SEOIssue): Promise<void> {
    const filePath = path.join(DATA_DIR, 'issues', `${issue.id}.json`);
    await this.writeJsonFile(filePath, issue);
  }
  
  async getIssue(id: string): Promise<SEOIssue | null> {
    const filePath = path.join(DATA_DIR, 'issues', `${id}.json`);
    return this.readJsonFile<SEOIssue>(filePath);
  }
  
  async getAllIssues(): Promise<SEOIssue[]> {
    return this.readDirectory<SEOIssue>(path.join(DATA_DIR, 'issues'));
  }
  
  async markIssueFixed(id: string): Promise<void> {
    const issue = await this.getIssue(id);
    if (issue) {
      issue.fixed = new Date();
      await this.saveIssue(issue);
    }
  }
  
  async ignoreIssue(id: string, ignored: boolean): Promise<void> {
    const issue = await this.getIssue(id);
    if (issue) {
      issue.ignored = ignored;
      await this.saveIssue(issue);
    }
  }
  
  // Keywords implementation
  async saveKeywordRanking(keyword: KeywordRanking): Promise<void> {
    const filePath = path.join(DATA_DIR, 'keywords', `${encodeURIComponent(keyword.keyword)}.json`);
    await this.writeJsonFile(filePath, keyword);
  }
  
  async getKeywordRankings(): Promise<KeywordRanking[]> {
    return this.readDirectory<KeywordRanking>(path.join(DATA_DIR, 'keywords'));
  }
  
  // Keyword Research Implementation
  async saveKeywordResearchResult(result: KeywordResearchResult): Promise<void> {
    // Ensure the keyword research directory exists
    const dirPath = path.join(DATA_DIR, 'keyword-research');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    const filePath = path.join(dirPath, `${encodeURIComponent(result.keyword)}.json`);
    await this.writeJsonFile(filePath, result);
  }
  
  async getKeywordResearchResults(keyword?: string): Promise<KeywordResearchResult[]> {
    const dirPath = path.join(DATA_DIR, 'keyword-research');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      return [];
    }
    
    const results = await this.readDirectory<KeywordResearchResult>(dirPath);
    
    if (keyword) {
      return results.filter(result => 
        result.keyword.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    return results;
  }
  
  async getTopKeywords(limit: number = 10, minSearchVolume: number = 100): Promise<KeywordResearchResult[]> {
    const results = await this.getKeywordResearchResults();
    
    // Filter by minimum search volume
    const filteredResults = results.filter(result => result.searchVolume >= minSearchVolume);
    
    // Sort by relevance score * search volume (combination of relevance and popularity)
    filteredResults.sort((a, b) => {
      const scoreA = a.relevance * a.searchVolume;
      const scoreB = b.relevance * b.searchVolume;
      return scoreB - scoreA;
    });
    
    return filteredResults.slice(0, limit);
  }
  
  // Content suggestions implementation
  async saveContentSuggestion(suggestion: ContentSuggestion): Promise<void> {
    const filePath = path.join(DATA_DIR, 'suggestions', `${suggestion.id}.json`);
    await this.writeJsonFile(filePath, suggestion);
  }
  
  async getContentSuggestions(): Promise<ContentSuggestion[]> {
    return this.readDirectory<ContentSuggestion>(path.join(DATA_DIR, 'suggestions'));
  }
  
  async markSuggestionImplemented(id: string): Promise<void> {
    const suggestion = await this.readJsonFile<ContentSuggestion>(
      path.join(DATA_DIR, 'suggestions', `${id}.json`)
    );
    
    if (suggestion) {
      suggestion.implementedAt = new Date();
      await this.writeJsonFile(
        path.join(DATA_DIR, 'suggestions', `${id}.json`),
        suggestion
      );
    }
  }
  
  // SEO actions implementation
  async saveAction(action: SEOAction): Promise<void> {
    const filePath = path.join(DATA_DIR, 'actions', `${action.id}.json`);
    await this.writeJsonFile(filePath, action);
  }
  
  async getActions(status?: string): Promise<SEOAction[]> {
    const actions = await this.readDirectory<SEOAction>(path.join(DATA_DIR, 'actions'));
    
    if (status) {
      return actions.filter(action => action.status === status);
    }
    
    return actions;
  }
  
  async updateActionStatus(id: string, status: string): Promise<void> {
    const action = await this.readJsonFile<SEOAction>(
      path.join(DATA_DIR, 'actions', `${id}.json`)
    );
    
    if (action) {
      action.status = status as any;
      if (status === 'completed') {
        action.completedAt = new Date();
      }
      
      await this.writeJsonFile(
        path.join(DATA_DIR, 'actions', `${id}.json`),
        action
      );
    }
  }
  
  // Reports implementation
  async saveDailyReport(report: DailySEOReport): Promise<void> {
    const dateStr = report.date.toISOString().split('T')[0];
    const filePath = path.join(DATA_DIR, 'reports', `${dateStr}.json`);
    await this.writeJsonFile(filePath, report);
  }
  
  async getDailyReports(limit?: number): Promise<DailySEOReport[]> {
    const reports = await this.readDirectory<DailySEOReport>(path.join(DATA_DIR, 'reports'));
    
    reports.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    if (limit && limit > 0) {
      return reports.slice(0, limit);
    }
    
    return reports;
  }
  
  async getLatestReport(): Promise<DailySEOReport | null> {
    const reports = await this.getDailyReports(1);
    return reports.length > 0 ? reports[0] : null;
  }
  
  // Competitor data implementation
  async saveCompetitorData(competitor: CompetitorData): Promise<void> {
    const filePath = path.join(DATA_DIR, 'competitors', `${encodeURIComponent(competitor.domain)}.json`);
    await this.writeJsonFile(filePath, competitor);
  }
  
  async getCompetitorData(domain: string): Promise<CompetitorData | null> {
    const filePath = path.join(DATA_DIR, 'competitors', `${encodeURIComponent(domain)}.json`);
    return this.readJsonFile<CompetitorData>(filePath);
  }
  
  async getAllCompetitorData(): Promise<CompetitorData[]> {
    return this.readDirectory<CompetitorData>(path.join(DATA_DIR, 'competitors'));
  }
  
  // Performance metrics implementation
  async savePerformanceMetric(metric: PerformanceMetric): Promise<void> {
    const dateStr = metric.timestamp.toISOString().split('T')[0];
    const filePath = path.join(
      DATA_DIR, 
      'metrics', 
      `${encodeURIComponent(metric.name)}_${dateStr}.json`
    );
    await this.writeJsonFile(filePath, metric);
  }
  
  async getPerformanceMetrics(name?: string, limit?: number): Promise<PerformanceMetric[]> {
    const metrics = await this.readDirectory<PerformanceMetric>(path.join(DATA_DIR, 'metrics'));
    
    let filteredMetrics = metrics;
    if (name) {
      filteredMetrics = metrics.filter(m => m.name === name);
    }
    
    filteredMetrics.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    if (limit && limit > 0) {
      return filteredMetrics.slice(0, limit);
    }
    
    return filteredMetrics;
  }
}

// Export singleton instance
export const storageSeo = new FileSEOStorage();