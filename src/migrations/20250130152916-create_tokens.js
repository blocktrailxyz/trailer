'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      tokenRank: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      warning: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      chain: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contractAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      decimals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 18,
      },
      totalSupply: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      maxSupply: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('tokens', ['symbol']);
    await queryInterface.addIndex('tokens', ['name']);
    await queryInterface.addIndex('tokens', ['contractAddress']);
    await queryInterface.addIndex('tokens', ['tokenRank']);

  },

  async down (queryInterface) {
    queryInterface.dropTable('tokens');
  }
};
