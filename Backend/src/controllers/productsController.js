const productService = require('../services/productServices');

const productsControler = {

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
};

module.exports = productsControler