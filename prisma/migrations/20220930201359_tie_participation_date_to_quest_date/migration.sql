/*
  Warnings:

  - You are about to drop the column `participationDate` on the `Team` table. All the data in the column will be lost.
  - Added the required column `participationDateID` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" RENAME COLUMN "participationDate" TO "participationDateID";
INSERT INTO "QuestDate" ("date", "registrationStart", "registrationEnd")
  SELECT DISTINCT "Team"."participationDateID", 
                  "Team"."participationDateID" - interval '14 days',
                  "Team"."participationDateID" - interval '2 days'
  FROM "Team";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_participationDateID_fkey" FOREIGN KEY ("participationDateID") REFERENCES "QuestDate"("date") ON DELETE RESTRICT ON UPDATE CASCADE;
