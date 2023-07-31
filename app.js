
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Require các router ở bước 4
const productRouter = require("./routes/products");

// Sử dụng các router ở bước 4
app.use("/products", productRouter);


app.get("/",(req,res)=>{
    res.send("Helloooooooooooo //// api sản phẩm thêm /products")
})
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
