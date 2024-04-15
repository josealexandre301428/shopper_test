
const products = (sequelize, DataTypes) => {
  const Products = sequelize.define('products', {
    code: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost_price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
    },
    sales_price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'products',
  });

  // Define a associação com a tabela packs
  Products.associate = (models) => {
    Products.hasMany(models.packs, {
      foreignKey: 'pack_id', as: 'packProduct'
    });
    Products.hasMany(models.packs, {
      foreignKey: 'product_id', as: 'productsInPacks'
    });
  }

  return Products;
};

module.exports = products;