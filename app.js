const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
let mysql = require('mysql2');
let myConnection = require('express-myconnection');
const authRouter = require('./routers/auth');
const bodyParser = require('body-parser');
dotenv.config();// sài .env
const app = express();
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
app.use('/api/v1/auth',authRouter);
// app.use('/api/v1/user',userRouter);

  app.listen( process.env.PORT, () => console.log('Server is running on port 3000'));