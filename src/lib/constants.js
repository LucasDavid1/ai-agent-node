const gateways = require('../getaways');
const { getTools } = require('./utils');

const FUNCTION_DICT = {
    createArtist: gateways.createArtist,
    createBand: gateways.createBand,
    createAlbum: gateways.createAlbum,
    searchMusic: gateways.searchMusic,
    searchArtists: gateways.searchArtists,
    searchBands: gateways.searchBands,
    getBandAlbums: gateways.getBandAlbums,
    getAlbumsByGenre: gateways.getAlbumsByGenre,
    getArtistBands: gateways.getArtistBands
};

const SYSTEM_PROMPT = `
You are an AI assistant for a music database. You can perform the following functions:
${JSON.stringify(getTools(), null, 2)}

When a user asks a question, respond with the appropriate function call in JSON format.
For example:
- If asked "Create a new artist named John Doe who plays guitar from USA", respond with:
  {"function": "createArtist", "arguments": {"name": "John Doe", "instrument": "guitar", "country": "USA"}}

When a user request requires multiple operations, respond with a list of function calls in JSON format.
For example:
[
  {"function": "createArtist", "arguments": {...}},
  {"function": "createBand", "arguments": {...}},
  {"function": "createAlbum", "arguments": {...}}
]

Always respond with the function call(s) in JSON format, nothing else.
`;

const GROQ_MODEL = "llama3-70b-8192";

module.exports = {
    FUNCTION_DICT,
    SYSTEM_PROMPT,
    GROQ_MODEL
};
