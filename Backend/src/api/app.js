const express = require('express');
require('express-async-errors');
const cors = require('cors');

const productsRouter = require('../routes/productRouter');

const app = express();
app.use(express.json());

app.use(cors());




app.use('/', productsRouter);

module.exports = app;