const productService = require('../services/productServices');

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

      async readPacks(req, res) {
        try {
          const response = await productService.readPacks(req, res);
    
          return res.status(201).json(response);
        } catch (error) {
          return error.status
            ? res.status(error.status).json({error: error.status, message: error.message })
            : res.status(500).json({error: error.status ,message: error.message });
        }
      },

      async upload(req, res) {
        console.log(req.body);
        try {
          const promises = req.body.map(async (product) => {
              return await productService.upload(product.code, product);
          });
  
          const response = await Promise.all(promises);
  
          return res.json(response);
      } catch (error) {
          return error.status
              ? res.status(error.status).json({ error: error.status, message: error.message })
              : res.status(500).json({ error: error.status, message: error.message });
      }
      },

      async updatePacks(req, res) {
        const { code, sales_price } =req.body;
        try {
          const promises = await productService.updatePacks(code, sales_price);
  
          const response = await Promise.all(promises);
  
          return res.json(response);
      } catch (error) {
          return error.status
              ? res.status(error.status).json({ error: error.status, message: error.message })
              : res.status(500).json({ error: error.status, message: error.message });
      }
      },

};

module.exports = productsControler