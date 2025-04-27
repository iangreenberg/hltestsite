/**
 * Types and interfaces for the SEO monitoring and improvement engine
 */

export enum SeverityLevel {
  Critical = 'critical',
  High = 'high',
  Medium = 'medium',
  Low = 'low',
  Info = 'info'
}

export enum IssueCategory {
  MetaTags = 'meta_tags',
  Content = 'content',
  Structure = 'structure',
  Performance = 'performance',
  Technical = 'technical',
  Links = 'links',
  Mobile = 'mobile',
  Schema = 'schema',
  Analytics = 'analytics',
  Security = 'security'
}

export enum FixStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Fixed = 'fixed',
  Failed = 'failed',
  NotApplicable = 'not_applicable'
}

export interface SEOIssue {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  category: IssueCategory;
  url?: string;
  affectedElement?: string;
  recommendedFix?: string;
  autoFixAvailable?: boolean;
  autoFixFunction?: string; // Name of the function that can fix this issue
  autoFixParams?: Record<string, any>; // Parameters needed for the auto-fix function
  autoFixStatus?: FixStatus;
  autoFixAttemptedAt?: Date;
  autoFixResult?: string;
  detected: Date;
  fixed?: Date;
  ignored?: boolean;
}

export interface KeywordRanking {
  keyword: string;
  position: number;
  url: string;
  lastUpdated: Date;
  previousPosition?: number;
  change?: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  timestamp: Date;
  threshold?: number;
  status: 'good' | 'needs_improvement' | 'poor';
  category: 'core_web_vitals' | 'lighthouse' | 'custom';
}

export interface PageAudit {
  url: string;
  title: string;
  metaDescription: string;
  h1: string[];
  wordCount: number;
  issueCount: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  auditedAt: Date;
  issues: SEOIssue[];
  score: number;
}

export interface ContentSuggestion {
  id: string;
  keyword: string;
  title: string;
  suggestedHeadings: string[];
  suggestedWordCount: number;
  competitorUrls: string[];
  expectedDifficulty: 'easy' | 'medium' | 'hard';
  expectedTraffic: 'low' | 'medium' | 'high';
  createdAt: Date;
  implementedAt?: Date;
}

export interface CompetitorData {
  domain: string;
  rankingKeywords: number;
  estimatedTraffic: number;
  topPerformingPages: {
    url: string;
    estimatedTraffic: number;
    keywordCount: number;
  }[];
  lastUpdated: Date;
}

export interface DailySEOReport {
  date: Date;
  totalIssues: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  newIssues: number;
  fixedIssues: number;
  overallScore: number;
  keywordRankings: KeywordRanking[];
  topPriorityFixes: SEOIssue[];
  contentSuggestions: ContentSuggestion[];
  performanceMetrics: PerformanceMetric[];
}

export interface KeywordResearchResult {
  keyword: string;
  searchVolume: number;
  difficulty: number; // 0-100 scale
  relevance: number; // 0-100 scale
  cpc?: number; // Cost per click if available
  competitorRanking?: { 
    domain: string;
    position: number;
  }[];
  suggestedContent?: string[];
  relatedKeywords?: string[];
  trend?: 'up' | 'down' | 'stable';
  seasonality?: string[];
  userIntent?: 'informational' | 'navigational' | 'transactional' | 'commercial';
}

export interface KeywordResearchRequest {
  seedKeywords: string[];
  market?: string;
  locale?: string;
  includeLongTail?: boolean;
  maxResults?: number;
  minSearchVolume?: number;
  maxDifficulty?: number;
}

export interface SEOAction {
  id: string;
  type: 'fix_issue' | 'implement_suggestion' | 'technical_improvement';
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedImpact: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTimeMinutes: number;
  assignedTo?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  createdAt: Date;
  completedAt?: Date;
  relatedIssue?: SEOIssue;
  relatedSuggestion?: ContentSuggestion;
}