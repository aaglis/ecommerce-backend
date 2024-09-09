/*
  Warnings:

  - You are about to drop the column `price` on the `OrderProduct` table. All the data in the column will be lost.
  - Added the required column `productName` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productPrice` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "productPrice" REAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderProduct" ("amount", "id", "orderId", "productId") SELECT "amount", "id", "orderId", "productId" FROM "OrderProduct";
DROP TABLE "OrderProduct";
ALTER TABLE "new_OrderProduct" RENAME TO "OrderProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
