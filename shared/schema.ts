import { pgTable, text, serial, boolean, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  business: text("business").notNull(),
  message: text("message"),
  consent: boolean("consent").notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlist).omit({
  id: true,
});

export type InsertWaitlist = z.infer<typeof insertWaitlistSchema>;
export type Waitlist = typeof waitlist.$inferSelect;

export const emailSubscription = pgTable("email_subscription", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
});

export const insertEmailSubscriptionSchema = createInsertSchema(emailSubscription).omit({
  id: true,
});

export type InsertEmailSubscription = z.infer<typeof insertEmailSubscriptionSchema>;
export type EmailSubscription = typeof emailSubscription.$inferSelect;

// Keeping the user schema as it was required by the existing setup
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;

// SEO Database Schema
export const seoReports = pgTable("seo_reports", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull().defaultNow(),
  totalIssues: jsonb("total_issues").notNull(),
  newIssues: integer("new_issues").notNull(),
  fixedIssues: integer("fixed_issues").notNull(),
  overallScore: integer("overall_score").notNull(),
});

export const seoIssues = pgTable("seo_issues", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(), 
  url: text("url"),
  severity: text("severity").notNull(),
  type: text("type").notNull(),
  fixed: boolean("fixed").default(false),
  ignored: boolean("ignored").default(false),
  fixedDate: timestamp("fixed_date"),
  detectedDate: timestamp("detected_date").notNull().defaultNow(),
  pageUrl: text("page_url"),
  selector: text("selector"),
  recommendation: text("recommendation"),
  impact: text("impact"),
  autoFixable: boolean("auto_fixable").default(false),
});

export const pageAudits = pgTable("page_audits", {
  id: serial("id").primaryKey(),
  reportId: integer("report_id").notNull(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  metaDescription: text("meta_description"),
  h1: text("h1"), 
  h2Count: integer("h2_count").default(0),
  wordCount: integer("word_count").default(0),
  imageCount: integer("image_count").default(0),
  imagesWithAlt: integer("images_with_alt").default(0),
  internalLinks: integer("internal_links").default(0),
  externalLinks: integer("external_links").default(0),
  performance: integer("performance").default(0),
  accessibility: integer("accessibility").default(0),
  bestPractices: integer("best_practices").default(0),
  seo: integer("seo").default(0),
  mobile: integer("mobile").default(0),
  lastAuditDate: timestamp("last_audit_date").notNull().defaultNow(),
});

export const keywordRankings = pgTable("keyword_rankings", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull(),
  searchVolume: integer("search_volume").default(0),
  difficulty: integer("difficulty").default(0),
  cpc: text("cpc"),
  position: integer("position"),
  url: text("url"),
  change: integer("change"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const contentSuggestions = pgTable("content_suggestions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  targetKeywords: text("target_keywords").array(),
  searchVolume: integer("search_volume").default(0),
  difficulty: integer("difficulty").default(0),
  suggestedDate: timestamp("suggested_date").notNull().defaultNow(),
  implemented: boolean("implemented").default(false),
  implementedDate: timestamp("implemented_date"),
  type: text("type").notNull(),
});

export const seoStatus = pgTable("seo_status", {
  id: serial("id").primaryKey(),
  lastAuditDate: timestamp("last_audit_date").defaultNow(),
  auditInProgress: boolean("audit_in_progress").default(false),
  totalPagesAudited: integer("total_pages_audited").default(0),
  totalIssuesFound: integer("total_issues_found").default(0),
  totalIssuesFixed: integer("total_issues_fixed").default(0),
  health: integer("health").default(0),
});

// SEO Types
export type SeoReport = typeof seoReports.$inferSelect;
export type SeoIssue = typeof seoIssues.$inferSelect;
export type PageAudit = typeof pageAudits.$inferSelect;
export type KeywordRanking = typeof keywordRankings.$inferSelect;
export type ContentSuggestion = typeof contentSuggestions.$inferSelect;
export type SeoStatusRecord = typeof seoStatus.$inferSelect;

// Insert Types
export const insertSeoReportSchema = createInsertSchema(seoReports).omit({ id: true });
export const insertSeoIssueSchema = createInsertSchema(seoIssues).omit({ id: true });
export const insertPageAuditSchema = createInsertSchema(pageAudits).omit({ id: true });
export const insertKeywordRankingSchema = createInsertSchema(keywordRankings).omit({ id: true });
export const insertContentSuggestionSchema = createInsertSchema(contentSuggestions).omit({ id: true });
export const insertSeoStatusSchema = createInsertSchema(seoStatus).omit({ id: true });

export type InsertSeoReport = z.infer<typeof insertSeoReportSchema>;
export type InsertSeoIssue = z.infer<typeof insertSeoIssueSchema>;
export type InsertPageAudit = z.infer<typeof insertPageAuditSchema>;
export type InsertKeywordRanking = z.infer<typeof insertKeywordRankingSchema>;
export type InsertContentSuggestion = z.infer<typeof insertContentSuggestionSchema>;
export type InsertSeoStatus = z.infer<typeof insertSeoStatusSchema>;
