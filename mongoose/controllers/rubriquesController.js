const rubriques = require('../models/rubriquesModel')
// const ObjectID=require('mongoose').Types.ObjectId


module.exports.getAll = async (req, res) => {
    try {

        const Rubriques = await rubriques.find().select()
        res.status(200).json(Rubriques)
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.maj = async (req, res) => {
    const {titre,redaction} = req.body
    const title = req.params.title
    // if(!ObjectID.isValid(id)){return res.status(404).send('ID [ '+ id + ' ] unknown !')}
    try {
        await rubriques.updateOne(
            {titre:title},
            {
               titre:titre,
                redaction:redaction
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
            res.status(200).send({rubriqueId:title})
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.getOne = async (req, res) => {
    const title=req.params.title
    // if(!ObjectID.isValid(id)){return res.status(404).send('ID [ '+ id + ' ] unknown !')}
    try {
        const rubrique = await rubriques.findOne({title:title})
        res.status(201).send(rubrique)
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}