-- CreateEnum
CREATE TYPE "UserActivityStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'REMOVED');

-- CreateEnum
CREATE TYPE "UserExternalSource" AS ENUM ('TURTLE_GUARD');

-- CreateEnum
CREATE TYPE "UserPersonaDataPriority" AS ENUM ('LOW', 'DEFAULT', 'HIGH');

-- CreateEnum
CREATE TYPE "UserInfoType" AS ENUM ('NAME', 'EMAIL', 'CPF', 'PASSPORT', 'PHONE', 'BIRTHDAY');

-- CreateEnum
CREATE TYPE "UserAccessType" AS ENUM ('ADMIN', 'NUTRITIONIST', 'PATIENT');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "status" "UserActivityStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExtenalIdentifier" (
    "id" UUID NOT NULL,
    "externalId" TEXT NOT NULL,
    "source" "UserExternalSource" NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserExtenalIdentifier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPersonalData" (
    "id" UUID NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "complement" TEXT,
    "priority" "UserPersonaDataPriority" NOT NULL DEFAULT 'DEFAULT',
    "type" "UserInfoType" NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserPersonalData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccess" (
    "id" UUID NOT NULL,
    "type" "UserAccessType" NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "UserAccess_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserExtenalIdentifier" ADD CONSTRAINT "UserExtenalIdentifier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPersonalData" ADD CONSTRAINT "UserPersonalData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccess" ADD CONSTRAINT "UserAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
