-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "tags" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "auth_id" UUID NOT NULL,
    "avatar_image_url" TEXT,
    "name" TEXT NOT NULL DEFAULT '',
    "gender" "Genders" NOT NULL DEFAULT 'male',
    "self_introduction" VARCHAR(200) DEFAULT '',
    "is_private" BOOLEAN NOT NULL DEFAULT true,
    "is_profile_complete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("auth_id")
);

-- CreateTable
CREATE TABLE "profile_tags" (
    "profile_id" UUID NOT NULL,
    "tag_id" UUID NOT NULL,

    CONSTRAINT "profile_tags_pkey" PRIMARY KEY ("profile_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");

-- AddForeignKey
ALTER TABLE "profile_tags" ADD CONSTRAINT "profile_tags_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("auth_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_tags" ADD CONSTRAINT "profile_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
