-- CreateTable
CREATE TABLE "Schedule" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "vendor" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productHandle" TEXT NOT NULL,
    "deliveryDays" INTEGER NOT NULL DEFAULT 7,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
