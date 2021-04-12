'use strict';

const generateSH = key => ({
  nickname: `Superhero${key}`,
  real_name: `Josh Dou${key}`,
  origin_description: `originDescription${key}`,
  catch_phrase: `catchPhrase${key}`,
  created_at: new Date(),
  updated_at: new Date(),
});

const generateSHs = (amount = 50) => {
  return new Array(amount > 300 ? 300 : amount)
    .fill(null)
    .map((_, i) => generateSH(i + 1));
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('superheroes', generateSHs(50), {});
  },

  down: async (queryInterface, Sequelize) => {},
};
