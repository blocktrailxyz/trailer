'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('portfolio_tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      portfolioId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'portfolios',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      tokenId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tokens',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
    });

    await queryInterface.addIndex('portfolio_tokens', ['userId']);
    await queryInterface.addIndex('portfolio_tokens', ['portfolioId', 'tokenId'], { unique: true });
    await queryInterface.addIndex('portfolio_tokens', ['tokenId']);

  },

  async down (queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('portfolio_tokens');
  }
};
