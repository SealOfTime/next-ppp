-- CreateTable
CREATE TABLE "QuestDate" (
    "date" TIMESTAMP(3) NOT NULL,
    "registrationStart" TIMESTAMP(3) NOT NULL,
    "registrationEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestDate_pkey" PRIMARY KEY ("date")
);

-- CreateTable
CREATE TABLE "Station" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutePoint" (
    "supposedArrival" TIMESTAMP(3) NOT NULL,
    "teamID" TEXT NOT NULL,
    "stationID" TEXT NOT NULL,
    "arrivedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RoutePoint_pkey" PRIMARY KEY ("supposedArrival","teamID","stationID")
);

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutePoint" ADD CONSTRAINT "RoutePoint_stationID_fkey" FOREIGN KEY ("stationID") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
