const products = (sequelize, DataTypes) => {
  const product = sequelize.define('products', {
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
  product.associate = (models) => {
    product.hasMany(models.Infos, {
      foreignKey: 'pack_id', as: 'packProduct'
    });
    product.hasMany(models.Infos, {
      foreignKey: 'product_id', as: 'productsInPacks'
    });
  }

  return product;
};