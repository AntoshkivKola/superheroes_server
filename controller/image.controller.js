const createError = require('http-errors');
const { Superhero, Image } = require('../models');
const fs = require('fs');
const { pathToImages } = require('../middlewares/file.upload');
const path = require('path');

module.exports.createImage = async (req, res, next) => {
  try {
    const {
      files,
      params: { superheroId },
    } = req;

    const creatImageValues = files.map(file => {
      return (file = {
        imagePath: file.filename,
        superheroId,
      });
    });

    const createdImages = await Image.bulkCreate(creatImageValues);

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

    const superhero = await Superhero.findByPk(superheroId);

    const images = await superhero.getImages();

    if (!images) {
      return next(createError(404, 'Images not found'));
    }

    res.send(images);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteImage = async (req, res, next) => {
  try {
    const {
      params: { imageId },
    } = req;

    const image = await Image.findByPk(imageId);

    const deletePath = path.resolve(pathToImages, image.imagePath);
    console.log(pathToImages, image.imagePath, deletePath);

    fs.unlinkSync(deletePath);

    const rowsCount = await Image.destroy({
      where: { id: imageId },
    });

    if (rowsCount !== 1) {
      return next(createError(400, 'Image cant be deleted'));
    }

    res.send({ data: imageId });
  } catch (err) {
    next(err);
  }
};
