'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'portfolioCount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  
    await queryInterface.addColumn('users', 'tokensCount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  
    await queryInterface.addColumn('users', 'chainsCount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  
    await queryInterface.addColumn('users', 'tradesCount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  
    await queryInterface.addColumn('users', 'totalInvested', {
      type: Sequelize.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0.0,
    });
  
    await queryInterface.addColumn('users', 'profitLoss', {
      type: Sequelize.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0.0,
    });
  
    await queryInterface.addColumn('users', 'preferredChains', {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: [],
    });
  
    await queryInterface.addColumn('users', 'isProUser', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  
    await queryInterface.addColumn('users', 'TfaEnabled', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  
    await queryInterface.addColumn('users', 'preferredCurrency', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'USD',
    });
  
    await queryInterface.addColumn('users', 'notificationPreferences', {
      type: Sequelize.JSONB,
      allowNull: true,
      defaultValue: {},
    });
  
    await queryInterface.addColumn('users', 'darkModeEnabled', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  
    await queryInterface.addIndex('users', ['portfolioCount']);
    await queryInterface.addIndex('users', ['tokensCount']);
    await queryInterface.addIndex('users', ['chainsCount']);
    await queryInterface.addIndex('users', ['preferredChains']);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('users', 'portfolioCount');
    await queryInterface.removeColumn('users', 'tokensCount');
    await queryInterface.removeColumn('users', 'chainsCount');
    await queryInterface.removeColumn('users', 'tradesCount');
    await queryInterface.removeColumn('users', 'totalInvested');
    await queryInterface.removeColumn('users', 'profitLoss');
    await queryInterface.removeColumn('users', 'preferredChains');
    await queryInterface.removeColumn('users', 'isProUser');
    await queryInterface.removeColumn('users', 'TfaEnabled');
    await queryInterface.removeColumn('users', 'preferredCurrency');
    await queryInterface.removeColumn('users', 'notificationPreferences');
    await queryInterface.removeColumn('users', 'darkModeEnabled');
  }
};
