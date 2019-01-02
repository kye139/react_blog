module.exports = (sequelize, DataTypes) => (
  sequelize.define('notice', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
  })
);