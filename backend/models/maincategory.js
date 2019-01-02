module.exports = (sequelize, DataTypes) => (
  sequelize.define('maincategory', {
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
  })
);