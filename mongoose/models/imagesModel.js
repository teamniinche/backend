const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema(
    {
        numeroEnvoi: { type: Number },
        ordreEnvoi: { type: Number },
        imgName:{
            type:String,
            default:'galerie_' + numeroEnvoi + '_' + ordreEnvoi + '.jpg'
        },
        album: { type: String }
    }
);
const imagesModel = mongoose.model('image', imagesSchema);
module.exports = imagesModel;