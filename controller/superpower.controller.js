const _ = require('lodash');
const { Superhero, Superpower } = require('../models');

const checkBody = body => _.pick(body, ['superpower']);
const includeSuperpower = {
  include: [
    {
      model: Superpower,
      attributes: ['id', 'superpower'],
      through: {
        attributes: [],
      },
    },
  ],
};

module.exports.createSuperpower = async (req, res, next) => {
  try {
    const {
      body: { superheroId },
      body,
    } = req;

    const values = checkBody(body);

    const superpower = await Superpower.create({
      ...values,
      superheroId,
    });

    const superhero = await Superhero.findByPk(superheroId);
    await superhero.addSuperpower(superpower);

    const superherWithSuperpowers = await Superhero.findByPk(superheroId, {
      ...includeSuperpower,
    });

    if (!superherWithSuperpowers) {
      return next(createError(404));
    }

    res.send({ data: superherWithSuperpowers });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllSuperpowers = async (req, res, next) => {
  try {
    const superpowers = await Superpower.findAll();

    if (!superpowers.length) {
      return next(createError(404, 'Superpowers not found'));
    }

    res.status(200).send({
      data: superpowers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getSuperpower = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const superpower = await Superpower.findByPk(id);

    if (!superpower) {
      return next(createError(404, 'Superpower not found'));
    }

    res.status(200).send({
      data: superpower,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperpower = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const values = checkBody(body);

    const [rowsCount, [updatedSuperpower]] = await Superpower.update(values, {
      where: { id },
      returning: true,
    });

    if (rowsCount !== 1) {
      return next(createError(400, 'Superpower cant be updated'));
    }

    res.send({ data: updatedSuperpower });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperpower = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const rowsCount = await Superpower.destroy({
      where: { id },
    });

    if (rowsCount !== 1) {
      return next(createError(400, 'Superpower cant be deleted'));
    }

    res.send({ data: rowsCount });
  } catch (err) {
    next(err);
  }
};
