const createError = require('http-errors');
const { Superhero, Image } = require('../models');
const _ = require('lodash');

module.exports.createImage = async (req, res, next) => {
  try {
    const {
      files,
      params: { superheroId },
    } = req;

    const creatImageValues = files.map(file => {
      return (file = {
        imagePath: file.name,
        superheroId,
      });
    });

    const createdImages = await Image.bulkCreate(creatImageValues);

    // const createdImage = await Image.create({
    //   imagePath: filename,
    //   superheroId,
    // });
    
    if (!createdImages) {
      return next(createError(400));
    }

    res.send(createdImages);
  } catch (err) {
    next(err);
  }
};

module.exports.getAllSuperheroImages = async (req, res, next) => {
  try {
    const {
      params: { superheroId },
    } = req;

    const superhero = await Superhero.findByPk(superheroId)
    
    const images = await superhero.getImages();
    
    if (!images) {
      return next(createError(404, 'Images not found'));
    }

    res.send(images);
  } catch (err) {
    next(err);
  }
};
