const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const productRouter = require("./routes/products");

app.use("/products", productRouter);

app.get("/",(req,res)=>{
    res.send("Helloooooooooooo //// api sản phẩm thêm /products")
})  

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
