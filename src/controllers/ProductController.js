import connection from '../config/Connection.js';
const ProductController = {
  index: async (req, res) => {
    const db = connection();
    db.connect();
    db.query('SELECT * FROM products', async (err, rows, fields) => {
      if (err) {
        res.send({ error: err }).status(500);
        throw err;
      }
      const data = rows.map((row) => {
        return {
          id: row.id,
          name: row.name,
          price: row.price,
          quantity: row.quantity,
          description: row.description,
          image: row.image,
          thumbnail: row.thumbnail,
        }
      });
      res.send(data);
    })
  },
  show: async (req, res) => {
    const db = connection();
    db.connect();
    db.query(`select * from products p JOIN product_image i on p.id = i.product_id where p.id = ${req.params.id}`, async (err, rows, fields) => {
      if (err) {
        res.send({ error: err }).status(500);
        throw err;
      }
      const resBody = {
          id: rows[0].id,
          name: rows[0].name,
          price: rows[0].price,
          quantity: rows[0].quantity,
          description: rows[0].description,
          thumbnail: rows[0].thumbnail,
          images: rows.map(row => row.image_url),
        }
      // console.log(data);
      res.send(resBody);
    })
  }
};

export default ProductController;