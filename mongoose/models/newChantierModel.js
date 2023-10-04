const mongoose = require('mongoose')

const nouveauChantierSchema = new mongoose.Schema(
    {
        id:{type:Number},
        region: {
            type: String,
            maxlength:50,
            minlength:0
        },
        departement: {
            type: String,
            maxlength:50,
            minlength:0
        },
        name: {
            type: String,
            maxlength:50,
            minlength:0
        },
        type: {
            type: String,
            trim: true
        },
        dates: {
            debut: {
                type: String
            },
            fin: {
                type: String
            }
        },
        presentation: {
            type: String,
        },
         etat: {
            etat0: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            },
            etat1: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            },
            etat2: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            },
            etat3: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            },
            etat4: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            }
        },
        etatLit:{type:String},
        programme: {
            programme0: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            }
        },
        rendu: {
            rendu0: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            },
            rendu1: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            },
            rendu2: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            },
            rendu3: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            },
            rendu4: {
                linkImg:  {
                    type: String,
                    unique: false,
                },
                sTitre:  {
                    type: String,
                    maxlength:55,
                    minlength:1
                }
            }
        },
        renduLit:{type:String},
        bilan: {type:String}
    }
)
const nouveauModel = mongoose.model('nouveauChantier', nouveauChantierSchema);
module.exports = nouveauModel;