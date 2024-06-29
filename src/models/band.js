const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const Band = sequelize.define('Band', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    formation_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });

  Band.prototype.toString = function() {
    return this.name;
  };

  return Band;
};
