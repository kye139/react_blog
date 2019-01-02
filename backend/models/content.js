module.exports = (sequelize, DataTypes) => (
  sequelize.define('content', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  }, {
    timestamps: true,
    paranoid: true,
  })
);