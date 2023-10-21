const mongoose = require('mongoose');

const albumsSchema = new mongoose.Schema(
    {
        album: { type: String }
    }
);
const albumsModel = mongoose.model('Album', albumsSchema);
module.exports = albumsModel;