'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Superhero extends Model {
    static associate (models) {
      // define association here
      Superhero.hasMany(models.Image, {
        foreignKey: 'superheroId',
        onDelete: 'cascade',
      });
      Superhero.belongsToMany(models.Superpower, {
        through: 'superheroes_to_superpowers',
        foreignKey: 'superheroId',
      });
    }
  }
  Superhero.init(
    {
      nickname: {
        unique: true,
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      realName: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: true,
        },
      },
      originDescription: {
        type: DataTypes.TEXT,
      },
      catchPhrase: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Superhero',
      tableName: 'superheroes',
      underscored: true,
    }
  );
  return Superhero;
};
