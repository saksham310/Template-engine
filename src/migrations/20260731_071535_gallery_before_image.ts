import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`gallery\` ADD \`before_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`gallery_before_image_idx\` ON \`gallery\` (\`before_image_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_gallery\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`category\` text DEFAULT 'Residential' NOT NULL,
  	\`description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_gallery\`("id", "title", "image_id", "category", "description", "updated_at", "created_at") SELECT "id", "title", "image_id", "category", "description", "updated_at", "created_at" FROM \`gallery\`;`)
  await db.run(sql`DROP TABLE \`gallery\`;`)
  await db.run(sql`ALTER TABLE \`__new_gallery\` RENAME TO \`gallery\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`gallery_image_idx\` ON \`gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`gallery_updated_at_idx\` ON \`gallery\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gallery_created_at_idx\` ON \`gallery\` (\`created_at\`);`)
}
