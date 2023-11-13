import ProductService from "../../services/ProductService.js";
import CategoryService from "../../services/CategoryService.js";
const layout = "layouts/layout";
const ProductAdminController = {
  index: async (req, res) => {
    const row = await ProductService.getListProduct();

    const data = row.map((row) => {
      return {
        id: row.product_id,
        name: row.product_name,
        price: row.product_price,
        description: row.product_description,
        thumbnail: row.thumbnail,
        category: {
          name: row.Category.name,
          image: row.Category.image,
        },
      };
    });
    res.render("product/products", { data, layout: layout, title: "Products" });
  },
  create: async (req, res) => {
    if (req.method === "POST") {
      const {
        product_name,
        product_price,
        product_description,
        product_image,
        category_id,
        quantity,
      } = req.body;
      const imageArray = JSON.parse(`[${product_image}]`);
      const thumbnail = imageArray[0];
      const image_url = imageArray;
      console.log("hitrtr", image_url);

      const result = await ProductService.createProduct(
        product_name,
        product_price,
        product_description,
        thumbnail,
        category_id,
        image_url,
        quantity
      );
      if (result) {
        res.redirect("/admin/products");
      }
    }
    const result = await CategoryService.getAllCategories();
    const data = result.map((row) => {
      return {
        id: row.category_id,
        name: row.name,
      };
    });
    res.render("product/addProduct", {
      layout: layout,
      title: "Create Product",
      category: data,
    });
  },
  // Thêm phần sửa sản phẩm
  edit: async (req, res) => {
    const productId = req.params.id;
    try {
      const product = await ProductService.getProductById(productId);
      const categories = await CategoryService.getAllCategories();

      res.render("product/editProduct", {
        layout: layout,
        title: "Edit Product",
        product: {
          id: product.product_id,
          name: product.product_name,
          price: product.product_price,
          description: product.product_description,
          thumbnail: product.thumbnail,
          category_id: product.category_id,
          quantity: product.quantity,
        },
        categories: categories,
      });
    } catch (error) {
      console.error("Error fetching product for editing:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  // Cập nhật sản phẩm sau khi sửa
  update: async (req, res) => {
    const productId = req.params.id;
    const {
      product_name,
      product_price,
      product_description,
      product_image,
      category_id,
      quantity,
    } = req.body;
    const imageArray = JSON.parse(`[${product_image}]`);
    const thumbnail = imageArray[0];
    const image_url = imageArray;

    try {
      const result = await ProductService.updateProduct(
        productId,
        product_name,
        product_price,
        product_description,
        thumbnail,
        category_id,
        image_url,
        quantity
      );

      if (result) {
        res.redirect("/admin/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  // Xóa sản phẩm
  delete: async (req, res) => {
    const productId = req.params.id;

    try {
      const result = await ProductService.deleteProduct(productId);

      if (result) {
        res.redirect("/admin/products");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  // Xem chi tiết sản phẩm
  detail: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await ProductService.getProductDetail(productId);

      res.render("product/detailsProduct", {
        layout: layout,
        title: "Product Detail",
        product: {
          id: product.product_id,
          name: product.product_name,
          price: product.product_price,
          description: product.product_description,
          thumbnail: product.thumbnail,
          category: {
            name: product.Category.name,
            image: product.Category.image,
          },
        },
      });
    } catch (error) {
      console.error("Error fetching product detail:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};

export default ProductAdminController;
