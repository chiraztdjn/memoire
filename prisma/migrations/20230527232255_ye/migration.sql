-- CreateEnum
CREATE TYPE "States" AS ENUM ('PENDING', 'CANCELED', 'CONFIRMED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "state" "States" NOT NULL DEFAULT 'PENDING';
