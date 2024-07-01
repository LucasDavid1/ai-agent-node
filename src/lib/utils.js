function getTools() {
    return [
        {
            type: "function",
            function: {
                name: "createArtist",
                description: "Creates a new artist",
                parameters: {
                    type: "object",
                    properties: {
                        name: {type: "string", description: "Artist's name"},
                        instrument: {type: "string", description: "Artist's main instrument"},
                        country: {type: "string", description: "Artist's country"}
                    },
                    required: ["name", "instrument", "country"]
                },
            },
        },
        {
            type: "function",
            function: {
                name: "createBand",
                description: "Creates a new band",
                parameters: {
                    type: "object",
                    properties: {
                        name: {type: "string", description: "Band's name"},
                        formation_year: {type: "integer", description: "Year the band was formed"},
                        genre: {type: "string", description: "Band's primary genre"},
                        memberIds: {type: "array", items: {type: "integer"}, description: "List of artist IDs who are members of the band"}
                    },
                    required: ["name", "formation_year", "genre", "memberIds"]
                },
            },
        },
        {
            type: "function",
            function: {
                name: "createAlbum",
                description: "Creates a new album",
                parameters: {
                    type: "object",
                    properties: {
                        title: {type: "string", description: "Album title"},
                        releaseDate: {type: "string", description: "Album release date (YYYY-MM-DD)"},
                        genre: {type: "string", description: "Album's genre"},
                        bandId: {type: "integer", description: "ID of the band"}
                    },
                    required: ["title", "releaseDate", "genre", "bandId"]
                },
            },
        },
        {
            type: "function",
            function: {
                name: "searchMusic",
                description: "Searches for music by title, band, or artist",
                parameters: {
                    type: "object",
                    properties: {
                        query: {type: "string", description: "Search query"}
                    },
                    required: ["query"]
                },
            },
        },
        {
            type: "function",
            function: {
                name: "searchArtists",
                description: "Searches for artists by name, instrument, or country",
                parameters: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "General search query (optional)"
                        },
                        instrument: {
                            type: "string",
                            description: "Specific instrument to search for (optional)"
                        },
                        country: {
                            type: "string",
                            description: "Specific country to search for (optional)"
                        }
                    },
                    required: []
                },
            },
        },
        {
            type: "function",
            function: {
                name: "searchBands",
                description: "Searches for bands by name, genre, formation year, or member name",
                parameters: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "General search query for band name or member name (optional)"
                        },
                        genre: {
                            type: "string",
                            description: "Specific genre to search for (optional)"
                        },
                        formation_year: {
                            type: "integer",
                            description: "Specific year the band was formed (optional)"
                        }
                    },
                    required: []
                },
            },
        },
        {
            type: "function",
            function: {
                name: "getBandAlbums",
                description: "Gets all albums by a band",
                parameters: {
                    type: "object",
                    properties: {
                        bandId: {type: "integer", description: "ID of the band"}
                    },
                    required: ["bandId"]
                },
            },
        },
        {
            type: "function",
            function: {
                name: "getAlbumsByGenre",
                description: "Gets all albums of a specific genre",
                parameters: {
                    type: "object",
                    properties: {
                        genre: {type: "string", description: "Genre to search for"}
                    },
                    required: ["genre"]
                },
            },
        },
        {
            type: "function",
            function: {
                name: "getArtistBands",
                description: "Gets all bands an artist is a member of",
                parameters: {
                    type: "object",
                    properties: {
                        artistId: {type: "integer", description: "ID of the artist"}
                    },
                    required: ["artistId"]
                },
            },
        },
    ];
}

module.exports = {
    getTools
};
