import connection from '../../config/Connection.js';
import ProductService from '../../services/ProductService.js';
import ProductDb from "../../Querydb/productdb.js";
const ProductController = {
  index: async (req, res) => {
    const db = connection();
    db.connect();
    db.query(ProductDb.GetListProducts, async (err, rows, fields) => {
      if (err) {
        res.status(500).send({ error: err });
        return;
      }
      const data = rows.map((row) => {
        return {
          id: row.product_id,
          name: row.product_name,
          price: row.product_price,
          description: row.product_description,
          thumbnail: row.thumbnail,
          total_quantity_sold: row.total_quantity_sold,
        };
      });
      res.send(data);
    });
  },
  show: async (req, res) => {
    ProductService.getProductById(req.params.id)
    .then(product => {
      if (product)
        res.status(200).json(product)
      else {
        res.status(404).json({message: "not found"})
      }
    }).catch(e => {
      res.status(500).json({message: e.message})
    })
  },
  GetSolidProductById: async (req, res) => {
    const db = connection();
    db.connect();
    const id = req.query.id;
    const query = ProductDb.GetSolidProductById;
    if(!id){
      res.status(400).send({message:"id is required"});
      return;
    }else{
      db.query(query, id, async (err, rows) => {
        if (err) {
          console.log(err);
          res.status(500).send({ error: "server error" });
          return;
        }
        if (rows.length === 0) {
          res
            .status(404)
            .send({ message: `Not found product with id = ${req.params.id}` });
          return;
        }
        
        res.status(200).json(rows[0]);
      });
    }
  
  },
};

export default ProductController;
