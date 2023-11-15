import Categorydb from "../../Querydb/Categorydb.js";
import Category from "../../models/Category.js";
const CategoryController = {
  // get all categories
    getCategoryName: async (req, res) => {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
            console.log("Lấy danh mục thành công");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Lỗi khi lấy danh mục' });
        }
    }
,
// get category by id

Categoryid: async (req, res) => {
    try {
        req.getConnection((err, conn) => {
            if (err) {
                return res.send(err)
            }
            conn.query(Categorydb.getCategorybyid, [req.params.id], (err, rows) => {
                if (err) {
                    return res.send(err)
                }
                const data = rows.map((row) => {
                    return {
                      id: row.product_id,
                      name: row.product_name,
                      price: row.product_price,
                      description: row.product_description,
                      thumbnail: row.thumbnail,
                    }
                  });
                res.status(200).json(data);
                console.log("lấy danh mục theo id thành công ");
            })
        })
    } catch (error) {
    }
  
},
};

export default CategoryController;