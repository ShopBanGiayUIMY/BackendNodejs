import Product from "../models/Product.js"
import ProductImage from "../models/ProductImage.js"
export const ProductService = {
  getListProduct: async () => {
    try {
      const result = await Product.findAll();
      return result;
    } catch (e) {
      throw e.message
    }
  },
  getProductById: async (productId) => {
    try {
      const result = await Product.findByPk(productId, {
        include: [{
          model: ProductImage,
          attributes: ["image_url"]
        }]
      });
      return result;
    } catch (e) {
      throw e.message;
    }
  }
}