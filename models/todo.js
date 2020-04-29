module.exports = function (sequelize, DataTypes) {
  const Todo = sequelize.define("Todos", {
    items: {
      type: DataTypes.STRING,
    },
    checked: DataTypes.BOOLEAN,
  });
  return Todo;
};
