const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dog = sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    heightMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: { 
      type: DataTypes.JSON( {
        metric: DataTypes.STRING
      }),
      allowNull: false,
    },
    ageMin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ageMax: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    temperament: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });

  return Dog;
};