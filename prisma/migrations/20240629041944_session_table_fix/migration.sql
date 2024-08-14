/*
  Warnings:

  - You are about to drop the column `deliveryDays` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `productHandle` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `vendor` on the `Schedule` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "shop" TEXT NOT NULL,
    "days" INTEGER NOT NULL DEFAULT 7,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Schedule" ("createdAt", "id", "shop") SELECT "createdAt", "id", "shop" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
