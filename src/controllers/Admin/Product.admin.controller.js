import ProductService from "../../services/ProductService.js";
import CategoryService from "../../services/CategoryService.js";
import ProductDetail from "../../models/ProductDetail.js";
const layout = "layouts/layout";
const ProductAdminController = {
  index: async (req, res) => {
    const row = await ProductService.getListProduct();
    // console.log(JSON.stringify(row))
    const data = await row.map((row) => {
      const parseArrayProductDetail = (productDetails) => {
        return productDetails.map((e) => {
          console.log(JSON.stringify(e));
          return {
            color: e.color,
            size: e.size,
            stock: e.stock,
            detailId: e.detail_id,
            productId: e.product_id,
          };
        });
      };
      return {
        id: row.product_id,
        name: row.product_name,
        price: row.product_price,
        description: row.product_description,
        thumbnail: row.thumbnail,
        ProductDetails: parseArrayProductDetail(row.ProductDetails),
        category: {
          name: row.Category.name,
          image: row.Category.image,
        },
      };
    });

    console.log(JSON.stringify(data));
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
      const image_url1 = imageArray;
      const image_url = image_url1;
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
  // Controller
  edit: async (req, res) => {
    const productId = req.params.id;
    const {
      product_name,
      product_price,
      product_description,
      thumbnail,
      category_id,
      image_url,
      quantity,
    } = req.body; // Lấy thông tin từ request body

    try {
      await ProductService.updateProduct(
        productId,
        product_name,
        product_price,
        product_description,
        thumbnail,
        category_id,
        image_url,
        quantity
      );

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
        categories: categories.map((category) => ({
          id: category.category_id,
          name: category.name,
          selected: category.id === product.category_id ? "selected" : "", // Kiểm tra danh mục được chọn
        })),
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  // Xóa sản phẩm
  delete: async (req, res, next) => {
    const productId = req.params.id;
    console.log("đang xoá ", productId);

    try {
      const result = await ProductService.deleteProduct(productId);
      if (result) {
        res.end();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Internal Server Error");
    }
  },
  detail: async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await ProductService.getProductDetail(productId);
      const categories = await CategoryService.getAllCategories(); // Lấy thông tin danh mục
      res.render("product/detailsProduct", {
        layout: layout,
        title: "Product Detail",

        product: {
          id: productId,
          name: product.name, // Đảm bảo rằng product trả về các thuộc tính cần thiết từ service
          price: product.price,
          description: product.description,
          thumbnail: product.thumbnail,
          // Thêm các thuộc tính cần thiết khác từ service vào đây
          // Ví dụ: color, size, stock, quantity, image_url,...
          category: {
            // Đưa thông tin danh mục vào đây nếu đã có
            // Ví dụ: name: product.Category.name,
            //        image: product.Category.image,
          },
          categories: categories, // Truyền danh sách các danh mục xuống view
        },
      });
    } catch (error) {
      console.error("Error fetching product detail:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  // detail: async (req, res) => {
  //   const row = await ProductService.getListProduct();

  //   const data = row.map((row) => {
  //     return {
  //       id: row.product_id,
  //       name: row.product_name,
  //       price: row.product_price,
  //       description: row.product_description,
  //       thumbnail: row.thumbnail,
  //       category: {
  //         name: row.Category.name,
  //         image: row.Category.image,
  //       },
  //     };
  //   });
  //   res.render("product/products", { data, layout: layout, title: "Products" });
  // },

  // color, size
  // detail: async (req, res) => {
  //   const productId = req.params.id;

  //   try {
  //     const productDetail = await ProductDetail.findOne({
  //       where: {
  //         product_id: productId,
  //       },
  //     });

  //     if (!productDetail) {
  //       return res.status(404).send("Không tìm thấy thông tin chi tiết sản phẩm");
  //     }

  //     res.render("product/detailsProduct", {
  //       layout: layout,
  //       title: "Chi tiết sản phẩm",
  //       product: {
  //         id: productId,
  //         color: productDetail.color,
  //         size: productDetail.size,
  //         stock: productDetail.stock,
  //         // Thêm các thông tin khác của sản phẩm từ service hoặc các model khác vào đây
  //         // Ví dụ: name, price, description, thumbnail,...
  //         // Đảm bảo lấy thông tin từ service hoặc model tương ứng
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Lỗi khi lấy thông tin chi tiết sản phẩm:", error);
  //     res.status(500).send("Lỗi Server");
  //   }
  // },
};

export default ProductAdminController;
