/*
  Warnings:

  - You are about to drop the column `productId` on the `Market` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_productId_fkey";

-- AlterTable
ALTER TABLE "Market" DROP COLUMN "productId";
