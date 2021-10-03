-- AddForeignKey
ALTER TABLE "social_post_likes" ADD CONSTRAINT "social_post_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
