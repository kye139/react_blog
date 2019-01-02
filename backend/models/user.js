module.exports = (sequelize, DataTypes) => (
  sequelize.define('user', {
    user_id: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    previlige: {
      type: DataTypes.STRING(10),
      alowNull: false,
    }
  })
);