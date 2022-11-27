-- AlterTable
ALTER TABLE "Service" ADD COLUMN "description" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expense" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "dateOfPay" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payType" TEXT NOT NULL,
    "isPaid" TEXT NOT NULL,
    "notes" TEXT NOT NULL
);
INSERT INTO "new_Expense" ("category", "dateOfPay", "id", "isPaid", "notes", "payType", "value") SELECT "category", "dateOfPay", "id", "isPaid", "notes", "payType", "value" FROM "Expense";
DROP TABLE "Expense";
ALTER TABLE "new_Expense" RENAME TO "Expense";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
