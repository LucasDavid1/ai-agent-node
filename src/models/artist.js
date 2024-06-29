const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const Artist = sequelize.define('Artist', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    instrument: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });

  Artist.prototype.toString = function() {
    return `${this.name} (${this.instrument})`;
  };

  return Artist;
};
