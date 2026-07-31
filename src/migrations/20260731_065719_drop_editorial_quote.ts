import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`editorial_quote_quote\`;`)
  await db.run(sql`ALTER TABLE \`services\` DROP COLUMN \`editorial_quote_citation\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`services\` ADD \`editorial_quote_quote\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`services\` ADD \`editorial_quote_citation\` text;`)
}
