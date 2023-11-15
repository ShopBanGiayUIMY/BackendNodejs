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
      console.log("hitrtr",image_url);
      
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
};

export default ProductAdminController;
