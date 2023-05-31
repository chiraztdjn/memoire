-- CreateTable
CREATE TABLE "Medicine" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "scientific_name" TEXT,
    "details" TEXT[],
    "type" TEXT,
    "price" DOUBLE PRECISION,
    "img" TEXT,
    "orderId" TEXT,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "userId" TEXT NOT NULL,
    "pharmacienId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pharmacien" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "adress" TEXT,
    "username" TEXT,
    "password" TEXT,

    CONSTRAINT "Pharmacien_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "age" TEXT,
    "gender" TEXT,
    "adress" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_pharmacienId_fkey" FOREIGN KEY ("pharmacienId") REFERENCES "Pharmacien"("id") ON DELETE SET NULL ON UPDATE CASCADE;
