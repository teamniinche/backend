const router=require('express').Router();
const membresController=require('../controllers/membresController')

router.get('/allmembres',membresController.getAll)
router.get('/allmembres/pseudos/:term',membresController.searchIfMembre)
router.get('/allmembres/:termOfResearch',membresController.getByTerm)
router.get('/:pseudo',membresController.getOne)
router.post('/newMembre',membresController.add)
router.delete(':id',membresController.delete)
router.put('/:pseudo',membresController.maj)
router.put('/galerie/:pseudo/:sProp',membresController.majGalerie)
router.put('/admin/:pseudo',membresController.majProps)

module.exports=router;