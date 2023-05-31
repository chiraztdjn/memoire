/*
  Warnings:

  - You are about to drop the column `username` on the `Pharmacien` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pharmacien" DROP COLUMN "username",
ADD COLUMN     "email" TEXT;
