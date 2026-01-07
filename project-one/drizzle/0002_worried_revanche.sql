CREATE TABLE "count" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"count" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "count" ADD CONSTRAINT "count_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;