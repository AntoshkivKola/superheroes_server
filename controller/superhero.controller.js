const createError = require('http-errors');
const { Superhero, Superpower } = require('../models');
const _ = require('lodash');

const checkBody = body =>
  _.pick(body, [
    'nickname',
    'realName',
    'originDescription',
    'catchPhrase',
    'superpowers',
  ]);
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

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const {
      files,
      body: { superpowers },
      body,
    } = req;

    const createdSuperhero = await Superhero.create(body);

    if (!createdSuperhero) {
      return next(createError(400));
    }
    
    if (superpowers) {
      const creatSuperpowersValues = superpowers.map(item => {
        return (item = {
          superpower: item,
          superheroId: createdSuperhero.id,
        });
      });

      const createdSuperpowers = await Superpower.bulkCreate(
        creatSuperpowersValues
      );
      
      await createdSuperhero.addSuperpowers(createdSuperpowers);
    }
   

    if (files) {
      const creatImageValues = files.map(file => {
        return (file = {
          imagePath: file.name,
          superheroId,
        });
      });

      const createdImages = await Image.bulkCreate(creatImageValues);

      if (!createdImages) {
        return next(createError(400));
      }
    }

    const createdSuperheroWithSuperpowers = await Superhero.findByPk(
      createdSuperhero.id,
      {
        ...includeSuperpower,
      }
    );

    res.status(201).send({
      data: createdSuperheroWithSuperpowers,
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
      ...includeSuperpower,
    });

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

    const superherWithSuperpowers = await Superhero.findByPk(id, {
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

    const updatedSuperherWithSuperpowers = await Superhero.findByPk(id, {
      ...includeSuperpower,
    });

    if (!updatedSuperherWithSuperpowers) {
      return next(createError(404));
    }

    res.send({ data: updatedSuperherWithSuperpowers });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const rowsCount = await Superhero.destroy({
      where: { id },
    });

    if (rowsCount !== 1) {
      return next(createError(400, 'Superhero cant be deleted'));
    }

    res.send({ data: id });
  } catch (err) {
    next(err);
  }
};
