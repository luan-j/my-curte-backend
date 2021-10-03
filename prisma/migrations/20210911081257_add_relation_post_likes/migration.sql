-- AddForeignKey
ALTER TABLE "social_post_likes" ADD CONSTRAINT "social_post_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "social_posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
