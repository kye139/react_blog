module.exports = (sequelize, DataTypes) => (
  sequelize.define('comment', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING(600),
      allowNull: false,
    },
    commentType: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: 'main',
    }
  }, {
    timestamps: true
  })
);