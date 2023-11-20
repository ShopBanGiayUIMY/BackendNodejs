import Category from "../models/Category.js";
import Product from "../models/Product.js"
import ProductDetail from "../models/ProductDetail.js";
import ProductImage from "../models/ProductImage.js"
export const ProductService = {
  getListProduct: async () => {
    try {
      const result = await Product.findAll({
        include: [
          {
            model: Category,
            attributes: ["name", "image"],
          },
        ],
      });
      return result;
    } catch (e) {
      throw e.message;
    }
  },
  getProductById: async (productId) => {
    try {
      const result = await Product.findByPk(productId, {
        include: [
          {
            model: ProductImage,
            attributes: ["image_url"]
          },
          {
            model: ProductDetail,
          },
          {
            model: Category,
          }
        ]
      });
      return result;
    } catch (e) {
      throw e.message;
    }
  },

  createProduct: async (
    product_name,
    product_price,
    product_description,
    thumbnail,
    category_id,
    image_url,
    quantity
  ) => {
    try {
      // Tạo sản phẩm
      const createdProduct = await Product.create({
        product_name,
        product_description,
        product_price,
        category_id,
        thumbnail,
      });
      const product_id = createdProduct.product_id;
      await ProductDetail.create({
        product_id,
        color: "red",
        size: "M",
        stock: 10,
        quantity,
      });
      const urls = JSON.stringify(image_url);
      await ProductImage.create({
        image_url: urls,
        product_id,
      });

      return createdProduct;
    } catch (e) {
      throw e.message;
    }
  },
};
export default ProductService;
