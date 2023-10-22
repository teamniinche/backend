const router=require('express').Router();
const imagesController=require('../controllers/imagesController')

router.get('/getAll',imagesController.getAll)//Obtenir tous les chantiers // Okrouter.get('/:name',chantiersController.getOne) //Obetenir UN chantier par som nom enregistré// Ok
router.get('/albums/getAll',imagesController.getAlbs)
router.get('/:name',imagesController.getImage) //Obtenir le nouveau chantier en cours// ok
router.post('/post/:name',imagesController.add) //Poster le nouveau chantier au finish// Ok
router.post('/add/album',imagesController.addAlb) //Poster le nouveau chantier au finish// Ok
router.delete('/delete/:name',imagesController.delete) //Supprimer un chantier de la base de données Ok

module.exports=router;
