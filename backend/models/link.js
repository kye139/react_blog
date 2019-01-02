module.exports = (sequelize, DataTypes) => (
  sequelize.define('link', {
    title: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    URL: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    }
  })
);