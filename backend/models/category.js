module.exports = (sequelize, DataTypes) => (
  sequelize.define('category', {
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'alone'
    }
  }, {
    timestamps: true,
    paranoid: true,
  })
);