const express = require('express');
require('express-async-errors');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());






module.exports = app;