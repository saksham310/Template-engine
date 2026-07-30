import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`home_features\` DROP COLUMN \`icon\`;`)
  await db.run(sql`ALTER TABLE \`_home_v_version_features\` DROP COLUMN \`icon\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`home_features\` ADD \`icon\` text DEFAULT 'ShieldCheck' NOT NULL;`)
  await db.run(sql`ALTER TABLE \`_home_v_version_features\` ADD \`icon\` text DEFAULT 'ShieldCheck' NOT NULL;`)
}
