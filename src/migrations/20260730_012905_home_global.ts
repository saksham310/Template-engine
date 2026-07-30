import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`icon\` text DEFAULT 'ShieldCheck' NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_features_order_idx\` ON \`home_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_features_parent_id_idx\` ON \`home_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_faqs_order_idx\` ON \`home_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_faqs_parent_id_idx\` ON \`home_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text DEFAULT 'Est. 2026 — Bespoke Care',
  	\`hero_headline\` text DEFAULT 'Expert Cleaning for Modern Spaces',
  	\`hero_body\` text DEFAULT 'We treat interiors like editorial subjects — trained specialists, archival-grade products, and a standard of finish reserved for the spaces you photograph.',
  	\`hero_primary_label\` text DEFAULT 'Request a Quote →',
  	\`hero_primary_href\` text DEFAULT '#book',
  	\`hero_secondary_label\` text DEFAULT 'View recent work',
  	\`hero_secondary_href\` text DEFAULT '/gallery',
  	\`hero_image_id\` integer,
  	\`hero_image_alt\` text DEFAULT 'Sunlit modern living room with clean minimal interior',
  	\`hero_status_text\` text DEFAULT 'Live Status: Professionals active nearby',
  	\`hero_status_metric_label\` text DEFAULT 'Avg. response',
  	\`hero_status_metric_value\` text DEFAULT '~12 min',
  	\`services_eyebrow\` text DEFAULT 'The Services',
  	\`services_headline\` text DEFAULT 'A standard of finish, room by room.',
  	\`features_eyebrow\` text DEFAULT 'Why Choose Us',
  	\`features_headline\` text DEFAULT 'The difference is in the',
  	\`features_headline_accent\` text DEFAULT 'discipline.',
  	\`features_body\` text DEFAULT 'Anyone can leave a room looking clean. We hold four standards that decide whether it stays that way — and whether you ever think about it again.',
  	\`faq_eyebrow\` text DEFAULT 'Common Questions',
  	\`faq_headline\` text DEFAULT 'Answered before',
  	\`faq_headline_accent\` text DEFAULT 'you ask.',
  	\`faq_body\` text DEFAULT 'Still curious? We answer every message ourselves, within the hour.',
  	\`faq_cta_label\` text DEFAULT 'Ask us directly',
  	\`faq_cta_href\` text DEFAULT '/contact',
  	\`quote_eyebrow\` text DEFAULT 'Request a Quote',
  	\`quote_headline\` text DEFAULT 'Request your personalised quote',
  	\`quote_body\` text DEFAULT 'Tell us about your space. Every request is reviewed individually — no fixed rates, no obligation, no payment details.',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_hero_image_idx\` ON \`home\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`icon\` text DEFAULT 'ShieldCheck' NOT NULL,
  	\`description\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_features_order_idx\` ON \`_home_v_version_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_features_parent_id_idx\` ON \`_home_v_version_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_faqs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_faqs_order_idx\` ON \`_home_v_version_faqs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_faqs_parent_id_idx\` ON \`_home_v_version_faqs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_eyebrow\` text DEFAULT 'Est. 2026 — Bespoke Care',
  	\`version_hero_headline\` text DEFAULT 'Expert Cleaning for Modern Spaces',
  	\`version_hero_body\` text DEFAULT 'We treat interiors like editorial subjects — trained specialists, archival-grade products, and a standard of finish reserved for the spaces you photograph.',
  	\`version_hero_primary_label\` text DEFAULT 'Request a Quote →',
  	\`version_hero_primary_href\` text DEFAULT '#book',
  	\`version_hero_secondary_label\` text DEFAULT 'View recent work',
  	\`version_hero_secondary_href\` text DEFAULT '/gallery',
  	\`version_hero_image_id\` integer,
  	\`version_hero_image_alt\` text DEFAULT 'Sunlit modern living room with clean minimal interior',
  	\`version_hero_status_text\` text DEFAULT 'Live Status: Professionals active nearby',
  	\`version_hero_status_metric_label\` text DEFAULT 'Avg. response',
  	\`version_hero_status_metric_value\` text DEFAULT '~12 min',
  	\`version_services_eyebrow\` text DEFAULT 'The Services',
  	\`version_services_headline\` text DEFAULT 'A standard of finish, room by room.',
  	\`version_features_eyebrow\` text DEFAULT 'Why Choose Us',
  	\`version_features_headline\` text DEFAULT 'The difference is in the',
  	\`version_features_headline_accent\` text DEFAULT 'discipline.',
  	\`version_features_body\` text DEFAULT 'Anyone can leave a room looking clean. We hold four standards that decide whether it stays that way — and whether you ever think about it again.',
  	\`version_faq_eyebrow\` text DEFAULT 'Common Questions',
  	\`version_faq_headline\` text DEFAULT 'Answered before',
  	\`version_faq_headline_accent\` text DEFAULT 'you ask.',
  	\`version_faq_body\` text DEFAULT 'Still curious? We answer every message ourselves, within the hour.',
  	\`version_faq_cta_label\` text DEFAULT 'Ask us directly',
  	\`version_faq_cta_href\` text DEFAULT '/contact',
  	\`version_quote_eyebrow\` text DEFAULT 'Request a Quote',
  	\`version_quote_headline\` text DEFAULT 'Request your personalised quote',
  	\`version_quote_body\` text DEFAULT 'Tell us about your space. Every request is reviewed individually — no fixed rates, no obligation, no payment details.',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_version_hero_image_idx\` ON \`_home_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_created_at_idx\` ON \`_home_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_updated_at_idx\` ON \`_home_v\` (\`updated_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_features\`;`)
  await db.run(sql`DROP TABLE \`home_faqs\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_features\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_faqs\`;`)
  await db.run(sql`DROP TABLE \`_home_v\`;`)
}
