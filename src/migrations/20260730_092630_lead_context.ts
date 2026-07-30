import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`leads\` ADD \`property_type\` text;`)
  await db.run(sql`ALTER TABLE \`leads\` ADD \`location\` text;`)
  await db.run(sql`ALTER TABLE \`leads\` ADD \`source_path\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`leads\` DROP COLUMN \`property_type\`;`)
  await db.run(sql`ALTER TABLE \`leads\` DROP COLUMN \`location\`;`)
  await db.run(sql`ALTER TABLE \`leads\` DROP COLUMN \`source_path\`;`)
}
