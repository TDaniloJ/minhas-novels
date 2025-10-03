-- AlterTable
ALTER TABLE "novel_chapters" ADD COLUMN     "arcId" TEXT,
ADD COLUMN     "volumeId" TEXT;

-- CreateTable
CREATE TABLE "novel_characters" (
    "id" TEXT NOT NULL,
    "novelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "role" TEXT NOT NULL,
    "age" TEXT,
    "personality" TEXT,
    "abilities" TEXT[],
    "magicIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novel_characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel_world_building" (
    "id" TEXT NOT NULL,
    "novelId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novel_world_building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel_volumes" (
    "id" TEXT NOT NULL,
    "novelId" TEXT NOT NULL,
    "volumeNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "coverImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novel_volumes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel_arcs" (
    "id" TEXT NOT NULL,
    "novelId" TEXT NOT NULL,
    "volumeId" TEXT,
    "arcNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novel_arcs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "novel_magic" (
    "id" TEXT NOT NULL,
    "novelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT,
    "requirements" TEXT,
    "effects" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "novel_magic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "novel_characters" ADD CONSTRAINT "novel_characters_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_world_building" ADD CONSTRAINT "novel_world_building_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_volumes" ADD CONSTRAINT "novel_volumes_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_arcs" ADD CONSTRAINT "novel_arcs_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_arcs" ADD CONSTRAINT "novel_arcs_volumeId_fkey" FOREIGN KEY ("volumeId") REFERENCES "novel_volumes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "novel_magic" ADD CONSTRAINT "novel_magic_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "novels"("id") ON DELETE CASCADE ON UPDATE CASCADE;
