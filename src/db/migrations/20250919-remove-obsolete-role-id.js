module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the obsolete 'role_id' column from the 'users' table
    await queryInterface.removeColumn('users', 'role_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Re-add the 'role_id' column to the 'users' table for rollback
    await queryInterface.addColumn('users', 'role_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};