/*
  Warnings:

  - You are about to drop the column `productId` on the `OrderProduct` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "productPrice" REAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderProduct" ("amount", "id", "orderId", "productName", "productPrice", "productType") SELECT "amount", "id", "orderId", "productName", "productPrice", "productType" FROM "OrderProduct";
DROP TABLE "OrderProduct";
ALTER TABLE "new_OrderProduct" RENAME TO "OrderProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
