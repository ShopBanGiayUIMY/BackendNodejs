import Categorydb from "../Querydb/Categorydb.js";
const CategoryController = {
  // get all categories

  Categoryname: async (req, res) => {
    try {
        req.getConnection((err, conn) => {
            if (err) {
                return res.send(err)
            }
            conn.query(Categorydb.getallCategory, (err, rows) => {
                if (err) {
                    return res.send(err)
                }
                res.status(200).json(rows);
                console.log("lấy danh mục thành công ");
            })
        })
    } catch (error) {
        
    }
  
},
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