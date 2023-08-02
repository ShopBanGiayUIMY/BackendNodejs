const productModel = require("../data/db");

//GET PRODUCT THEO ID -XEM CHI TIẾT
const getProductById = (req, res) => {
  const productId = req.params.id;
  productModel.query(
    "SELECT * FROM product WHERE id = ?",
    [productId],
    (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn: " + err.stack);
        res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
        return;
      }
      if (results.length === 0) {
        res
          .status(404)
          .json({ error: "Không tìm thấy sản phẩm với ID đã cho" });
        return;
      }
      const product = results[0];
      res.json(product);
    }
  );
};

//GET ALL PRODUCT
const getAllProducts = (req, res) => {
  productModel.query("SELECT * FROM product", (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn: " + err.stack);
      res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
      return;
    }
    res.json(results);
  });
};
//POST
const addProduct = (req, res) => {
  const {
    product_id,
    product_name,
    product_description,
    product_price,
    luot_mua_hang,
    ghi_chu,
    danh_gia,
    sale,
    cost_price,
    selling_price,
  } = req.body;
  const newProduct = {
    product_id,
    product_name,
    product_description,
    product_price,
    luot_mua_hang,
    ghi_chu,
    danh_gia,
    sale,
    cost_price,
    selling_price,
  };

  productModel.query("INSERT INTO product SET ?", newProduct, (err, result) => {
    if (err) {
      console.error("Lỗi truy vấn: " + err.stack);
      res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
      return;
    }
    res.json({
      message: "Thêm sản phẩm thành công",
      insertedId: result.insertId,
    });
  });
};
//UPDATE
const updateProduct = (req, res) => {
  const productId = req.params.id;
  const {
    product_id,
    product_name,
    product_description,
    product_price,
    luot_mua_hang,
    ghi_chu,
    danh_gia,
    sale,
    cost_price,
    selling_price,
  } = req.body;

  const updatedProduct = {
    product_id,
    product_name,
    product_description,
    product_price,
    luot_mua_hang,
    ghi_chu,
    danh_gia,
    sale,
    cost_price,
    selling_price,
  };

  productModel.query(
    "UPDATE product SET ? WHERE id = ?",
    [updatedProduct, productId],
    (err, result) => {
      if (err) {
        console.error("Lỗi truy vấn: " + err.stack);
        res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
        return;
      }
      res.json({
        message: "Cập nhật sản phẩm thành công",
        affectedRows: result.affectedRows,
      });
    }
  );
};
//DELETE
const deleteProduct = (req, res) => {
  const productId = req.params.id;

  productModel.query(
    "DELETE FROM product WHERE id = ?",
    productId,
    (err, result) => {
      if (err) {
        console.error("Lỗi truy vấn: " + err.stack);
        res.status(500).json({ error: "Lỗi truy vấn dữ liệu" });
        return;
      }
      res.json({
        message: "Xóa sản phẩm thành công",
        affectedRows: result.affectedRows,
      });
    }
  );
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
