const router=require('express').Router();
const rubriquesController=require('../controllers/rubriquesController')

router.get('/allrubriques',rubriquesController.getAll)
router.get('/:ttle',rubriquesController.getOne)
router.put('/:title',rubriquesController.maj)
// router.post('/newMembre',rubriquesController.add)
// router.delete('/:id',rubriquesController.delete)

module.exports=router;