import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_add_ons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`meta\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_add_ons_order_idx\` ON \`home_add_ons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_add_ons_parent_id_idx\` ON \`home_add_ons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_rels_order_idx\` ON \`home_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_parent_idx\` ON \`home_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_path_idx\` ON \`home_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_services_id_idx\` ON \`home_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_version_add_ons\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`meta\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_add_ons_order_idx\` ON \`_home_v_version_add_ons\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_add_ons_parent_id_idx\` ON \`_home_v_version_add_ons\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_rels_order_idx\` ON \`_home_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_rels_parent_idx\` ON \`_home_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_rels_path_idx\` ON \`_home_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_rels_services_id_idx\` ON \`_home_v_rels\` (\`services_id\`);`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`_order\` text;`)
  await db.run(sql`CREATE INDEX \`services__order_idx\` ON \`services\` (\`_order\`);`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`services_lead_badge\` text DEFAULT 'Signature';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`services_lead_cta_label\` text DEFAULT 'Start Here';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`services_add_ons_badge\` text DEFAULT 'Add-ons';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`services_add_ons_title\` text DEFAULT 'À La Carte';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`services_membership_badge\` text DEFAULT 'Membership';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`services_membership_title\` text DEFAULT 'Recurring care, on your schedule.';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`services_membership_cta_label\` text DEFAULT 'See plans';`)
  await db.run(sql`ALTER TABLE \`home\` ADD \`services_membership_cta_href\` text DEFAULT '/#book';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_services_lead_badge\` text DEFAULT 'Signature';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_services_lead_cta_label\` text DEFAULT 'Start Here';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_services_add_ons_badge\` text DEFAULT 'Add-ons';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_services_add_ons_title\` text DEFAULT 'À La Carte';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_services_membership_badge\` text DEFAULT 'Membership';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_services_membership_title\` text DEFAULT 'Recurring care, on your schedule.';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_services_membership_cta_label\` text DEFAULT 'See plans';`)
  await db.run(sql`ALTER TABLE \`_home_v\` ADD \`version_services_membership_cta_href\` text DEFAULT '/#book';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_add_ons\`;`)
  await db.run(sql`DROP TABLE \`home_rels\`;`)
  await db.run(sql`DROP TABLE \`_home_v_version_add_ons\`;`)
  await db.run(sql`DROP TABLE \`_home_v_rels\`;`)
  await db.run(sql`DROP INDEX \`services__order_idx\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`_order\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`services_lead_badge\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`services_lead_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`services_add_ons_badge\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`services_add_ons_title\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`services_membership_badge\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`services_membership_title\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`services_membership_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`home\` DROP COLUMN \`services_membership_cta_href\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_services_lead_badge\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_services_lead_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_services_add_ons_badge\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_services_add_ons_title\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_services_membership_badge\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_services_membership_title\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_services_membership_cta_label\`;`)
  await db.run(sql`ALTER TABLE \`_home_v\` DROP COLUMN \`version_services_membership_cta_href\`;`)
}
