const path = require('path');

const express = require('express');
const router = require('./routes');
const errorHandler = require('./middlewares/error.handlers');

const app = express();

const STATIC_PATH = path.resolve(__dirname, './public');

app.use(express.static(STATIC_PATH));

app.use(express.json());

app.use('/api', router);

app.use(errorHandler);

module.exports = app;
//module.exports = { STATIC_PATH };
