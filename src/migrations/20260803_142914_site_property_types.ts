import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_property_types\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_property_types_order_idx\` ON \`site_property_types\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_property_types_parent_id_idx\` ON \`site_property_types\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_v_version_property_types\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_v_version_property_types_order_idx\` ON \`_site_v_version_property_types\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_v_version_property_types_parent_id_idx\` ON \`_site_v_version_property_types\` (\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_property_types\`;`)
  await db.run(sql`DROP TABLE \`_site_v_version_property_types\`;`)
}
