import express from "express";
import bodyParser from "body-parser";
import connection from "./src/config/Connection.js";

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  const db = connection();
  db.connect();
  db.query('SELECT * FROM products', async (err, rows, fields) => {
    if (err) {
      res.send({ error: err }).status(500);
      throw err;
    } 
    res.send(rows);
  })
});
app.listen(port, () => console.log(`Server started on port ${port}`));
