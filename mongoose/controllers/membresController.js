const membres = require('../models/membresModel')
const nodeMailer=require('nodemailer')
const bcrypt=require('bcrypt')
const ObjectID=require('mongoose').Types.ObjectId

function getRandomForEmailConfirm(min, max) {
    return Math.random() * (max - min) + min;
  }

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
        const unblockedMembres=recherches.filter(membre=>membre.statu==="v")
        res.status(200).send(unblockedMembres)
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
    const odiem=bcrypt.genSaltSync(10)
    const { pseudo,passWord,departementDOrigine,firstName,lastName,sexe,telephoneNumber,statu,profil,alias,qualification,formation1,formation2,email,dateAnniversaire,tngroupe,apropos,confidentiel } = req.body
    const galeriePrive={imgPublic:'',imgPrive: '',imgPublic1:'',imgPublic2:''}
    const chef="non"
    const id=membres.length
    const deggat= await bcrypt.hash(passWord,odiem)
    // const codeInMail=getRandomForEmailConfirm(9001,10000)
    try {
        const newMembre = await membres.create(
            { 
                id:id,
                pseudo:pseudo,
                passWord:deggat,
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
                chef:chef,
                IValidation:false,
                // EValidation:{code:codeInMail,confirmation:false},

             })
        // confirmEmail(email)
        res.status(201).json({ newMembreId: newMembre._id })
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.validMembre = async (req, res) => {
            const pseudo=req.params.pseudo
            await membres.updateOne(
                {pseudo:pseudo},
                {IValidation:true},
                {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
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
        Qualification,
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
                qualification:Qualification,
                tngroupe:Equipe
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
            res.status(200).send({'membrePseudo':membrePseudo})
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.changePassWord = async (req, res) => {
    const membrePseudo = req.params.pseudo;
    const {passWord}=req.body
    const odiem=10
    const deggat= await new Promise((resolve,reject)=>{
        bcrypt.hash(passWord,odiem,function(err,hast){
        if(err) reject(err)
        resolve(hash)
        });
    })
    try {
        await membres.updateOne( {pseudo:membrePseudo},{passWord:deggat},
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
            )
            res.status(200).send({'retour':'Mot de passe changé avec succés !'})
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

module.exports.majRs=async (req,res)=>{
    const {X,Fa,In,Li}=req.body
    const membrePseudo = req.params.pseudo;
    try {
        await membres.updateOne(
            {pseudo:membrePseudo},//{_id:id},
            {
                'rS.userX':X,
                'rS.userFa':Fa,
                'rS.userIn':In,
                'rS.userLi':Li
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
        )
        res.status(200).send({'retour':'rs bien mis à jour !'})
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
        // const unblockedMembres=membres.filter(membre=>membre.statu==="v")
        const membre = await membres.findOne({pseudo:pseudo}) //test
        res.status(201).send(membre)
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.login = async (req, res) => {
    const {pseudo,passWord}=req.body
    try {
        // const unblockedMembres=membres.filter(membre=>membre.statu==="v")
        const membre = await membres.findOne({pseudo:pseudo}) //test
        if(!membre){res.status(203).send({erreur:"Nom d'utilisateur inconnu ❗"})}
        else{
            const isValid=bcrypt.compare(passWord,membre.passWord)
            if(!isValid){
                res.status(202).send({erreur:'Mot de passe éroné ❗'})
            }else{
                res.status(201).send(membre)
            }
        }
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

const confirmEmail=async (email)=>{
    const transporteur=nodeMailer.createTransport(
        {
            service: 'gmail',
            auth: {
              user: 'ndourm9@gmail.com',
              pass: '1m7A5m9A',
            },   
        }
    );

    const mailOptions={
            from:'ndourm9@gmail.com',
            to:email,
            subject:'Test nodemailer',
            text:'My first NODEMAILER mail from to ndayfatou@gmail.com'
        }

    transporteur.sendMail(mailOptions,
            (error,info)=>{
                if(error){
                    console.loge=('Mail sending succed❤🥰')
                }else{
                    console.log({'Mail sending failed!':error})
                }
            }
    )

}
