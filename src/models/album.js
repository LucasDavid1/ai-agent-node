const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const Album = sequelize.define('Album', {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  });

  Album.prototype.toString = function() {
    return `${this.title} by ${this.Band.name}`;
  };

  return Album;
};
