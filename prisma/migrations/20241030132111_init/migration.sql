-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "avatar_image_url" TEXT,
    "profile_name" TEXT NOT NULL DEFAULT '',
    "gender" "Genders" NOT NULL DEFAULT 'male',
    "learning_category" TEXT,
    "self_introduction" TEXT,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "is_profile_complete" BOOLEAN NOT NULL DEFAULT false,
    "auth_id" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_auth_id_key" ON "profiles"("auth_id");
