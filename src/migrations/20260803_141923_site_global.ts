import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`email\` text DEFAULT 'studio@editorial.co',
  	\`phone\` text DEFAULT '+1 (415) 555-0142',
  	\`address\` text DEFAULT '148 Gallery Row, Suite 3B, San Francisco, CA',
  	\`instagram\` text DEFAULT 'https://instagram.com/editorial',
  	\`facebook\` text DEFAULT 'https://facebook.com/editorial',
  	\`linkedin\` text DEFAULT 'https://linkedin.com/company/editorial',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_site_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_email\` text DEFAULT 'studio@editorial.co',
  	\`version_phone\` text DEFAULT '+1 (415) 555-0142',
  	\`version_address\` text DEFAULT '148 Gallery Row, Suite 3B, San Francisco, CA',
  	\`version_instagram\` text DEFAULT 'https://instagram.com/editorial',
  	\`version_facebook\` text DEFAULT 'https://facebook.com/editorial',
  	\`version_linkedin\` text DEFAULT 'https://linkedin.com/company/editorial',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_v_created_at_idx\` ON \`_site_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_updated_at_idx\` ON \`_site_v\` (\`updated_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site\`;`)
  await db.run(sql`DROP TABLE \`_site_v\`;`)
}
