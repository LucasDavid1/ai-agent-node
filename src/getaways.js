const { Op } = require('sequelize');
const { Artist, Band, Album } = require('./models');


async function createArtist(name, instrument, country) {
    const [artist, created] = await Artist.findOrCreate({
        where: { name, instrument, country },
        defaults: { name, instrument, country }
    });

    if (!created) {
        const existingArtists = await Artist.findAll({ where: { name } });
        if (existingArtists.length > 1) {
            const newName = `${name} (${instrument})`;
            return Artist.create({ name: newName, instrument, country });
        }
    }

    return artist;
}


async function createBand(name, formation_year, genre, member_ids) {
    const [band, created] = await Band.findOrCreate({
        where: { name },
        defaults: { name, formation_year, genre }
    });

    if (member_ids && member_ids.length > 0) {
        const members = await Artist.findAll({ where: { id: member_ids } });
        await band.setMembers(members);
    }

    return band;
}


async function createAlbum(title, releaseDate, genre, bandId) {
    const band = await Band.findByPk(bandId);
    if (!band) return null;

    const [album, created] = await Album.findOrCreate({
        where: { title, BandId: bandId },
        defaults: { title, releaseDate, genre, BandId: bandId }
    });

    return album;
}


async function searchMusic(query) {
    return Album.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.iLike]: `%${query}%` } },
                { '$Band.name$': { [Op.iLike]: `%${query}%` } },
                { '$Band.members.name$': { [Op.iLike]: `%${query}%` } }
            ]
        },
        include: [{
            model: Band,
            as: 'band',
            include: [{
                model: Artist,
                as: 'members'
            }]
        }],
        distinct: true
    });
}


async function searchArtists(query = null, instrument = null, country = null) {
    const whereClause = {};
    if (query) {
        whereClause[Op.or] = [
            { name: { [Op.iLike]: `%${query}%` } },
            { instrument: { [Op.iLike]: `%${query}%` } },
            { country: { [Op.iLike]: `%${query}%` } }
        ];
    }
    if (instrument) whereClause.instrument = { [Op.iLike]: `%${instrument}%` };
    if (country) whereClause.country = { [Op.iLike]: `%${country}%` };

    return Artist.findAll({ where: whereClause, distinct: true });
}


async function searchBands(query = null, genre = null, formation_year = null) {
    const whereClause = {};
    if (query) {
        whereClause[Op.or] = [
            { name: { [Op.iLike]: `%${query}%` } },
            { '$members.name$': { [Op.iLike]: `%${query}%` } }
        ];
    }
    if (genre) whereClause.genre = { [Op.iLike]: `%${genre}%` };
    if (formation_year) whereClause.formation_year = formation_year;

    return Band.findAll({
        where: whereClause,
        include: [{
            model: Artist,
            as: 'members'
        }],
        distinct: true
    });
}


async function getBandAlbums(bandId) {
    return Album.findAll({ where: { BandId: bandId } });
}


async function getAlbumsByGenre(genre) {
    return Album.findAll({ where: { genre: { [Op.iLike]: `%${genre}%` } } });
}


async function getArtistBands(artistId) {
    const artist = await Artist.findByPk(artistId);
    if (!artist) return [];
    return artist.getBands();
}


module.exports = {
    createArtist,
    createBand,
    createAlbum,
    searchMusic,
    searchArtists,
    searchBands,
    getBandAlbums,
    getAlbumsByGenre,
    getArtistBands
};
