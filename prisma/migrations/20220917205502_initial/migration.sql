-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PLAYER', 'CAPTAIN', 'ZOOKEEPER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "vkId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "vkUrl" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL DEFAULT 'PLAYER',
    "teamID" TEXT,
    "botState" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("vkId")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dataStart" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_vkUrl_key" ON "User"("vkUrl");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamID_fkey" FOREIGN KEY ("teamID") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
