import Category from "../models/Category.js"
const CategoryService = {
    async getAllCategories() {
        try {
            const result = await Category.findAll();
            return result;
        } catch (e) {
            throw e.message;
        }
    }

};
export default CategoryService;