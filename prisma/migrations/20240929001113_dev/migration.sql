-- CreateEnum
CREATE TYPE "Category" AS ENUM ('DOMAIN', 'HOSTING', 'DEVELOPMEMNT', 'UNCATEGORIZED');

-- CreateTable
CREATE TABLE "offerings" (
    "id" TEXT NOT NULL,
    "plan" TEXT,
    "description" TEXT,
    "amount" INTEGER,
    "features" TEXT[],
    "category" "Category" NOT NULL DEFAULT 'UNCATEGORIZED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offerings_pkey" PRIMARY KEY ("id")
);
