const db = require('../database/models');

const productService = {

    async read(_req, _res) {
        const result =  await db.products.findAll();

        return result;
       },

    async readPacks(_req, _res) {
      const result =  await db.packs.findAll();

      return result;
    },

    async upload(code, data) {
    
    const result = await db.products.update({sales_price: Number(data.new_price)}, { where: { code } });
    return result;

    },

    async updatePacks(code, sales_price) {
      console.log(code, sales_price);
      const result = await db.products.update({sales_price}, { where: { code } });
      return result;
  
      }

};
module.exports = productService;