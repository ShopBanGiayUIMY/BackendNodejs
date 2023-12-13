import Category from "../../models/Category.js";
import CategoryService from "../../services/CategoryService.js";
import Product from "../../models/Product.js";
const CategoryController = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll({
        include: Product,
      });
      console.log(JSON.stringify(categories));

      res.render("category/categories", {
        categories,
        layout: "layouts/layout",
        title: "Categories",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  },

  createCategory: async (req, res) => {
    const { name, image } = req.body;
    try {
      const newCategory = await Category.create({ name, image });
      res.status(201).render("category/addCategories", {
        newCategory,
        layout: "layouts/layout",
        title: "Add Category",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  },

  updateCategory: async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).send("Category not found");
      }

      await Category.update({ name, image }, { where: { category_id: id } });
      res.status(200).send("Category updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).send("Category not found");
      }

      await Category.destroy({ where: { category_id: id } });
      res.status(200).send("Category deleted successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  },
};

export default CategoryController;
