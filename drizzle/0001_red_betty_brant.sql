ALTER TABLE "accounts" RENAME COLUMN "upload_at" TO "updated_at";--> statement-breakpoint
ALTER TABLE "posts" RENAME COLUMN "upload_at" TO "updated_at";--> statement-breakpoint
ALTER TABLE "sessions" RENAME COLUMN "expire_at" TO "expires_at";--> statement-breakpoint
ALTER TABLE "sessions" RENAME COLUMN "upload_at" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "upload_at" TO "updated_at";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "provider_id";