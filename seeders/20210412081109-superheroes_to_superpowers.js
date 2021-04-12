'use strict';
const { QueryTypes } = require('sequelize');
const _ = require('lodash');
const { Superhero, Superpower } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const superheroes = await Superhero.findAll({
      attributes: ['id'],
    });

    const superpowers = await Superpower.findAll({
      attributes: ['id'],
    });

    const sp_to_sh = superheroes
      .map(sh => {
        return new Array(_.random(1, superpowers.length, false))
          .fill(null)
          .map((_, i) => ({
            superhero_id: sh.id,
            superpower_id: i + 1,
            created_at: new Date(),
            updated_at: new Date(),
          }));
      })
      .flat(2);
    console.log(sp_to_sh);
    queryInterface.bulkInsert('superheroes_to_superpowers', sp_to_sh, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
