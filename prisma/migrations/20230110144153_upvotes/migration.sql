-- CreateTable
CREATE TABLE "_upvotedPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_upvotedPosts_AB_unique" ON "_upvotedPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_upvotedPosts_B_index" ON "_upvotedPosts"("B");

-- AddForeignKey
ALTER TABLE "_upvotedPosts" ADD CONSTRAINT "_upvotedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_upvotedPosts" ADD CONSTRAINT "_upvotedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
