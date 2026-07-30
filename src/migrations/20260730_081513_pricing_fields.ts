import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`services_price_notes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`note\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_price_notes_order_idx\` ON \`services_price_notes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_price_notes_parent_id_idx\` ON \`services_price_notes\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`price\` text;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`price_unit\` text DEFAULT 'per visit';`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`price_popular\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`pricing_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`pricing_headline\` text DEFAULT 'Priced by the room, not the hour.';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`pricing_body\` text DEFAULT 'Published rates for our most-requested work. Anything outside the listed scope is quoted after a walkthrough.';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`pricing_cta_label\` text DEFAULT 'Request a quote';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`pricing_cta_href\` text DEFAULT '/#book';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`pricing_card_cta_label\` text DEFAULT 'Select & book';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`pricing_included_label\` text DEFAULT 'What''s included';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`pricing_popular_label\` text DEFAULT 'Most booked';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`pricing_view_all_label\` text DEFAULT 'View all services';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_pricing_enabled\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_pricing_headline\` text DEFAULT 'Priced by the room, not the hour.';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_pricing_body\` text DEFAULT 'Published rates for our most-requested work. Anything outside the listed scope is quoted after a walkthrough.';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_pricing_cta_label\` text DEFAULT 'Request a quote';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_pricing_cta_href\` text DEFAULT '/#book';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_pricing_card_cta_label\` text DEFAULT 'Select & book';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_pricing_included_label\` text DEFAULT 'What''s included';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_pricing_popular_label\` text DEFAULT 'Most booked';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_pricing_view_all_label\` text DEFAULT 'View all services';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`services_price_notes\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`price\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`price_unit\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`price_popular\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`pricing_enabled\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`pricing_headline\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`pricing_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`pricing_cta_href\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`pricing_card_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`pricing_included_label\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`pricing_popular_label\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`pricing_view_all_label\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_pricing_enabled\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_pricing_headline\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_pricing_body\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_pricing_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_pricing_cta_href\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_pricing_card_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_pricing_included_label\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_pricing_popular_label\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_pricing_view_all_label\`;`)
}
