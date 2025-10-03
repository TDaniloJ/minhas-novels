/*
  Warnings:

  - Added the required column `updatedAt` to the `novel_world_building` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "novel_characters" ADD COLUMN     "appearance" TEXT,
ADD COLUMN     "backstory" TEXT;

-- AlterTable
ALTER TABLE "novel_magic" ADD COLUMN     "cooldown" TEXT,
ADD COLUMN     "manaCost" TEXT,
ADD COLUMN     "range" TEXT;

-- AlterTable
ALTER TABLE "novel_world_building" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "novel_chapters" ADD CONSTRAINT "novel_chapters_volumeId_fkey" FOREIGN KEY ("volumeId") REFERENCES "novel_volumes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_chapters" ADD CONSTRAINT "novel_chapters_arcId_fkey" FOREIGN KEY ("arcId") REFERENCES "novel_arcs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
