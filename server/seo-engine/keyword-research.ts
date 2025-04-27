import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { createLogger } from '../logger';
import { 
  KeywordResearchRequest, 
  KeywordResearchResult 
} from './types';
import { storageSeo } from './storage';

const logger = createLogger('keyword-research');

/**
 * Keyword Research Engine
 * Finds valuable keywords for SEO optimization
 */
export class KeywordResearchEngine {
  private isResearchRunning: boolean = false;
  
  constructor() {
    // Initialize
  }
  
  /**
   * Get the current status of the keyword research engine
   */
  getStatus() {
    return {
      isRunning: this.isResearchRunning
    };
  }
  
  /**
   * Perform keyword research based on seed keywords
   * In a production environment, this would connect to an actual keyword research API
   * Such as SEMrush, Ahrefs, or Google Keyword Planner
   */
  async researchKeywords(request: KeywordResearchRequest): Promise<KeywordResearchResult[]> {
    if (this.isResearchRunning) {
      throw new Error('Keyword research is already running');
    }
    
    this.isResearchRunning = true;
    logger.info(`Starting keyword research for ${request.seedKeywords.join(', ')}`);
    
    try {
      const results: KeywordResearchResult[] = [];
      
      // Process each seed keyword
      for (const seedKeyword of request.seedKeywords) {
        // Generate keyword variations and related keywords
        const variations = await this.generateKeywordVariations(seedKeyword);
        
        // Add the seed keyword itself
        results.push(await this.analyzeKeyword(seedKeyword));
        
        // Add variations and related keywords
        for (const variation of variations) {
          results.push(await this.analyzeKeyword(variation));
        }
      }
      
      // Save all the research results
      for (const result of results) {
        await storageSeo.saveKeywordResearchResult(result);
      }
      
      this.isResearchRunning = false;
      logger.info(`Keyword research completed with ${results.length} results`);
      
      return results;
    } catch (error) {
      this.isResearchRunning = false;
      logger.error('Error performing keyword research:', error);
      throw error;
    }
  }
  
  /**
   * Generate variations and related keywords for a seed keyword
   * In a production environment, this would use actual keyword data API
   */
  private async generateKeywordVariations(seedKeyword: string): Promise<string[]> {
    // Common modifiers for hemp business related keywords
    const prefixes = ['best', 'top', 'how to', 'legal', 'affordable', 'premium', 'organic'];
    const suffixes = ['business', 'products', 'manufacturing', 'compliance', 'license', 'marketing', 'sales'];
    const related = ['cbd', 'products', 'startup', 'regulations', 'packaging', 'marketing', 'distribution'];
    
    const variations: string[] = [];
    
    // Generate prefix variations
    for (const prefix of prefixes) {
      variations.push(`${prefix} ${seedKeyword}`);
    }
    
    // Generate suffix variations
    for (const suffix of suffixes) {
      variations.push(`${seedKeyword} ${suffix}`);
    }
    
    // Generate related keywords
    for (const rel of related) {
      if (!seedKeyword.includes(rel)) {
        variations.push(`${seedKeyword} ${rel}`);
      }
    }
    
    // Generate long-tail combinations (2-3 word phrases)
    for (let i = 0; i < prefixes.length; i++) {
      for (let j = 0; j < suffixes.length; j++) {
        if (i % 3 === j % 3) { // Just to limit the number of combinations
          variations.push(`${prefixes[i]} ${seedKeyword} ${suffixes[j]}`);
        }
      }
    }
    
    // Return unique variations only
    return [...new Set(variations)];
  }
  
  /**
   * Analyze a keyword for search volume, difficulty, etc.
   * In a production environment, this would call an actual SEO data API
   */
  private async analyzeKeyword(keyword: string): Promise<KeywordResearchResult> {
    // Generate realistic but simulated data for the keyword
    // In a real implementation, this would fetch data from SEMrush, Ahrefs, etc.
    
    // Use a simple hash function to generate consistent values for the same keyword
    const hashCode = this.simpleHash(keyword);
    
    // Generate search volume (50-10000)
    const searchVolume = 50 + (hashCode % 100) * 100;
    
    // Generate difficulty (0-100)
    const difficulty = 10 + (hashCode % 90);
    
    // Generate relevance (0-100)
    const relevance = Math.min(100, Math.max(50, 100 - (keyword.split(' ').length * 5)));
    
    // Generate CPC ($0.10-$5.00)
    const cpc = (0.10 + (hashCode % 50) / 10).toFixed(2);
    
    // Generate trend
    const trends = ['up', 'down', 'stable'];
    const trend = trends[hashCode % 3] as 'up' | 'down' | 'stable';
    
    // Generate user intent
    const intents = ['informational', 'navigational', 'transactional', 'commercial'];
    const userIntent = intents[hashCode % 4] as 'informational' | 'navigational' | 'transactional' | 'commercial';
    
    // Generate competitor rankings
    const competitorRanking = [
      { domain: 'competitor1.com', position: 1 + (hashCode % 5) },
      { domain: 'competitor2.com', position: 3 + (hashCode % 7) },
      { domain: 'competitor3.com', position: 6 + (hashCode % 4) }
    ];
    
    // Generate related keywords
    const baseKeywords = ['hemp', 'cbd', 'thc', 'cannabis', 'business', 'legal', 'product', 'license'];
    const relatedKeywords = baseKeywords
      .filter(k => !keyword.includes(k))
      .slice(0, 4)
      .map(k => `${keyword} ${k}`);
    
    // Generate content suggestions
    const contentIdeas = [
      `Ultimate guide to ${keyword}`,
      `How to start a ${keyword} business`,
      `${keyword} regulations explained`,
      `Best practices for ${keyword} marketing`
    ];
    
    // Return the analyzed keyword data
    return {
      keyword,
      searchVolume,
      difficulty,
      relevance,
      cpc: parseFloat(cpc),
      competitorRanking,
      relatedKeywords,
      suggestedContent: contentIdeas,
      trend,
      userIntent
    };
  }
  
  /**
   * Simple hash function to generate consistent values for the same input
   */
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
  
  /**
   * Find topics to create content for based on keyword research
   */
  async suggestContentTopics(minSearchVolume: number = 100, limit: number = 10): Promise<ContentTopic[]> {
    try {
      // Get the top keywords
      const keywords = await storageSeo.getTopKeywords(50, minSearchVolume);
      
      // Group keywords by topic
      const topicMap = new Map<string, ContentTopic>();
      
      for (const keyword of keywords) {
        // Extract the main topic from the keyword
        const words = keyword.keyword.split(' ');
        let topic = '';
        
        if (words.length === 1) {
          topic = words[0];
        } else if (words.length === 2) {
          topic = `${words[0]} ${words[1]}`;
        } else {
          // For longer keywords, use the first two words as the topic
          topic = `${words[0]} ${words[1]}`;
        }
        
        if (!topicMap.has(topic)) {
          topicMap.set(topic, {
            id: uuidv4(),
            topic,
            totalSearchVolume: 0,
            averageDifficulty: 0,
            keywords: [],
            suggestedTitle: '',
            suggestedSubheadings: []
          });
        }
        
        const topicData = topicMap.get(topic)!;
        topicData.keywords.push(keyword);
        topicData.totalSearchVolume += keyword.searchVolume;
      }
      
      // Calculate average difficulty and create suggested titles/subheadings
      for (const [topic, data] of topicMap.entries()) {
        const totalDifficulty = data.keywords.reduce((sum, k) => sum + k.difficulty, 0);
        data.averageDifficulty = Math.round(totalDifficulty / data.keywords.length);
        
        // Generate a title based on the topic and top keywords
        const mainKeyword = data.keywords.sort((a, b) => b.searchVolume - a.searchVolume)[0];
        data.suggestedTitle = this.generateContentTitle(topic, mainKeyword);
        
        // Generate subheadings based on related keywords
        data.suggestedSubheadings = this.generateSubheadings(topic, data.keywords);
      }
      
      // Sort by total search volume and return top results
      const sortedTopics = Array.from(topicMap.values())
        .sort((a, b) => b.totalSearchVolume - a.totalSearchVolume)
        .slice(0, limit);
      
      return sortedTopics;
    } catch (error) {
      logger.error('Error suggesting content topics:', error);
      throw error;
    }
  }
  
  /**
   * Generate a compelling content title based on a topic
   */
  private generateContentTitle(topic: string, keyword: KeywordResearchResult): string {
    const titleTemplates = [
      `The Ultimate Guide to {{topic}} for 2025`,
      `How to {{topic}}: A Complete Step-by-Step Guide`,
      `{{topic}} 101: Everything You Need to Know`,
      `{{topic}} Explained: Best Practices and Tips`,
      `10 Ways to Improve Your {{topic}} Strategy Today`,
      `Why {{topic}} Matters for Your Hemp Business Success`
    ];
    
    // Choose a template based on user intent
    let templateIndex = 0;
    
    if (keyword.userIntent === 'informational') {
      templateIndex = 0; // Ultimate guide
    } else if (keyword.userIntent === 'transactional') {
      templateIndex = 1; // How to
    } else if (keyword.userIntent === 'commercial') {
      templateIndex = 4; // 10 ways
    }
    
    // Replace placeholders
    const titleTemplate = titleTemplates[templateIndex];
    return titleTemplate.replace('{{topic}}', this.capitalizeWords(topic));
  }
  
  /**
   * Generate subheadings based on keywords
   */
  private generateSubheadings(topic: string, keywords: KeywordResearchResult[]): string[] {
    const subheadings = [
      `What is ${this.capitalizeWords(topic)}?`,
      `Benefits of ${this.capitalizeWords(topic)} for Hemp Businesses`,
      `How to Get Started with ${this.capitalizeWords(topic)}`,
      `Common Challenges in ${this.capitalizeWords(topic)}`,
      `Best Practices for ${this.capitalizeWords(topic)} Success`
    ];
    
    // Add subheadings based on related keywords
    const relatedKeywords = new Set<string>();
    keywords.forEach(k => {
      if (k.relatedKeywords) {
        k.relatedKeywords.forEach(rk => relatedKeywords.add(rk));
      }
    });
    
    // Take up to 3 related keywords and create subheadings
    Array.from(relatedKeywords).slice(0, 3).forEach(relatedKeyword => {
      const simpleKeyword = relatedKeyword.replace(topic, '').trim();
      if (simpleKeyword) {
        subheadings.push(`${this.capitalizeWords(topic)} and ${this.capitalizeWords(simpleKeyword)}: What You Need to Know`);
      }
    });
    
    return subheadings;
  }
  
  /**
   * Capitalize the first letter of each word
   */
  private capitalizeWords(str: string): string {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

/**
 * Content topic interface
 */
interface ContentTopic {
  id: string;
  topic: string;
  totalSearchVolume: number;
  averageDifficulty: number;
  keywords: KeywordResearchResult[];
  suggestedTitle: string;
  suggestedSubheadings: string[];
}

// Export a singleton instance
export const keywordResearchEngine = new KeywordResearchEngine();