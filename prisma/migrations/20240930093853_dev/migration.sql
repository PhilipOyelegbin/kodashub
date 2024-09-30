/*
  Warnings:

  - Made the column `plan` on table `offerings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `offerings` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "offerings" ALTER COLUMN "plan" SET NOT NULL,
ALTER COLUMN "amount" SET NOT NULL;
