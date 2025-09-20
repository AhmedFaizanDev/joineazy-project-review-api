module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('review', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			comments: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			project_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'project',
					key: 'id',
				},
			},
			admin_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'user',
					key: 'id',
				},
			},
			review_date: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW,
			},
		}),
	down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('review'),
};
