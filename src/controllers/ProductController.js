import connection from '../config/Connection.js';
const ProductController = {
  index: async (req, res) => {
    const db = connection();
    db.connect();
    db.query('SELECT * FROM products', async (err, rows, fields) => {
      if (err) {
        res.status(500).send({ error: err });
        return;
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
    const id = req.params.id;
    const query = 'SELECT p.*, i.image_url FROM products p JOIN product_image i ON p.id = i.product_id WHERE p.id = ?';
    db.query(query, id, async (err, rows) => {
      if (err) {
        res.status(500).send({ error: 'server error' });
        return;
      }
      if (rows.length === 0) {
        res.status(404).send({ message: `Not found product with id = ${req.params.id}` });
        return;
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
      res.status(200).send(resBody);
    })
  }
};

export default ProductController;