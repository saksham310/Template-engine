import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_gallery_category" AS ENUM('Residential', 'Commercial', 'Specialized');
  CREATE TYPE "public"."enum_leads_status" AS ENUM('New', 'Contacted', 'Quoted', 'Converted');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"order" numeric DEFAULT 99,
  	"blurb" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_price_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"note" varchar NOT NULL
  );
  
  CREATE TABLE "services_technical_specs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "services_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL
  );
  
  CREATE TABLE "services_sidebar_inclusions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "services_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"category_id" integer NOT NULL,
  	"duration_label" varchar,
  	"hero_headline" varchar NOT NULL,
  	"hero_subheadline" varchar,
  	"hero_image_id" integer,
  	"hero_image_url" varchar,
  	"tagline" varchar,
  	"marketing" varchar,
  	"price" varchar,
  	"price_unit" varchar DEFAULT 'per visit',
  	"price_popular" boolean DEFAULT false,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"before_image_id" integer,
  	"image_id" integer NOT NULL,
  	"category" "enum_gallery_category" DEFAULT 'Residential' NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"featured_image_id" integer,
  	"excerpt" varchar,
  	"content" jsonb,
  	"published_date" timestamp(3) with time zone,
  	"author" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leads" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"service_requested_id" integer,
  	"property_type" varchar,
  	"location" varchar,
  	"message" varchar,
  	"status" "enum_leads_status" DEFAULT 'New',
  	"source" varchar DEFAULT 'service-detail',
  	"source_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"services_id" integer,
  	"gallery_id" integer,
  	"posts_id" integer,
  	"leads_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_add_ons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"meta" varchar NOT NULL
  );
  
  CREATE TABLE "home_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_headline" varchar DEFAULT 'Expert Cleaning for Modern Spaces',
  	"hero_body" varchar DEFAULT 'We treat interiors like editorial subjects — trained specialists, archival-grade products, and a standard of finish reserved for the spaces you photograph.',
  	"hero_image_id" integer,
  	"hero_image_alt" varchar DEFAULT 'Sunlit modern living room with clean minimal interior',
  	"services_eyebrow" varchar DEFAULT 'The Services',
  	"services_headline" varchar DEFAULT 'A standard of finish, room by room.',
  	"services_lead_cta_label" varchar DEFAULT 'Start Here',
  	"services_add_ons_badge" varchar DEFAULT 'Add-ons',
  	"services_add_ons_title" varchar DEFAULT 'À La Carte',
  	"pricing_enabled" boolean DEFAULT true,
  	"pricing_headline" varchar DEFAULT 'Priced by the room, not the hour.',
  	"pricing_body" varchar DEFAULT 'Published rates for our most-requested work. Anything outside the listed scope is quoted after a walkthrough.',
  	"pricing_cta_label" varchar DEFAULT 'Request a quote',
  	"pricing_cta_href" varchar DEFAULT '/#book',
  	"pricing_card_cta_label" varchar DEFAULT 'Select & book',
  	"pricing_included_label" varchar DEFAULT 'What''s included',
  	"pricing_popular_label" varchar DEFAULT 'Most booked',
  	"pricing_view_all_label" varchar DEFAULT 'View all services',
  	"features_eyebrow" varchar DEFAULT 'Why Choose Us',
  	"features_headline" varchar DEFAULT 'The difference is in the',
  	"features_headline_accent" varchar DEFAULT 'discipline.',
  	"features_body" varchar DEFAULT 'Anyone can leave a room looking clean. We hold four standards that decide whether it stays that way — and whether you ever think about it again.',
  	"faq_eyebrow" varchar DEFAULT 'Common Questions',
  	"faq_headline" varchar DEFAULT 'Answered before',
  	"faq_headline_accent" varchar DEFAULT 'you ask.',
  	"faq_body" varchar DEFAULT 'Still curious? We answer every message ourselves, within the hour.',
  	"faq_cta_label" varchar DEFAULT 'Ask us directly',
  	"faq_cta_href" varchar DEFAULT '/contact',
  	"quote_eyebrow" varchar DEFAULT 'Request a Quote',
  	"quote_headline" varchar DEFAULT 'Request your personalised quote',
  	"quote_body" varchar DEFAULT 'Tell us about your space. Every request is reviewed individually — no fixed rates, no obligation, no payment details.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "_home_v_version_add_ons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"meta" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_headline" varchar DEFAULT 'Expert Cleaning for Modern Spaces',
  	"version_hero_body" varchar DEFAULT 'We treat interiors like editorial subjects — trained specialists, archival-grade products, and a standard of finish reserved for the spaces you photograph.',
  	"version_hero_image_id" integer,
  	"version_hero_image_alt" varchar DEFAULT 'Sunlit modern living room with clean minimal interior',
  	"version_services_eyebrow" varchar DEFAULT 'The Services',
  	"version_services_headline" varchar DEFAULT 'A standard of finish, room by room.',
  	"version_services_lead_cta_label" varchar DEFAULT 'Start Here',
  	"version_services_add_ons_badge" varchar DEFAULT 'Add-ons',
  	"version_services_add_ons_title" varchar DEFAULT 'À La Carte',
  	"version_pricing_enabled" boolean DEFAULT true,
  	"version_pricing_headline" varchar DEFAULT 'Priced by the room, not the hour.',
  	"version_pricing_body" varchar DEFAULT 'Published rates for our most-requested work. Anything outside the listed scope is quoted after a walkthrough.',
  	"version_pricing_cta_label" varchar DEFAULT 'Request a quote',
  	"version_pricing_cta_href" varchar DEFAULT '/#book',
  	"version_pricing_card_cta_label" varchar DEFAULT 'Select & book',
  	"version_pricing_included_label" varchar DEFAULT 'What''s included',
  	"version_pricing_popular_label" varchar DEFAULT 'Most booked',
  	"version_pricing_view_all_label" varchar DEFAULT 'View all services',
  	"version_features_eyebrow" varchar DEFAULT 'Why Choose Us',
  	"version_features_headline" varchar DEFAULT 'The difference is in the',
  	"version_features_headline_accent" varchar DEFAULT 'discipline.',
  	"version_features_body" varchar DEFAULT 'Anyone can leave a room looking clean. We hold four standards that decide whether it stays that way — and whether you ever think about it again.',
  	"version_faq_eyebrow" varchar DEFAULT 'Common Questions',
  	"version_faq_headline" varchar DEFAULT 'Answered before',
  	"version_faq_headline_accent" varchar DEFAULT 'you ask.',
  	"version_faq_body" varchar DEFAULT 'Still curious? We answer every message ourselves, within the hour.',
  	"version_faq_cta_label" varchar DEFAULT 'Ask us directly',
  	"version_faq_cta_href" varchar DEFAULT '/contact',
  	"version_quote_eyebrow" varchar DEFAULT 'Request a Quote',
  	"version_quote_headline" varchar DEFAULT 'Request your personalised quote',
  	"version_quote_body" varchar DEFAULT 'Tell us about your space. Every request is reviewed individually — no fixed rates, no obligation, no payment details.',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_home_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"services_id" integer
  );
  
  CREATE TABLE "site_property_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar DEFAULT 'studio@editorial.co',
  	"phone" varchar DEFAULT '+1 (415) 555-0142',
  	"address" varchar DEFAULT '148 Gallery Row, Suite 3B, San Francisco, CA',
  	"instagram" varchar DEFAULT 'https://instagram.com/editorial',
  	"facebook" varchar DEFAULT 'https://facebook.com/editorial',
  	"linkedin" varchar DEFAULT 'https://linkedin.com/company/editorial',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_v_version_property_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_email" varchar DEFAULT 'studio@editorial.co',
  	"version_phone" varchar DEFAULT '+1 (415) 555-0142',
  	"version_address" varchar DEFAULT '148 Gallery Row, Suite 3B, San Francisco, CA',
  	"version_instagram" varchar DEFAULT 'https://instagram.com/editorial',
  	"version_facebook" varchar DEFAULT 'https://facebook.com/editorial',
  	"version_linkedin" varchar DEFAULT 'https://linkedin.com/company/editorial',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_price_notes" ADD CONSTRAINT "services_price_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_technical_specs" ADD CONSTRAINT "services_technical_specs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_inclusions" ADD CONSTRAINT "services_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_sidebar_inclusions" ADD CONSTRAINT "services_sidebar_inclusions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_faq" ADD CONSTRAINT "services_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leads" ADD CONSTRAINT "leads_service_requested_id_services_id_fk" FOREIGN KEY ("service_requested_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leads_fk" FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_add_ons" ADD CONSTRAINT "home_add_ons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_features" ADD CONSTRAINT "home_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_faqs" ADD CONSTRAINT "home_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home" ADD CONSTRAINT "home_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_rels" ADD CONSTRAINT "home_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_add_ons" ADD CONSTRAINT "_home_v_version_add_ons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_features" ADD CONSTRAINT "_home_v_version_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_faqs" ADD CONSTRAINT "_home_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v" ADD CONSTRAINT "_home_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_rels" ADD CONSTRAINT "_home_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_property_types" ADD CONSTRAINT "site_property_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_property_types" ADD CONSTRAINT "_site_v_version_property_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "services_price_notes_order_idx" ON "services_price_notes" USING btree ("_order");
  CREATE INDEX "services_price_notes_parent_id_idx" ON "services_price_notes" USING btree ("_parent_id");
  CREATE INDEX "services_technical_specs_order_idx" ON "services_technical_specs" USING btree ("_order");
  CREATE INDEX "services_technical_specs_parent_id_idx" ON "services_technical_specs" USING btree ("_parent_id");
  CREATE INDEX "services_inclusions_order_idx" ON "services_inclusions" USING btree ("_order");
  CREATE INDEX "services_inclusions_parent_id_idx" ON "services_inclusions" USING btree ("_parent_id");
  CREATE INDEX "services_sidebar_inclusions_order_idx" ON "services_sidebar_inclusions" USING btree ("_order");
  CREATE INDEX "services_sidebar_inclusions_parent_id_idx" ON "services_sidebar_inclusions" USING btree ("_parent_id");
  CREATE INDEX "services_faq_order_idx" ON "services_faq" USING btree ("_order");
  CREATE INDEX "services_faq_parent_id_idx" ON "services_faq" USING btree ("_parent_id");
  CREATE INDEX "services__order_idx" ON "services" USING btree ("_order");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_category_idx" ON "services" USING btree ("category_id");
  CREATE INDEX "services_hero_hero_image_idx" ON "services" USING btree ("hero_image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "gallery_before_image_idx" ON "gallery" USING btree ("before_image_id");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "leads_service_requested_idx" ON "leads" USING btree ("service_requested_id");
  CREATE INDEX "leads_updated_at_idx" ON "leads" USING btree ("updated_at");
  CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_leads_id_idx" ON "payload_locked_documents_rels" USING btree ("leads_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_add_ons_order_idx" ON "home_add_ons" USING btree ("_order");
  CREATE INDEX "home_add_ons_parent_id_idx" ON "home_add_ons" USING btree ("_parent_id");
  CREATE INDEX "home_features_order_idx" ON "home_features" USING btree ("_order");
  CREATE INDEX "home_features_parent_id_idx" ON "home_features" USING btree ("_parent_id");
  CREATE INDEX "home_faqs_order_idx" ON "home_faqs" USING btree ("_order");
  CREATE INDEX "home_faqs_parent_id_idx" ON "home_faqs" USING btree ("_parent_id");
  CREATE INDEX "home_hero_image_idx" ON "home" USING btree ("hero_image_id");
  CREATE INDEX "home_rels_order_idx" ON "home_rels" USING btree ("order");
  CREATE INDEX "home_rels_parent_idx" ON "home_rels" USING btree ("parent_id");
  CREATE INDEX "home_rels_path_idx" ON "home_rels" USING btree ("path");
  CREATE INDEX "home_rels_services_id_idx" ON "home_rels" USING btree ("services_id");
  CREATE INDEX "_home_v_version_add_ons_order_idx" ON "_home_v_version_add_ons" USING btree ("_order");
  CREATE INDEX "_home_v_version_add_ons_parent_id_idx" ON "_home_v_version_add_ons" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_features_order_idx" ON "_home_v_version_features" USING btree ("_order");
  CREATE INDEX "_home_v_version_features_parent_id_idx" ON "_home_v_version_features" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_faqs_order_idx" ON "_home_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_home_v_version_faqs_parent_id_idx" ON "_home_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_version_hero_image_idx" ON "_home_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_rels_order_idx" ON "_home_v_rels" USING btree ("order");
  CREATE INDEX "_home_v_rels_parent_idx" ON "_home_v_rels" USING btree ("parent_id");
  CREATE INDEX "_home_v_rels_path_idx" ON "_home_v_rels" USING btree ("path");
  CREATE INDEX "_home_v_rels_services_id_idx" ON "_home_v_rels" USING btree ("services_id");
  CREATE INDEX "site_property_types_order_idx" ON "site_property_types" USING btree ("_order");
  CREATE INDEX "site_property_types_parent_id_idx" ON "site_property_types" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_property_types_order_idx" ON "_site_v_version_property_types" USING btree ("_order");
  CREATE INDEX "_site_v_version_property_types_parent_id_idx" ON "_site_v_version_property_types" USING btree ("_parent_id");
  CREATE INDEX "_site_v_created_at_idx" ON "_site_v" USING btree ("created_at");
  CREATE INDEX "_site_v_updated_at_idx" ON "_site_v" USING btree ("updated_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "services_price_notes" CASCADE;
  DROP TABLE "services_technical_specs" CASCADE;
  DROP TABLE "services_inclusions" CASCADE;
  DROP TABLE "services_sidebar_inclusions" CASCADE;
  DROP TABLE "services_faq" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "leads" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_add_ons" CASCADE;
  DROP TABLE "home_features" CASCADE;
  DROP TABLE "home_faqs" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "home_rels" CASCADE;
  DROP TABLE "_home_v_version_add_ons" CASCADE;
  DROP TABLE "_home_v_version_features" CASCADE;
  DROP TABLE "_home_v_version_faqs" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "_home_v_rels" CASCADE;
  DROP TABLE "site_property_types" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "_site_v_version_property_types" CASCADE;
  DROP TABLE "_site_v" CASCADE;
  DROP TYPE "public"."enum_gallery_category";
  DROP TYPE "public"."enum_leads_status";`)
}
