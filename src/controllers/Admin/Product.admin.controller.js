
import connection from '../../config/Connection.js';
import ProductService from '../../services/ProductService.js';
const layout = 'layouts/layout';
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
          image: row.Category.image
        }
      }
    });
    console.log(data);
    res.render('product/products', { data ,layout: layout,title : 'Products'});
  },
   create: async (req, res) => {
    res.render('product/addProduct', {layout: layout,title : 'Create Product'});
  }

};

export default ProductAdminController;