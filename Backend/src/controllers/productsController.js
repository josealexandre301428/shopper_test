const productService = require('../services/productServices');
const { readCsv, validCsv } = require('../middlewares/csvHandler');

const productsControler = {

    async create(req, res) {
      const productData = req.body;
      // implementaçao futura para criao de produtos
    },

    async read(req, res) {
        try {
          const response = await productService.read(req, res);
    
          return res.status(201).json(response);
        } catch (error) {
          return error.status
            ? res.status(error.status).json({error: error.status, message: error.message })
            : res.status(500).json({error: error.status ,message: error.message });
        }
      },

      async upload(req, res) {
        try {
          const errorProducts = [];
          const base = await productService.read();
          const data = await readCsv(req.file.path);
          const result = validCsv(base, data);
          result.map((product) => { if(product.message) errorProducts.push(product)}); 
          if(errorProducts.length > 0) return res.json({errorProducts});

          result.map(async (product) => await productService.upload(product.code, product)); 

          return res.json(result);
        } catch (error) {
          return error.status
            ? res.status(error.status).json({error: error.status, message: error.message })
            : res.status(500).json({error: error.status, message: error.message });
        }
      },

};

module.exports = productsControler