const router=require('express').Router();
const membresController=require('../controllers/membresController')

router.get('/allmembres',membresController.getAll)
router.get('/allmembres/pseudos/:term',membresController.searchIfMembre)
router.get('/allmembres/:termOfResearch',membresController.getByTerm)
router.get('/:pseudo',membresController.getOne)
router.post('/login',membresController.login)
router.post('/newMembre',membresController.add)
// Deletion
router.delete(':id',membresController.delete)
// Updating membre
router.put('/:pseudo',membresController.maj)
router.put('/galerie/:pseudo/:sProp',membresController.majGalerie)
router.put('/admin/:pseudo',membresController.majProps)
// Confirmation & Validation
// router.get('/code/:pseudo',membresController.getCode)
// router.put('/confirmCode/:pseudo',membresController.confirm)
// router.put('/validMembre/:pseudo',membresController.validMembre)

module.exports=router;