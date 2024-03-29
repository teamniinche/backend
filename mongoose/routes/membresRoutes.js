const router=require('express').Router();
const membresController=require('../controllers/membresController')
// const mailjetController=require('../controllers/mailjetController')


router.get('/allmembres',membresController.getAll)
router.get('/allmembres/pseudos/:term',membresController.searchIfMembre)
router.get('/allmembres/:termOfResearch',membresController.getByTerm)
router.get('/:pseudo',membresController.getOne)
router.post('/login',membresController.login)
router.post('/membre/isSame',membresController.isSame)
router.post('/newMembre',membresController.add)

// ****************  NODEMAILER  **************************
router.post('/sendConfirmationMail',membresController.confirmEmail)
router.post('/code_is_valid',membresController.codeIsValid)

// Deletion
router.delete(':id',membresController.delete)
// Updating membre
router.put('/:pseudo',membresController.maj)
router.put('/user/:pseudo',membresController.changePassWord)
router.put('/from/galerie/updateImages',membresController.addIIRemoveImage)
router.put('/galerie/:pseudo/:sProp',membresController.majGalerie)
router.put('/admin/:pseudo',membresController.majProps)
router.put('/userRs/:pseudo',membresController.majRs)
// Confirmation & Validation
// router.get('/code/:pseudo',membresController.getCode)git add 
router.put('/validMembre/:pseudo',membresController.validMembre)

module.exports=router;
