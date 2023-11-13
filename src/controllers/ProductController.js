import { ProductService } from '../services/ProductService.js';
const ProductController = {
  index: async (req, res) => {
    const products = await ProductService.getListProduct().catch(e => {
      res.status(500).json({message: e.message})
    });
    res.status(200).json(products)
  },
  show: async (req, res) => {
    const product = await ProductService.getProductById(req.params.id)
    .catch(e => {
      res.status(500).json({message: e.message})
    })
    res.status(200).json(product)
  }
};

export default ProductController;