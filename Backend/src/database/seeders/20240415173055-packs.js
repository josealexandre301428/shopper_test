module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('packs', [
      {
        pack_id: 1000,
        product_id: 18,
        qty: 6,
        //1000,18,6
      },
      {
        pack_id: 1010,
        product_id: 24,
        qty: 1,
        //1010,24,1
      },
      {
        pack_id: 1010,
        product_id: 26,
        qty: 1,
        //1010,26,1
      },
      {
        pack_id: 1020,
        product_id: 19,
        qty: 3,
        //1020,19,3
      },
      {
        pack_id: 1020,
        product_id: 21,
        qty: 3,
        //1020,21,3
      },
    ], {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('packs', null, {});
  },
};