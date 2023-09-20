import express from 'express';
import bodyParser from 'body-parser';

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => 
console.log(`Server started on port ${port}`));