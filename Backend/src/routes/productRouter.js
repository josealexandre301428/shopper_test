const { Router } = require('express');
const multer = require('multer');
const productsController = require('../controllers/productsController');

const upload = multer({ dest: 'uploads/'});


const productsRouter = Router();

// CREAT para unico produto ou multiplos produtos
productsRouter.post('/create', productsController.create);
//READ
productsRouter.get('/products', productsController.read);
productsRouter.get('/products/packs', productsController.readPacks);
// UPDATE
productsRouter.put('/upload', productsController.upload);
productsRouter.put('/upload/packs', productsController.updatePacks);

module.exports = productsRouter;