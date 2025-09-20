module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comments: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      review_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }, // Added review_date field
    },
    {
      timestamps: true,
      tableName: 'reviews',
    }
  );

  Review.associate = (models) => {
    Review.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project',
    });
    Review.belongsTo(models.User, {
      foreignKey: 'admin_id',
      as: 'admin',
    });
  };

  return Review;
};
