const packs = (sequelize, DataTypes) => {
  const Packs = sequelize.define('packs', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    pack_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    qty: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'packs',
  });

  // Definindo as associações com a tabela Product
  Packs.associate = (models) => {
    Packs.belongsTo(models.products, {
      foreignKey: 'pack_id', as: 'packProduct'
    });
    Packs.belongsTo(models.products, {
      foreignKey: 'product_id', as: 'productInPack'
    });
  }

  return Packs;
};

module.exports = packs;