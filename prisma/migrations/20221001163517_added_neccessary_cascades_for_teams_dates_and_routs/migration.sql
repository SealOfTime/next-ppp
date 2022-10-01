-- DropForeignKey
ALTER TABLE "RoutePoint" DROP CONSTRAINT "RoutePoint_teamID_fkey";

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
