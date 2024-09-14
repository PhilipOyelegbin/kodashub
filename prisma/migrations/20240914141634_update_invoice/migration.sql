/*
  Warnings:

  - You are about to drop the column `authorId` on the `Domain` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Invoice` table. All the data in the column will be lost.
  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Domain` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Domain` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `Domain` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bio` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Made the column `price` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Domain" DROP CONSTRAINT "Domain_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_authorId_fkey";

-- DropIndex
DROP INDEX "Domain_authorId_key";

-- DropIndex
DROP INDEX "Invoice_authorId_key";

-- DropIndex
DROP INDEX "Service_authorId_key";

-- AlterTable
ALTER TABLE "Domain" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "bio" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
DROP COLUMN "authorId",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "price" SET NOT NULL,
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Service_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Domain_userId_key" ON "Domain"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_userId_key" ON "Invoice"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_userId_key" ON "Service"("userId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Domain" ADD CONSTRAINT "Domain_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
