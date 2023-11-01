const mongoose = require('mongoose');

const albumsSchema = new mongoose.Schema(
    {
        name: { type: String }
    }
);
const albumsModel = mongoose.model('Album', albumsSchema);
module.exports = albumsModel;