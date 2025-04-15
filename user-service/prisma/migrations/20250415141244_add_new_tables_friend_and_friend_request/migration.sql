-- CreateEnum
CREATE TYPE "user"."FriendRequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- CreateTable
CREATE TABLE "user"."friend_request" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friend_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."friend" (
    "id" TEXT NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user"."friend_request" ADD CONSTRAINT "friend_request_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."friend_request" ADD CONSTRAINT "friend_request_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "user"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."friend" ADD CONSTRAINT "friend_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "user"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user"."friend" ADD CONSTRAINT "friend_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "user"."profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
