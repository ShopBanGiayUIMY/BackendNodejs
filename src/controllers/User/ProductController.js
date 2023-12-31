import connection from "../../config/Connection.js";
import ProductService from "../../services/ProductService.js";
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

  // const dataJson = {
  //   "product_id": 63,
  //   "product_name": "434",
  //   "product_description": "",
  //   "product_price": "3434.00",
  //   "category_id": 2,
  //   "thumbnail": "https://i.ibb.co/WWbhHhF/ao.png",
  //   "ProductImages": [
  //     {
  //       "image_url": "[\"https://i.ibb.co/WWbhHhF/ao.png\",\"https://i.ibb.co/HNBzgqj/argentina.png\",\"https://i.ibb.co/3pLGNFT/campuchia.png\"]"
  //     }
  //   ],
  //   "ProductDetails": [
  //     {
  //       "detail_id": 61,
  //       "product_id": 63,
  //       "color": "red",
  //       "size": "L",
  //       "stock": 10
  //     }
  //   ],
  //   "Category": {
  //     "category_id": 2,
  //     "name": "Running Shoes",
  //     "image": null
  //   }
  // };
  show: async (req, res) => {
    ProductService.getProductById(req.params.id)
      .then((product) => {
        if (product) {
          const imagesString = product.ProductImages[0].image_url;
          const parsedImages = JSON.parse(imagesString);
          const resBody = {
            id: product.product_id,
            name: product.product_name,
            price: product.product_price,
            quantity: product.product_quantity,
            description: product.product_description,
            thumbnail: product.thumbnail,
            images: parsedImages,
            ProductDetails: product.ProductDetails,
            Category: product.Category,
          };
          res.status(200).json(resBody);
        } else {
          res.status(404).json({ message: "not found" });
        }
      })
      .catch((e) => {
        res.status(500).json({ message: e.message });
      });
  },
  GetSolidProductById: async (req, res) => {
    const db = connection();
    db.connect();
    const id = req.query.id;
    const query = ProductDb.GetSolidProductById;
    if (!id) {
      res.status(400).send({ message: "id is required" });
      return;
    } else {
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
  GetRatingById: async (req, res) => {
    const db = connection();
    db.connect();
    const id = req.params.id;
    const query = ProductDb.GetRatingById;
    if (!id) {
      res.status(400).send({ message: "id is required" });
      return;
    } else {
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
  Rating: async (req, res) => {
    const db = connection();
    db.connect();

    const user_id = req.user.id;
    const product_id = req.params.id;
    const rating = parseInt(req.query.score);

    // Validate the rating value
    if (isNaN(rating) || rating < 1 || rating > 5) {
      res.status(400).send({ message: "Invalid rating value" });
      return;
    }

    if (!product_id) {
      res.status(400).send({ message: "Product ID is required" });
      return;
    }

    // Check if the user has already rated the product
    const checkQuery =
      "SELECT * FROM product_ratings WHERE user_id = ? AND product_id = ?";
    db.query(checkQuery, [user_id, product_id], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Server error" });
        return;
      }

      if (rows.length > 0) {
        // User has already rated the product, update the existing rating
        const updateQuery =
          "UPDATE product_ratings SET rating = ?, rating_date = NOW() WHERE user_id = ? AND product_id = ?";
        db.query(updateQuery, [rating, user_id, product_id], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
            return;
          }
          res
            .status(200)
            .json({ status: 1, message: "Rating updated successfully" });
        });
      } else {
        // User has not rated the product, insert a new rating
        const insertQuery =
          "INSERT INTO product_ratings (user_id, product_id, rating) VALUES (?, ?, ?)";
        db.query(insertQuery, [user_id, product_id, rating], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
            return;
          }
          res
            .status(200)
            .json({ status: 1, message: "Rating added successfully" });
        });
      }
    });
  },
};

export default ProductController;
