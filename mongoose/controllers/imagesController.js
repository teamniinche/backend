const images = require('../models/imagesModel')
const albums = require('../models/albumsNameModel')


module.exports.getAll = async (req, res) => {

    try {
        const photos = await images.find().select('')
        // const albas = await albums.find().select('')
        res.status(200).json(photos)
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}
module.exports.getAlbs = async (req, res) => {

    try {
        const albas = await albums.find().select('')
        res.status(200).json(albas)
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}
module.exports.add = async (req, res) => {
    try {
        const newPhoto = await images.create(req.body)
        res.status(201).json({ status:'image '+ newPhoto.name + ' added' })
    }  catch (err) {
        res.status(404).json({ erreur: err })
    }
}
module.exports.addAlb = async (req, res) => {
    try {
        const newAlbum = await albums.create({name:req.body.name})
        res.status(201).json({ status:'New Album is added' })
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}


module.exports.delete = async (req, res) => {
    const imageName=req.params.name
    const name=imageName+'.jpg'
    try {
        await images.deleteOne({imgName:name})
        // await cloudinary.uploader.destroy('signed_upload_demo_form/galerie/'+imageName)
        await cloudinary.v2.api
                .delete_resources(['signed_upload_demo_form/galerie/'+imageName], 
                    { type: 'upload', resource_type: 'image' })
                // .then(console.log('success'));
        res.status(201).send('Image deleted successfuly.')
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}

module.exports.getImage = async (req, res) => {
    const name=req.params.name
    try {
        const photo = await images.findOne({name:name})
        res.status(201).send(photo)
    } catch (err) {
        res.status(404).json({ erreur: err })
    }
}
