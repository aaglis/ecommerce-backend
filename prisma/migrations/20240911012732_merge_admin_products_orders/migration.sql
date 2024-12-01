/*
  Warnings:

  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_Product" ("id", "name", "price", "stock", "type") SELECT "id", "name", "price", "stock", "type" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
