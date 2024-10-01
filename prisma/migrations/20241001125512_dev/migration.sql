/*
  Warnings:

  - Added the required column `expiration` to the `Hosting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Development" ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Hosting" ADD COLUMN     "expiration" TIMESTAMP(3) NOT NULL;
