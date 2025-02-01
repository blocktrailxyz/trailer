'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'authTokenVersion', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    })
  },

  async down (queryInterface) {
    queryInterface.removeColumn('users', 'authTokenVersion')
  }
};
