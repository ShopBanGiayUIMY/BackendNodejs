import express from "express";
import bodyParser from "body-parser";
import ProductRouter from "./src/routes/Products.js";
import logger from "./src/middleware/Logger.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import myConnection from "express-myconnection";
import mysql from "mysql2";
import Routers from "./src/routes/Routers.js";
dotenv.config();

const port = 8080;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use('/api/v1/products', ProductRouter);

app.use(express.json());
app.use(cors());
app.use(cookieParser());// tạo cookie 

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
// Kết nối
app.use(myConnection(mysql, {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    connectTimeout: process.env.DB_CONNECT_TIMEOUT
}, 'single'));

// Router
app.use('/api/v1',Routers);
 app.listen(port, () => console.log(`Server started on port ${port}`));
// app.listen(port,"192.168.1.10", () => console.log(`Server started on port ${port}`));