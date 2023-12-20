const membres = require('../models/membresModel')

const nodeMailer=require('nodemailer')
const bcrypt=require('bcrypt')
// const { emailValidator } = require('../../../TN-Frontent/src/regExpressions');
const ObjectID=require('mongoose').Types.ObjectId

function getRandomForEmailConfirm(min, max) {
    return Math.round(Math.random() * (max - min) + min);
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
    const { pseudo,passWord,departementDOrigine,firstName,lastName,sexe,telephoneNumber,statu,profil,alias,qualification,formation1,formation2,email,dateAnniversaire,tngroupe,apropos,confidentiel } = req.body
    const galeriePrive={imgPublic:'',imgPrive: '',imgPublic1:'',imgPublic2:''}
    const chef="non"
    
    const codeInMail=Math.round(getRandomForEmailConfirm(9001,10000))
    try {
        const odiem=bcrypt.genSaltSync(10)
        bcrypt.hash(passWord,odiem, async function(err,hash){
        if(err){alert(err.message)}else{
        const Membres = await membres.find().select('-passWord')
        const id=Membres.length
        const newMembre = await membres.create(
            { 
                id:id,
                pseudo:pseudo,
                passWord:hash,
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
                addedImages:[],
                tngroupe:tngroupe,
                apropos:apropos,
                confidentiel:confidentiel,
                chef:chef,
                IValidation:false,
                rS:{userX:'',userFa:'',userIn:'',userLi:''},
                EValidation:{code:codeInMail,confirmation:false},

             })
        // confirmEmail(email)
        res.status(201).json({ newMembreId: newMembre._id,pseudo:newMembre.pseudo,codeConfirmation:codeInMail,email:email })
        // res.redirect('/mailjet/sendConfirmationMail/'+codeInMail)
        }})
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
    const {Ancien,Nouveau,Confirmation}=req.body
    const deggat= await new Promise((resolve,reject)=>{
        const odiem=bcrypt.genSaltSync(10)
        bcrypt.hash(Nouveau,odiem,function(err,hash){
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
module.exports.addIIRemoveImage=async (req,res)=>{
    const pseudo=req.body.pseudo
    const images=req.body.images
    try {
        await membres.updateOne(
            {pseudo:pseudo},
            {
                addedImages:images 
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
        )
        res.status(200).send({'retour':'✔ Image bien ajoutée à votre galérie personnelle ❕'})
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
            const isValid=await new Promise((resolve,reject)=>{
                bcrypt.compare(passWord,membre.passWord,function(err,isValid){
                if(err) reject(err)
                resolve(isValid)
                });
            })
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

module.exports.isSame = async (req, res) => {
    const {pseudo,passWord}=req.body
    try {
        const membre = await membres.findOne({pseudo:pseudo})
        const isValid=await new Promise((resolve,reject)=>{
            bcrypt.compare(passWord,membre.passWord,function(err,isValid){
            if(err) reject(err)
            resolve(isValid)
            });
        })
        if(!isValid){res.status(202).send({fidback:false})
        }else{res.status(201).send({fidback:true})}
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

module.exports.confirmEmail=async (req,res)=>{
    	const {pseudo,email,code}=req.body
	const Membres = await membres.find()
       	const code=Membres.filter(membre=>membre.email===email)[0].EValidation.code;
    
    //secret et key à mettre dans .env du serveur
    const transporteur=nodeMailer.createTransport(
        {
            service:"Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: 'ndourm9@gmail.com',
              pass: process.env.NODEMAILER_AUTH_PASS,
            },   
        }
    );
    const date=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')      // replace T with a space
                     
    const mailOptions={
            from: '"Team Niintche  🇸🇳 " teamniintche@gmail.com', // sender address
            to: email, // list of receivers
            subject: code +" est le code de vérification de votre adresse e-mail ✔", // Subject line
            text: "LES VOLONTAIRES DE LA CITOYENNETE ACTIVE 🇸🇳 ", // plain text body
            html: "<b>Bonjour "+pseudo+",<br/><br/>Ce code est requis pour valider votre inscription à une plateforme digitale de la teamniintche.<br/><br/>Code de vérification : <h1>" +code+"</h1><br/><br/>Cordialement, __________  "+date+"</b>", // html body
        }

    transporteur.sendMail(mailOptions,
            (error,info)=>{
                if(!error){
                    res.status(200).send({CODE :"sent"})
                }else{
                    res.status(404).send({'Mail sending failed!':error})
                }
            }
    )

}

// function membreFinder=async (email)=>{

module.exports.codeIsValid=async (req,res)=>{
    const email=req.body.email;
    const code=parseInt(req.body.code);
   try{ 
        const Membres = await membres.find();
        const membre=Membres.filter(membre=>membre.email===email);
        const validCode=membre[0].EValidation.code;
        if(membre && validCode && code===validCode){
            majValidation(email)
            res.status(200).send({isValid:true})
        }else{
            res.status(440).send({isValid:false})
        }
    }catch(err){console.log('err:'+err)}

}

const majValidation=async (email)=>{
    try {
        await membres.updateOne(
            {email:email},//{_id:id},
            {
                'EValidation.confirmation':true,
            },
            {new:true, upsert:true, setDefaultsOnInsert:true,validateModifiedOnly:true}
        )
        // res.status(204).send({isValid:true})
    } catch (err) {
        return console.log("Une erreur s'est produite lors de la mise à jour  de la validation: "+err)
    }
}

// ******************************** VERIFICATION D'E-MAIL **************************

module.exports.verifyEmail=async (req,res)=>{
    const email=req.body.email
    const email_verifier_url="https://api.hunter.io/v2/email-verifier?email="+{email}+"&api_key="+process.env.HUNTER_API_KEY
    try {
	fetch(email_verifier_url
        , {
        method: 'GET',
        headers: {}
      })
    .then(response =>response.json())
	.then(data =>res.status(200).send(data))
} catch (error) {
	res.status(400).json(error);
}}
