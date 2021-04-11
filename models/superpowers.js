'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superpower extends Model {
    
    static associate (models) {
      Superpower.belongsToMany(models.Superhero, {
        through: 'superheroes_to_superpowers',
        foreignKey: 'superpowerId',
      }); // UserGroup -> UserId, GroupId
    }
  }
  Superpower.init(
    {
      superpower: {
        type: DataTypes.STRING,
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Superpower',
      tableName: 'superpowers',
      underscored: true,
    }
  );
  return Superpower;
};
