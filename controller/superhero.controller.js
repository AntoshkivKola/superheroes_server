const createError = require('http-errors');
const { Superhero } = require('../models');
const _ = require('lodash');

const checkBody = body =>
  _.pick(body, ['nickname', 'realName', 'originDescription', 'catchPhrase']);

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body } = req;
    const createdSuperhero = await Superhero.create(body);

    if (!createdSuperhero) {
      return next(createError(400));
    }

    res.status(201).send({
      data: createdSuperhero,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllSuperheroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const superheroes = await Superhero.findAll({
      ...pagination,
    });

    console.log(superheroes);
    if (!superheroes.length) {
      return next(createError(404, 'Superheroes not found'));
    }

    res.status(200).send({
      data: superheroes,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const superhero = await Superhero.findByPk(id);

    if (!superhero) {
      const err = createError(404, 'Superhero not found');
      return next(err);
    }

    res.send(superhero);
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const values = checkBody(body);

    const [rowsCount, [updatedSuperhero]] = await Superhero.update(values, {
      where: { id },
      returning: true,
    });

    if (rowsCount !== 1) {
      return next(createError(400, 'Superhero cant be updated'));
    }

    res.send({ data: updatedSuperhero });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const rowsCount = await Superhero.destroy( {
      where: { id }
    });

    if (rowsCount !== 1) {
      return next(createError(400, 'Superhero cant be deleted'));
    }

    res.send({ data: rowsCount });
  } catch (err) {
    next(err);
  }
};
