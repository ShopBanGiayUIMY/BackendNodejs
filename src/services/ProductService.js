import Product from "../models/Product.js"
import Category from "../models/Category.js"

 const ProductService = {
  getListProduct: async () => {
    try {
      const result = await Product.findAll({
        include: [
         {
          model: Category,
          attributes: [
            "name",
            "image",
          ]
         }
        ],
      });
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
export default ProductService;