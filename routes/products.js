// product.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

// GET
router.get("/", productController.getAllProducts);

// POST
router.post("/", productController.addProduct);

// PUT
router.put("/:id", productController.updateProduct);

// DELETE
router.delete("/:id", productController.deleteProduct);

module.exports = router;
