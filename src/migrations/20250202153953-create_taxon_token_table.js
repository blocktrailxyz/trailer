'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("taxon_tokens", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },

      tokenId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "tokens", key: "id" },
        onDelete: "CASCADE",
      },
      taxonId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "taxons", key: "id" },
        onDelete: "CASCADE",
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.addIndex('taxon_tokens', ['taxonId', 'tokenId'], { unique: true });
    await queryInterface.addIndex('taxon_tokens', ['tokenId']);
  },

  async down (queryInterface) {
    queryInterface.dropTable("taxon_tokens");
  }
};
