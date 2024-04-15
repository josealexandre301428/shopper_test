const db = require('../database/models');

const productService = {

    async read(_req, _res) {
        const result =  await db.products.findAll();
        return result;
       },

};

module.exports = productService;