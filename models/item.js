'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    details: DataTypes.TEXT,
    priority: DataTypes.STRING,
    isCompleted: DataTypes.BOOLEAN,
    completedAt: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Item;
};