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
      const urls = image_url;
      await ProductImage.create({
        image_url: urls,
        product_id,
      });

      return createdProduct;
    } catch (e) {
      throw e.message;
    }
  },
  canAddToCart: async (
    productDetailId,
    quantity
  ) => {
    const productDetail = await ProductDetail.findByPk(productDetailId)
    return productDetail.stock >= quantity 
  },
  // Cập nhật thông tin sản phẩm
  //TODO: need to fix
  updateProduct: async (
    productId,
    product_name,
    product_price,
    product_description,
    thumbnail,
    category_id,
    image_url,
    quantity
  ) => {
    try {
      const [updatedProduct] = await Product.update(
        {
          product_name,
          product_price,
          product_description,
          category_id,
          thumbnail,
        },
        {
          where: {
            product_id: productId,
          },
        }
      );

      // Cập nhật thông tin chi tiết sản phẩm
      await ProductDetail.update(
        {
          color: "red",
          size: "M",
          stock: 10,
          quantity,
        },
        {
          where: {
            product_id: productId,
          },
        }
      );

      const urls = JSON.stringify(image_url);
      await ProductImage.update(
        {
          image_url: urls,
        },
        {
          where: {
            product_id: productId,
          },
        }
      );

      return updatedProduct;
    } catch (error) {
      throw error;
    }
  },

  //TODO: need to fix
  deleteProduct: async (productId) => {
    try {
      // Xóa thông tin ảnh sản phẩm
      await ProductImage.destroy({
        where: {
          product_id: productId,
        },
      });
      await ProductDetail.destroy({
        where: {
          product_id: productId,
        },
      });
      const deletedProductCount = await Product.destroy({
        where: {
          product_id: productId,
        },
      });
      console.log("aaaa", deletedProductCount);
      return deletedProductCount > 0;
    } catch (e) {
      throw e.message;
    }
  },
  //TODO: need to fix
  getProductDetail: async (productId) => {
    try {
      const productDetail = await ProductDetail.findOne({
        where: {
          product_id: productId,
        },
      });

      const productImage = await ProductImage.findOne({
        where: {
          product_id: productId,
        },
      });

      if (productDetail && productImage) {
        return {
          color: productDetail.color,
          size: productDetail.size,
          stock: productDetail.stock,
          quantity: productDetail.quantity,
          image_url: JSON.parse(productImage.image_url),
        };
      } else {
        return null; // Hoặc bạn có thể throw một lỗi nếu không tìm thấy thông tin chi tiết
      }
    } catch (e) {
      throw e.message;
    }
  },
};
export default ProductService;
