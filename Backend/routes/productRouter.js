const { Router } = require('express');
const productsController = require('../controllers/productsController');


const productsRouter = Router();
productsRouter.get('/products', productsController.read);

module.exports = productsRouter;