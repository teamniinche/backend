const chantiers = require('../models/chantiersModel')
const newChantier = require('../models/newChantierModel')
const ObjectID=require('mongoose').Types.ObjectId


module.exports.getAll = async (req, res) => {

    try {
        const chanters = await chantiers.find().select('-id')
        res.status(200).json(chanters)
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}
module.exports.getByTerm = async (req, res) => {
    const termOfResearch=req.params.termOfResearch.toUpperCase();
    try {
        const Chantiers = await chantiers.find().select('-id')
        const chantiersRecherches=Chantiers.filter(chantier=>(chantier.name+chantier.région+chantier.departement+chantier.type+chantier.presentation+chantier.id).toUpperCase().includes(termOfResearch))
        res.status(200).json(chantiersRecherches)
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.add = async (req, res) => {
    try {
        const chanters = await chantiers.find().select('-id')
        const newChantier = await chantiers.create({...req.body,id:chanters.length}) //({ région, departement,name })
        res.status(201).json({ newChantierId: newChantier._id })
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.maj = async (req, res) => {
    // Mise à jour autres(non nested) props chantiers
    
    const {id,region,departement,name,type,presentation,etatLit,renduLit,bilan} = req.body
    const Id = req.params.id
    // const Dates='dates'
    if(!ObjectID.isValid(Id)){return res.status(404).send('ID [ '+ Id + ' ] unknown !')}
    try {
        await chantiers.updateOne(
            {_id:Id},
            {
                id:id,
                region:region,
                departement:departement,
                name:name,
                type:type,
                presentation:presentation,
                etatLit:etatLit,
                renduLit:renduLit,
                bilan:bilan
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
            res.status(200).send({'chantierId':Id})
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.majDates = async (req, res) => {
    // Mise à jour nested props-- dates chantiers
    const {debut,fin} = req.body
    const dates={debut:debut,fin:fin}
    const id = req.params.id
    // const Dates='dates'
    if(!ObjectID.isValid(id)){return res.status(404).send('ID [ '+ id + ' ] unknown !')}
    try {
        await chantiers.updateOne(
            {_id:id},
            {
                dates:dates
                // [Dates]:dates 
                // OU
                    // dates:dates
                // OU
                    //'dates.debut':debut, 
                    //'dates.fin':fin
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
            res.status(200).send({'chantierId':id})
    } catch (err) {
        return res.status(400).send(err)
    }
}
module.exports.majPropSprop=async (req,res)=>{
    //Mise à jour nested props --- des images des chantiers pour 'etat','rendu' et 'programme'
    const chantierProp = req.params.prop;
    const chantierId = req.params.id;
    const {nImage,sousTitre} = req.body
    const sPropArray=nImage.split(''),nSProp=sPropArray[sPropArray.length-5],chantierSProp=chantierProp+nSProp
    const data={linkImg:nImage,sTitre:sousTitre}
    const propAMaj=chantierProp+'.'+chantierSProp
    try {
        await chantiers.updateOne(
            {_id:chantierId},
            {
               [propAMaj]:data
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
            res.status(200).send({'ID':chantierId})
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.delete = async (req, res) => {
    const id=req.params.id
    if(!ObjectID.isValid(id)){return res.status(404).send('ID [ '+ id + ' ] unknown !')}
    try {
        await chantiers.deleteOne({_id:id})
        res.status(201).send('chantier deleted successfuly like OK')
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.getOne = async (req, res) => {
    const name=req.params.name
    // if(!ObjectID.isValid(id)){return res.status(404).send('ID [ '+ id + ' ] unknown !')}
    try {
        const chantier = await chantiers.findOne({name:name})
        res.status(201).send({chantier:chantier,ID:chantier._id}) //{...chantier,ID:chantier._id}
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}
module.exports.getAndEditNewChantier = async (req, res) => {
    const id=req.params.id
    if(!ObjectID.isValid(id)){return res.status(404).send('ID [ '+ id + ' ] unknown !')}
    try {
        const chanters = await chantiers.find().select('-id')
        const chantier = await newChantier.findOne({_id:id})
        res.status(201).send({chantier:chantier,nbreChantiers:chanters.length})
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.updateNewChantier = async (req, res) => {
    const {region} = req.body
    const id="64ea4cd959615516c76ae0b2"
    if(!ObjectID.isValid(id)){return res.status(404).send('ID [ '+ id + ' ] unknown !')}
    try {
        await newChantier.updateOne(
            {_id:id},
            {
                'région':region
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
            res.status(200).send({chantierId:id})
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.initializeNewChantier = async (req, res) => {
    const id="64ea4cd959615516c76ae0b2"
    try {
        await newChantier.updateOne(
            {_id:id},

            req.body
            ,
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
            res.status(200).send({chantierId:id})
    } catch (err) {
        return res.status(400).send(err)
    }
}