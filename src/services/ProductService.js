import Product from "../models/Product.js"

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
      const result = await Product.findByPk(productId);
      return result;
    } catch (e) {
      throw e.message;
    }
  }
}