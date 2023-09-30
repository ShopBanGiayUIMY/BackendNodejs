import express from "express";
import bodyParser from "body-parser";
import ProductRouter from "./src/routes/Products.js";
import logger from "./src/middleware/Logger.js";

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use('/api/v1/products', ProductRouter);
app.listen(port, () => console.log(`Server started on port ${port}`));
