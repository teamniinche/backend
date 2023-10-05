const express = require('express');
require('dotenv').config({path:'./.env'});
require('./config/db')

const chantersRoutes=require('./mongoose/routes/chantiersRoutes')
const membresRoutes=require('./mongoose/routes/membresRoutes')
const rubriquesRoutes=require('./mongoose/routes/rubriquesRoutes')
// const rubriques = require('./lateam.json');
// const membres=require('../JSON/membres.json');
// const chantierss = require('../JSON/chantierss.json');
// const nouveauChantier = require('../JSON/nouveauChantier.json');
// // const chantiers = require('./chantiers.json');
// const apprendre=require('../JSON/apprendre.json')
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
// const cors=require('cors')

// const images=require('./images')
// WwTB1JW5B8Luv5aD   cluster password
// API key : xL5LWxDU0KvME7EliNkyCQrEQS0zICkdrFKpi5iJfzRpSfnsz8vzWYN6TvjyQcOo
// cluster : mongodb+srv://ndourm9:<password>@cluster0.mecdq3p.mongodb.net/
// https://eu-west-2.aws.data.mongodb-api.com/app/data-rgclf/endpoint/data/v1

// const PORT=8000;
const app=express();
// Set middleware of CORS 
app.use(cors())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin","https://teamniintcheft.onrender.com");
  res.header("Access-Control-Allow-Methods","GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE");
  res.header("Access-Control-Allow-Headers","Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.header("Access-Control-Max-Age", 7200);

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/chantiers',chantersRoutes)
app.use('/api/membres',membresRoutes)
app.use('/api/rubriques',rubriquesRoutes)
// function upDateFile(url,file){
//     let fileString=JSON.stringify(file)
//     fs.writeFileSync(url,fileString,(error)=>{
//         if(error){
//             console.log("il y'a eu erreur lors de la modification du fichier: "+ error.message)
//         }else{
//             console.log("Le fichier est bien modifié.")
//         }
//     })
// }
// app.listen(process.env.PORT, 'www.teamniintcheft.onrender.com', () => {
//   console.log('Serveur en écoute sur www.teamniintcheft.onrender.com au port'+process.env.PORT);
// });

app.listen(process.env.PORT,()=>{console.log('Serveur démarré au port '+ process.env.PORT)})

// // Routes for getting all the items
// // app.get('/api/chantiers',(requete,response)=>{response.send(chantierss)});
// // app.get('/api/rubriques',(requete,response)=>{response.send(rubriques)});
// // app.get('/api',(requete,response)=>{
// //     switch(requete.body.types){
// //         case 'rubriques':
// //             return response.send(rubriques);
// //         case 'membres':
// //             return response.send(membres);
// //         case 'chantiers':
// //             return response.send(chantiers);
// //         case 'apprendre':
// //             return response.send(apprendre);
// //         default:
// //             return '';
// //         }},
// //     );
// // app.get('/api/membres',(requete,response)=>{response.send(membres)});
// app.get('/api/apprendre',(requete,response)=>{response.send(apprendre)});
// app.get('/api/chantierTermine',(requete,response)=>{
//   const chantier=nouveauChantier.filter(chantier=>chantier.id===0);response.send(chantier)});

// // Routes for getting one item  by params
// // app.get('/api/ubriques/:title', (req, res) => {
// //     const rubriqueTitle = req.params.title;
// //     const rubrique= rubriques.find(rubrique => rubrique.titre=== rubriqueTitle);
// //     if (rubrique) {
// //         res.json(rubrique);
// //     } else {
// //         res.status(404).json({ error: 'Utilisateur non trouvé' });
// //     }
// //     });
// // app.get('/api/hantiers/:id', (req, res) => {
// //     const chantierId = parseInt(req.params.id);
// //     const chantier = chantierss.find(chantier => chantier.id === chantierId);
// //     if (chantier) {
// //         res.json(chantier);
// //     } else {
// //         res.status(404).json({ error: 'Chantier non trouvé' });
// //     }
// //     });
// // app.get('/api/ouveauChantier/:id', (req, res) => {
// //     const chantierId = parseInt(req.params.id);
// //     const chantier = nouveauChantier.find(chantier => chantier.id === chantierId);
// //     const N=chantierss.length;
// //     if (chantier) {
// //         res.json({chantier:chantier,nombreDeChantiers:N});
// //     } else {
// //         res.status(404).json({ error: 'Pas de nouveau chantier en cours' });
// //     }
// //     });
// // app.get('/api/membres/:pseudo', (req, res) => {
// //     const membrePseudo = req.params.pseudo;
// //     const membre = membres.find(membre => membre.pseudo === membrePseudo);
// //     if (membre) {
// //         res.json(membre);
// //     } else {
// //         res.status(404).json({ error: 'Utilisateur non trouvé' });
// //     }
// //     });
    
// // Routes for updating an item: une valeur(req.body.propriete) est affectuée à chaque propriete(item.propriete)
// app.put('/api/apprendre/:id', (req, res) => {
//     const rubriqueId = parseInt(req.params.id);
//     const rubrique = apprendre.find(rubrique => rubrique.id === rubriqueId);
//     if (rubrique) {
//         rubrique.prenom = req.body.prenom
//         rubrique.nom=req.body.nom
//      upDateFile('./apprendre.json',apprendre);
//       res.json(apprendre);
//       console.log(apprendre)
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   });
// // app.put('/api/ubriques/:title', (req, res) => {
// //     const rubriqueTitle = req.params.title;
// //     const rubrique = rubriques.find(rubrique => rubrique.titre === rubriqueTitle);
// //     if (rubrique) {
// //       rubrique.redaction = req.body.redaction
// //      upDateFile('./lateam.json',rubriques);
// //       res.json(rubrique);
// //       console.log(rubriques)
// //     } else {
// //       res.status(404).json({ error: 'Utilisateur non trouvé' });
// //     }
// //   });
// app.put('/api/majmembres/:pseudo', (req, res) => {
//     const membrePseudo = req.params.pseudo;
//     if(req.body.delete){
//       const Membres=membres.filter(membre =>membre.pseudo!==membrePseudo)
//       // upDateFile('./membres.json',Membres);
//       res.json(Membres);
//       console.log(Membres) //Ces cpnsole.log sont à supprimer après
//     }else{
//     const membre = membres.find(membre => membre.pseudo === membrePseudo);
//     if (membre) {
//       if(!req.body.statu){
//           membre.firstName = req.body.Prénom
//           membre.lasttName = req.body.Nom
//           membre.alias = req.body.Surnom
//           membre.departementDOrigine = req.body.Département
//           membre.dateAnniversaire = req.body.Date
//           membre.telephoneNumber = req.body.Téléphone
//           membre.formation1 = req.body.Formation1
//           membre.formation2 = req.body.Formation2
//           membre.tngroupe = req.body.Equipe
//       }else{
//           membre.statu = req.body.statu
//           membre.profil = req.body.profil
//           membre.chef = req.body.chef
//       }
//      upDateFile('./membres.json',membres);
//       res.json(membre);
//       console.log(membres) //Ces cpnsole.log sont à supprimer après
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }}
//   });

//   app.put('/api/apprendre/:id/:prop', (req, res) => {
//     const id = parseInt(req.params.id);
//     const prop = req.params.prop;
//     const membre = apprendre.find(membre => membre.id === id);
//     if (membre) {
//       membre[prop] = req.body[prop]//les autres props à attribuer une valeur
//      upDateFile('./apprendre.json',apprendre);
//       res.json(membre);
//       console.log(apprendre) //Ces cpnsole.log sont à supprimer après
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   });

//   // Mise à jour PROPS
//   app.put('/api/membres/:pseudo/:prop', (req, res) => {
//     const membrePseudo = req.params.pseudo;
//     const membreProp = req.params.prop
//     const clientProp = req.params.prop==='apropos'?'notes':'notesConfid';
//     // console.log(membrePseudo+' '+membreProp)
//     const membre = membres.find(membre => membre.pseudo === membrePseudo);
//     if (membre) {
//       // console.log(req.body[membreProp])
//       membre[membreProp] = req.body[clientProp] //les autres props à attribuer une valeur
//      upDateFile('./membres.json',membres);
//       res.json(membre);
//       console.log(membres) //Ces cpnsole.log sont à supprimer après
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   });

//   // Mise à jour SOUS-PROPS
//   app.put('/api/membes/:pseudo/:prop/:sProp', (req, res) => {
//     const membrePseudo = req.params.pseudo;
//     const membreProp = req.params.prop;
//     const membreSProp = req.params.sProp;
//     let stateSProp=''
//     switch (membreProp){ 
//       case 'galeriePrive':
//         stateSProp='nameToSave';
//         break;
//       default:
//         stateSProp=membreSProp
//     }
//     const membre = membres.find(membre => membre.pseudo === membrePseudo);
//     if (membre) {
//       membre[membreProp][membreSProp] = req.body[stateSProp] //les autres props à attribuer une valeur
//      upDateFile('./membres.json',membres);
//       res.json(membre);
//       console.log(membres)//Ces cpnsole.log sont à supprimer après
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   });

//   app.put('/api/chantiers/:id', (req, res) => {
//     const chantierId = parseInt(req.params.id);
//     const chantier = chantierss.find(chantier => chantier.id === chantierId);
//     if (chantier) {
//       chantier.name = req.body.name
//       chantier.images = req.body.images
//       chantier.redaction = req.body.redaction
//      upDateFile('./chantiers.json',chantierss);
//       res.json(chantier);
//       console.log(chantierss)
//     } else {
//       res.status(404).json({ error: 'Utilisateur non trouvé' });
//     }
//   });
//   app.put('/api/nouveauChantier/:prop', (req, res) => {
//     const prop=req.params.prop;
//     const nameImg=req.body.nImage, sousTitre=req.body.sousTitre
//     const sPropArray=nameImg.split(''),nSProp=sPropArray[sPropArray.length-5],sProp=prop+nSProp
//     console.log(sProp)
//     const chantier = nouveauChantier.find(chantier => chantier.id=== 0);
//     if(chantier){
//         chantier[prop][sProp].sTitre=sousTitre
//         chantier[prop][sProp].linkImg=nameImg
//         upDateFile('./nouveauChantier.json',nouveauChantier)
//         res.json(chantier);
//         console.log(nouveauChantier) //Ces connsole.log sont à supprimer après
//     } else {
//         res.status(404).json({ error: 'chantier non trouvé' });
//     }
//   });
//   app.put('/api/updateStringsNouveauChantier',(req,res)=>{
//     const chantier = nouveauChantier.find(chantier => chantier.id=== 0);
//     const chant=req.body
//     if(chantier){
//       chantier.name=chant.name;
//       chantier.departement=chant.departement;
//       chantier.region=chant.region;
//       chantier.presentation=chant.presentation;
//       chantier.type=chant.type;
//       chantier.dates.debut=chant.dates.debut;
//       chantier.dates.fin=chant.dates.fin;
//       chantier.bilan=chant.bilan;
//       chantier.etatLit=chant.etatLit;
//       chantier.renduLit=chant.renduLit;
//       upDateFile('./nouveauChantier.json',nouveauChantier);
//       res.json(chantier);
//     } else {
//         res.status(404).json({ error: 'chantier non trouvé' });
//     }
//   });

// // Créer un nouveau= create a new item:items.lenght n'est pas pertinent pour donner l'ID(à changer).
// app.post('/api/membres', (req, res) => {
// const newMembre = {id: membres.length,...req.body}
// membres.push(newMembre);
// upDateFile('./membres.json',membres)
// console.log(membres)//Ces cpnsole.log sont à supprimer après
// // let apprendreString=JSON.stringify(membres)
// // fs.writeFileSync('./membres.json',apprendreString,(error)=>{
// //     if(error){
// //         console.log("il y'a eu erreur lors de la modification du fichier: "+ error.message)
// //     }else{
// //         console.log("Le fichier est bien modifié.")
// //     }
// // })
// console.log(membres)//Ces cpnsole.log sont à supprimer après
// res.status(201).json(newMembre);
// });
// app.post('/api/chantiers', (req, res) => {
//     const newChantier = {...req.body,id:chantierss.length}
//     chantierss.push(newChantier);
//     upDateFile('./chantierss.json',chantierss)
//     console.log(chantierss)
//     res.status(201).json('Mise à jour **CHANTIERS** réussie');
//   });
// app.post('/api/nouveauChantier', (req, res) => {
//   const chantierAVide=req.body;
//   const chantier = nouveauChantier.filter(chantier => chantier.id!== 0);
//   chantier.push(chantierAVide)
//   upDateFile('./nouveauChantier.json',chantier)
// });

  //UPLOADER UNE IMAGE 1) ,2) et 3)
// 1) Chemin relatif vers le dossier "images" dans l'espace de l'application
const imagesPath = path.join(__dirname, '../src/images');
// 2) Configuration de Multer pour gérer les fichiers uploadés
function configureMulter(fieldName) {
  return multer({
                  storage: multer.diskStorage({
                                destination: function (req, file, cb) {cb(null, imagesPath);},
                                filename: function (req, file, cb) {
                                                                      const uniqueName =req.params.name; 
                                                                      cb(null, uniqueName + '.jpg');
                                                                  }
                                })
                }).single(fieldName);
}
// const storage = multer.diskStorage({
//                       destination: function (req, file, cb) {cb(null, imagesPath);},
//                       filename: function (req, file, cb) {const uniqueName =req.params.name;cb(null, uniqueName + '.jpg')}
//                         // console.log(uniqueName)
//                         // const fileExtension = path.extname(file.originalname);
//                         // cb(null, uniqueName + '.jpg')
//                         //fileExtension);
//                       // }
//                 });
// const upload = multer({ storage: storage });
// 3) Endpoint pour recevoir l'image uploadée
// upload.single('images'),
app.post('/uploadimage/:name/:field',(req, res) => {
        const fieldName = req.params.field; // Récupérer le nom du champ dynamique depuis l'URL
        const uploadMiddleware = configureMulter(fieldName);

        uploadMiddleware(req, res, function (err) {
                      if (err instanceof multer.MulterError) {
                          // Une erreur multer s'est produite lors du téléchargement
                          return res.status(500).json({ error: err.message });
                      } else if (err) {
                          // Une autre erreur s'est produite
                          return res.status(500).json({ error: "Une erreur s'est produite lors du téléchargement de l'image." });
                      }
                    // L'image a été enregistrée avec succès
                      const formData = req.body;
                      console.log(formData)
                      res.json({ message: "image enregistrée avec succes" });
                  });
});

// Erreurs de debutant : app.post('/api/apprndre', (req, res) => {
//     // Obtenir les données postées depuis le corps de la requête
//     const data = req.body;
    
//    fs.writeFileSync('./apprendre.json',data,(error)=>{
//     if(error){
//         console.log("il y'a eu erreur lors de la modification du fichier: "+ error.message)
//     }else{
//         console.log("Le fichier est bien modifié.")
//     }
//     })
    
//     // Envoyer une réponse de réussite au client
//     res.send('Requête POST réussie');
//     });
//app.get('/api/apprendre',(requete,response)=>{
//         const fs = require('fs');
    
//     // Charger les données JSON à partir d'un fichier
//     const jsonData = fs.readFileSync('./apprendre.json', 'utf8');
    
//     // Analyser les données JSON en tant qu'objet JavaScript
//     const data = JSON.parse(jsonData);
//         response.send(data)
//         });

// Filtres pour les zones de recherche

// app.get('/api/membre/:termOfResearch',(requete,response)=>{   
//     const termOfResearch=requete.params.termOfResearch.toUpperCase();
//     const recherches=termOfResearch===undefined?membres:membres.filter(membre=>(membre.firstName+membre.lastName+membre.alias+membre.sexe).toUpperCase().includes(termOfResearch));
//     response.send(recherches)
//     }); //Filtres pour les zones de recherche
// app.get('/api/chantier/:termOfResearch',(requete,response)=>{   
//     const termOfResearch=requete.params.termOfResearch.toUpperCase();
//     if(termOfResearch!=='nombre'){
//     const recherches=chantierss.filter(chantier=>(chantier.name+chantier.redaction+chantier.id).toUpperCase().includes(termOfResearch));
//     response.send(recherches)
//     }else{
//       response.send(chantierss.length)
//     }}); //Filtres pour les zones de recherche
// app.get('/pseudos/:term',(requete,response)=>{
//   // console.log(requete.params.term)
//     const pseudos=membres.filter(membre=>membre.pseudo===requete.params.term);
//     let bool=true
//     if((pseudos && pseudos.length===0) || pseudos.length===undefined){
//       bool=false
//     }else{
//       bool=true
//     }
//     // console.log(pseudos.length)
//     // console.log(bool)//Ces cpnsole.log sont à supprimer après
//     response.send(bool)
//     });

    // Erreurs de debutant: app.post('/changerprenom', (req, res) => 
    // {
    //    console.log(JSON.parse(req.body).prenom)
    // })

    // app.post('/modifierMembres/:id', (req, res) => {
    //   // Chemin du fichier JSON
    //   const cheminFichier = './chantiers.json';
    
    //   // Lire le contenu du fichier JSON
    //   fs.readFile(cheminFichier, 'utf8', (err, data) => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).json({ message: 'Erreur lors de la lecture du fichier JSON' });
    //     }
    
    //     // Convertir le contenu en objet JSON
    //     let membres = Object.values(JSON.parse(data));
    //     let membresRest=membres.filter(mbre => mbre.id!==req.params.id); //supprimer le membre à modifier
    //     let membre=membres.filter(mbre => mbre.id===req.params.id)[0]; //isoler le mebre à modifier(un suppose que c'est un json)
    
    //     // Modifier les propriétés de l'objet JSON selon vos besoins
    //     membre.firstName = JSON.parse(req.body).firstName; // la modification effective du membre
    //     alert(membre.firstName)
    //     // Convertir l'objet JSON modifié en chaîne de caractères
    //     let membreModifie = JSON.stringify(membre);
    //     membresRest.push(membreModifie)
    //     let membresModifies=JSON.stringify(membresRest);//rajouter le membre modifié + convertir en json de membres
    
    //     // Écrire le contenu modifié dans le fichier JSON
    //     fs.writeFile(cheminFichier, membresModifies, 'utf8', (err) => {
    //       if (err) {
    //         console.error(err);
    //         return res.status(500).json({ message: 'Erreur lors de l\'écriture du fichier JSON' });
    //       }
    
    //       return res.json({ message: 'Fichier JSON modifié avec succès' });
    //     });
    //   });
    // });
