module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('project', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			summary: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			status: {
				type: Sequelize.STRING,
				defaultValue: 'pending',
			},
			student_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'user',
					key: 'id',
				},
			},
			file_name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			file_path: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		}),
	down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('project'),
};
