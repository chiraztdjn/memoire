/*
  Warnings:

  - The values [CANCELED] on the enum `States` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "States_new" AS ENUM ('PENDING', 'CANCELLED', 'CONFIRMED');
ALTER TABLE "Order" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "state" TYPE "States_new" USING ("state"::text::"States_new");
ALTER TYPE "States" RENAME TO "States_old";
ALTER TYPE "States_new" RENAME TO "States";
DROP TYPE "States_old";
ALTER TABLE "Order" ALTER COLUMN "state" SET DEFAULT 'PENDING';
COMMIT;
