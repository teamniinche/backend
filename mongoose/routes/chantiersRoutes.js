const router=require('express').Router();
const chantiersController=require('../controllers/chantiersController')
const cors = require('cors')
 
var corsOptions = {
  origin: 'http://www.teamniintcheft.onrender.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/allchantiers',cors(corsOptions),chantiersController.getAll)//Obtenir tous les chantiers // Ok
router.get('/allchantiers/:termOfResearch',chantiersController.getByTerm)//Rechercher un chantier à la barre de recherche OK
router.get('/:name',chantiersController.getOne) //Obetenir UN chantier par som nom enregistré// Ok
router.get('/getNewChantier/:id',chantiersController.getAndEditNewChantier) //Obtenir le nouveau chantier en cours// ok
router.post('/newChantier',chantiersController.add) //Poster le nouveau chantier au finish// Ok
router.delete('/:id',chantiersController.delete) //Supprimer un chantier de la base de données Ok
// Enregistrer mise à jour de chantier modifié
router.put('/majProps/:id',chantiersController.maj) //enregistrer les props non nested Ok
router.put('/:id',chantiersController.majDates) //enregistrer les dates(nested)
router.put('/nouveauChantier/:id/:prop',chantiersController.majPropSprop)//enregistrer les props nested
// fin enregistrer

router.put('/nouveauChantier',chantiersController.initializeNewChantier) //Initialiser le nouveau chantier ok reste seulement à le linker coté CLIENT et adapter sur membres aussi: qui y est d'ailleurs deja

module.exports=router;