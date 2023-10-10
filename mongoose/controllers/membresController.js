const membres = require('../models/membresModel')
const ObjectID=require('mongoose').Types.ObjectId


module.exports.getAll = async (req, res) => {
    try {
        const Membres = await membres.find().select('-passWord')
        res.status(200).send(Membres)
    } catch (err) {
        res.status(404).json({ erreur: 'err' })
    }   
}

module.exports.getByTerm = async (req, res) => {

    const termOfResearch=req.params.termOfResearch.toUpperCase();
    try {
        const Membres = await membres.find().select('-passWord')
        const recherches = Membres.filter(membre=>(membre.firstName+membre.lastName+membre.pseudo+membre.alias+membre.sexe).toUpperCase().includes(termOfResearch))
        res.status(200).send(recherches)
    } catch (err) {
        res.status(404).json({ erreur: 'err' })
    }   
}

module.exports.getFiltred = async (req, res) => {
    try {
        const Membres = await membres.find().select('-passWord')
        res.status(200).send(Membres)
    } catch (err) {
        res.status(404).json({ erreur: 'err' })
    }   
}

module.exports.add = async (req, res) => {
    const { pseudo,passWord,departementDOrigine,firstName,lastName,sexe,telephoneNumber,statu,profil,alias,qualification,formation1,formation2,email,dateAnniversaire,tngroupe,apropos,confidentiel } = req.body
    const galeriePrive={imgPublic:'',imgPrive: '',imgPublic1:'',imgPublic2:''}
    const chef="non"
    const id=membres.length
    try {
        const newMembre = await membres.create(
            { 
                id:id,
                pseudo:pseudo,
                passWord:passWord,
                departementDOrigine:departementDOrigine,
                firstName:firstName,
                lastName:lastName,
                sexe:sexe,
                telephoneNumber:telephoneNumber,
                statu:statu,
                profil:profil,
                alias:alias,
                qualification:qualification,
                formation1:formation1,
                formation2:formation2,
                email:email,
                dateAnniversaire:dateAnniversaire,
                galeriePrive: galeriePrive,
                tngroupe:tngroupe,
                apropos:apropos,
                confidentiel:confidentiel,
                chef:chef
             })
        res.status(201).json({ newMembreId: newMembre._id })
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.maj = async (req, res) => {
    const membrePseudo = req.params.pseudo;
    const {
        Prénom,
        Nom,
        Surnom,
        Département,
        Date,
        Téléphone,
        Formation1,
        Formation2,
        Equipe
        }=req.body
    try {
        await membres.updateOne(
            {pseudo:membrePseudo},//{_id:id},
            {
                firstName:Prénom,
                lastName:Nom,
                alias:Surnom,
                departementDOrigine:Département,
                dateAnniversaire:Date,
                telephoneNumber:Téléphone,
                formation1:Formation1,
                formation2:Formation2,
                tngroupe:Equipe
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
            res.status(200).send({'membrePseudo':membrePseudo})
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.majProps=async (req,res)=>{
    const {statu,profil,chef}=req.body
    const membrePseudo = req.params.pseudo;
    try {
        await membres.updateOne(
            {pseudo:membrePseudo},//{_id:id},
            {
                statu:statu,
                profil:profil,
                chef:chef
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
        )
        res.status(200).send({'membrePseudo':membrePseudo})
    } catch (err) {
        return res.status(400).send(err)
    }
}

 module.exports.majGalerie=async (req,res)=>{
    const membrePseudo = req.params.pseudo;
    const membreSProp = req.params.sProp;
    const propAMaj='galeriePrive.'+membreSProp
    try {
        if(membreSProp==='apropos'|| membreSProp==='confidentiel'){
            const {notes,notesConfid}=req.body
            await membres.updateOne(
                {pseudo:membrePseudo},//{_id:id},
                {
                    apropos:notes,
                    confidentiel:notesConfid
                },
                {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
        }else{
            const {nameToSave} = req.body
            await membres.updateOne(
                {pseudo:membrePseudo},
                {
                [propAMaj]:nameToSave
                },
                {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
        }
        res.status(200).send({'membrePseudo':membrePseudo})
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.delete = async (req, res) => {
    const id=req.params.id
    if(!ObjectID.isValid(id)){return res.status(404).send('ID [ '+ id + ' ] unknown !')}
    try {
        await membres.deleteOne({_id:id})
        res.status(201).send('Membre deleted successfuly like OK')
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.getOne = async (req, res) => {
    const pseudo=req.params.pseudo
    // if(!ObjectID.isValid(id)){return res.status(404).send('ID [ '+ id + ' ] unknown !')}
    try {
        const membre = await membres.findOne({pseudo:pseudo})
        res.status(201).send(membre)
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.searchIfMembre= async (req, res)=>{
      const Membres = await membres.find().select('-passWord')
      const pseudos=Membres.filter(membre=>membre.pseudo===req.params.term);
      let bool=true
      if((pseudos && pseudos.length===0) || pseudos.length===undefined){
        bool=false
      }else{
        bool=true
      }
      res.status(200).send(bool)
      };