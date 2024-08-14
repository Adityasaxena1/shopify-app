/*
  Warnings:

  - The primary key for the `QRCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `QRCode` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Schedule` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QRCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productHandle" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "scans" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_QRCode" ("createdAt", "destination", "id", "productHandle", "productId", "productVariantId", "scans", "shop", "title") SELECT "createdAt", "destination", "id", "productHandle", "productId", "productVariantId", "scans", "shop", "title" FROM "QRCode";
DROP TABLE "QRCode";
ALTER TABLE "new_QRCode" RENAME TO "QRCode";
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "days" INTEGER NOT NULL DEFAULT 7,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Schedule" ("createdAt", "days", "id", "shop") SELECT "createdAt", "days", "id", "shop" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
