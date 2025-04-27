import { db } from "../server/db";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { Pool } from "@neondatabase/serverless";
import * as schema from "../shared/schema";
import { sql } from "drizzle-orm";
import { createLogger } from "../server/logger";

const logger = createLogger("migration");

async function migrateDatabase() {
  try {
    logger.info("[migrate] Starting migration for reportId column in seo_issues table");
    
    // Check if reportId column already exists
    const columnsResult = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'seo_issues' AND column_name = 'report_id'
    `);
    
    if (columnsResult.rows.length === 0) {
      logger.info("[migrate] Adding reportId column to seo_issues table");
      
      // Add the reportId column
      await db.execute(sql`
        ALTER TABLE seo_issues 
        ADD COLUMN report_id INTEGER NOT NULL DEFAULT 1
      `);
      
      logger.info("[migrate] Migration completed successfully");
    } else {
      logger.info("[migrate] reportId column already exists, skipping migration");
    }
    
    logger.info("[migrate] Database schema is up to date");
  } catch (error) {
    logger.error("[migrate] Migration failed:", error);
    process.exit(1);
  }
}

migrateDatabase()
  .then(() => {
    console.log("Migration completed successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration failed:", error);
    process.exit(1);
  });