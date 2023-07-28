const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, () => 
console.log(`Server started on port ${port}`));