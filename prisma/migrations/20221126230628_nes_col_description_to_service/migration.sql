-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "appointmentDate" DATETIME NOT NULL,
    "value" INTEGER NOT NULL,
    "payType" TEXT NOT NULL,
    "serviceAddress" TEXT NOT NULL,
    "isPaid" TEXT NOT NULL,
    "description" TEXT,
    "serviceClientId" INTEGER NOT NULL,
    CONSTRAINT "Service_serviceClientId_fkey" FOREIGN KEY ("serviceClientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Service" ("appointmentDate", "description", "id", "isPaid", "payType", "serviceAddress", "serviceClientId", "value") SELECT "appointmentDate", "description", "id", "isPaid", "payType", "serviceAddress", "serviceClientId", "value" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
