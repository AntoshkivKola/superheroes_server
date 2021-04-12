'use strict';
const { QueryTypes } = require('sequelize');
const _ = require('lodash');
const { Superhero } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const superpowers = new Array(_.random(3, 15, false))
      .fill(null)
      .map((_, i) => ({
        superpower: `superpower${i}`,
        created_at: new Date(),
        updated_at: new Date(),
      }))
      .flat(2);

    queryInterface.bulkInsert('superpowers', superpowers, {});
  },

  down: async (queryInterface, Sequelize) => {},
};
