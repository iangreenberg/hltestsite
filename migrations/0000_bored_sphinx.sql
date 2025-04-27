CREATE TABLE "content_suggestions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"target_keywords" text[],
	"search_volume" integer DEFAULT 0,
	"difficulty" integer DEFAULT 0,
	"suggested_date" timestamp DEFAULT now() NOT NULL,
	"implemented" boolean DEFAULT false,
	"implemented_date" timestamp,
	"type" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "email_subscription" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "email_subscription_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "keyword_rankings" (
	"id" serial PRIMARY KEY NOT NULL,
	"keyword" text NOT NULL,
	"search_volume" integer DEFAULT 0,
	"difficulty" integer DEFAULT 0,
	"cpc" text,
	"position" integer,
	"url" text,
	"change" integer,
	"last_updated" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "page_audits" (
	"id" serial PRIMARY KEY NOT NULL,
	"report_id" integer NOT NULL,
	"url" text NOT NULL,
	"title" text NOT NULL,
	"meta_description" text,
	"h1" text,
	"h2_count" integer DEFAULT 0,
	"word_count" integer DEFAULT 0,
	"image_count" integer DEFAULT 0,
	"images_with_alt" integer DEFAULT 0,
	"internal_links" integer DEFAULT 0,
	"external_links" integer DEFAULT 0,
	"performance" integer DEFAULT 0,
	"accessibility" integer DEFAULT 0,
	"best_practices" integer DEFAULT 0,
	"seo" integer DEFAULT 0,
	"mobile" integer DEFAULT 0,
	"last_audit_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_issues" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"url" text,
	"severity" text NOT NULL,
	"type" text NOT NULL,
	"fixed" boolean DEFAULT false,
	"ignored" boolean DEFAULT false,
	"fixed_date" timestamp,
	"detected_date" timestamp DEFAULT now() NOT NULL,
	"page_url" text,
	"selector" text,
	"recommendation" text,
	"impact" text,
	"auto_fixable" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "seo_reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"total_issues" jsonb NOT NULL,
	"new_issues" integer NOT NULL,
	"fixed_issues" integer NOT NULL,
	"overall_score" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "seo_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"last_audit_date" timestamp DEFAULT now(),
	"audit_in_progress" boolean DEFAULT false,
	"total_pages_audited" integer DEFAULT 0,
	"total_issues_found" integer DEFAULT 0,
	"total_issues_fixed" integer DEFAULT 0,
	"health" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "waitlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"business" text NOT NULL,
	"message" text,
	"consent" boolean NOT NULL
);
