/*
  Warnings:

  - Added the required column `image_source_url` to the `social_posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "social_posts" ADD COLUMN     "image_source_url" TEXT NOT NULL;
