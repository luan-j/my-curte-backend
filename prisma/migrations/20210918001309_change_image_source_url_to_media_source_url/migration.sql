/*
  Warnings:

  - You are about to drop the column `image_source_url` on the `social_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "social_posts" DROP COLUMN "image_source_url",
ADD COLUMN     "media_source_url" TEXT[];
