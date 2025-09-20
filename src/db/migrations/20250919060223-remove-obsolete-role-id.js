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
    // Remove the obsolete 'role_id' column from the 'users' table
    await queryInterface.removeColumn('users', 'role_id');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // Re-add the 'role_id' column to the 'users' table for rollback
    await queryInterface.addColumn('users', 'role_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
