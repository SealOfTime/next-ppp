/*
  Warnings:

  - You are about to drop the column `dataStart` on the `Team` table. All the data in the column will be lost.
  - Added the required column `legionariesAllowed` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participationDate` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" DROP COLUMN "dataStart",
ADD COLUMN     "legionariesAllowed" BOOLEAN NOT NULL,
ADD COLUMN     "participationDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "botData" JSONB;
