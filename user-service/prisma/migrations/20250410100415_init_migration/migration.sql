-- CreateTable
CREATE TABLE "user"."profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "settingsId" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."account_settings" (
    "id" TEXT NOT NULL,
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "showLastSeen" BOOLEAN NOT NULL DEFAULT true,
    "profileVisible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "account_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "user"."profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_username_key" ON "user"."profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_settingsId_key" ON "user"."profiles"("settingsId");

-- AddForeignKey
ALTER TABLE "user"."profiles" ADD CONSTRAINT "profiles_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "user"."account_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
