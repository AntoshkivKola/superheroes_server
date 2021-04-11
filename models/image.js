'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {

    static associate (models) {
      Image.belongsTo(models.Superhero, {
        foreignKey: 'superheroId',
      }); // UserId | userId -> user_id
    }
  }
  Image.init(
    {
      imagePath: {
        type: DataTypes.STRING,
        validate: {
          notNull: true,
        },
        allowNull:false,
      },
      // superheroId: {
      //   type: DataTypes.INTEGER,
      // },
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'images',
      underscored: true,
    }
  );
  return Image;
};
