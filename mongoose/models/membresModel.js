const mongoose = require('mongoose')

const membresSchema = new mongoose.Schema(
    {
        id:{type:Number},
        pseudo: { type: String,required:true,maxlength: 50, minlength: 1 },
        passWord: { type: String,required:true,maxlength: 100, minlength: 1 },
        firstName: { type: String,required:true,maxlength: 50, minlength: 1 },
        lastName: { type: String,required:true,maxlength: 50, minlength: 1 },
        alias: { type: String },
        sexe: { type: String,required:true,maxlength: 50, minlength: 1 },
        departementDOrigine: { type: String,required:true,maxlength: 50, minlength: 1 },
        dateAnniversaire: { type: String },
        telephoneNumber: { type: String,required:true,maxlength: 50, minlength: 1 },
        email: { type: String },
        rS:{
            userX:{type:String},
            userFa:{type:String},
            userIn:{type:String},
            userLi:{type:String},
        },
        formation1: { type: String },
        formation2: { type: String },
        tngroupe: { type: String },
        qualification: { type: String },
        galeriePrive: {
            imgPublic: { type: String },
            imgPrive: { type: String },
            imgPublic1: { type: String },
            imgPublic2: { type: String }
        },
        apropos: { type: String },
        confidentiel: { type: String },
        statu: { type: String },
        profil: { type: String },
        chef: { type: String },
        IValidation:{type:Boolean}
    }
)
const membresModel = mongoose.model('membre', membresSchema);
module.exports = membresModel;
