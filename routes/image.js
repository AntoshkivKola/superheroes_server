const { Router } = require('express');
const multer = require('multer');
const ImageController = require('../controller/image.controller');
const path = require('path');
//const STATIC_PATH = require('../app');

const STATIC_PATH = path.resolve(__dirname, '../public');
console.log(STATIC_PATH);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

const upload = multer({ storage });

const imageRouter = Router();

imageRouter.post(
  '/:superheroId/images',
  upload.single('image'),
  ImageController.createImage
);

imageRouter.get('/:superheroId/images', ImageController.getAllSuperheroImages);
;

module.exports = imageRouter;
