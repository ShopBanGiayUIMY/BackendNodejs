// product.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

// GET ALL PRODUCT
router.get("/", productController.getAllProducts);

//GET PRODUCT THEO ID - XEM CHI TIẾT
router.get("/:id", productController.getProductById);

// POST
router.post("/", productController.addProduct);

// PUT
router.put("/:id", productController.updateProduct);

// DELETE
router.delete("/:id", productController.deleteProduct);

module.exports = router;
