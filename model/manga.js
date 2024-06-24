
 const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('Manga', mangaSchema)