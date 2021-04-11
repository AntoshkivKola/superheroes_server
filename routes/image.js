const { Router } = require('express');
const ImageController = require('../controller/image.controller');
const { uploadImages } = require('../middlewares/file.upload');

const imageRouter = Router();

imageRouter.post(
  '/:superheroId/images',
  uploadImages,
  ImageController.createImage
);

imageRouter.get('/:superheroId/images', ImageController.getAllSuperheroImages);

imageRouter.delete('/images/:imageId', ImageController.deleteImage);
module.exports = imageRouter;
