module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      file_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
    },
    {
      timestamps: true,
      tableName: 'projects',
    }
  );

  Project.associate = (models) => {
    Project.belongsTo(models.User, {
      foreignKey: 'student_id',
      as: 'student',
    });
    Project.hasMany(models.Review, {
      foreignKey: 'project_id',
      as: 'reviews',
    });
  };

  return Project;
};
