const { Router } = require('express');
const multer = require('multer');
const ImageController = require('../controller/image.controller');
const path = require('path');
const { uploadImages } = require('../middlewares/file.upload');

const imageRouter = Router();

imageRouter.post(
  '/:superheroId/images',
  uploadImages,
  ImageController.createImage
);

imageRouter.get('/:superheroId/images', ImageController.getAllSuperheroImages);
module.exports = imageRouter;
