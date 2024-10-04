/*
  Warnings:

  - You are about to drop the column `reset_expirtion` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "reset_expirtion",
ADD COLUMN     "reset_expiration" TEXT;
