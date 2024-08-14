-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shop" TEXT NOT NULL,
    "days" INTEGER NOT NULL DEFAULT 7,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT NOT NULL DEFAULT 'all'
);
INSERT INTO "new_Schedule" ("createdAt", "days", "id", "shop") SELECT "createdAt", "days", "id", "shop" FROM "Schedule";
DROP TABLE "Schedule";
ALTER TABLE "new_Schedule" RENAME TO "Schedule";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
