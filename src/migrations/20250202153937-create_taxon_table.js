'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("taxons", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      taxonomyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "taxonomies", key: "id" },
        onDelete: "CASCADE",
      },
      parentId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: "taxons", key: "id" },
        onDelete: "CASCADE",
      },
      left: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      right: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      depth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.addIndex("taxons", ["taxonomyId"]);
    await queryInterface.addIndex("taxons", ["slug"]);
    await queryInterface.addIndex("taxons", ["left"]);
    await queryInterface.addIndex("taxons", ["right"]);
    await queryInterface.addIndex("taxons", ["depth"]);
  },

  async down (queryInterface) {
    queryInterface.dropTable("taxons");
  }
};
