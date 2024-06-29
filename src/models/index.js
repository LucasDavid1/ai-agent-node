const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Artist = require('./artist')(sequelize);
const Band = require('./band')(sequelize);
const Album = require('./album')(sequelize);


Band.belongsToMany(Artist, { through: 'BandMembers', as: 'members' });
Artist.belongsToMany(Band, { through: 'BandMembers', as: 'bands' });
Band.hasMany(Album);
Album.belongsTo(Band);

module.exports = {
  sequelize,
  Artist,
  Band,
  Album
};
