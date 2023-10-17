const cloudinary = require('cloudinary').v2;
require('../../config/cloudinary_config.js');
const apiSecret = cloudinary.config().api_secret;
const cloudName = cloudinary.config().cloud_name;
const apiKey = cloudinary.config().api_key;

// Server-side function used to sign an upload with a couple of
// example eager transformations included in the request.
const signuploadform = () => {
  const timestamp = Math.round((new Date).getTime()/1000);

  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
    folder: 'signed_upload_demo_form/membres'}, apiSecret);

  return { timestamp, signature }
}

// // Server-side function used to sign an Upload Widget upload.
// const signuploadwidget = () => {
//     const timestamp = Math.round((new Date).getTime()/1000);
  
//     const signature = cloudinary.utils.api_sign_request({
//       timestamp: timestamp,
//       source: 'uw',
//       folder: 'signed_upload_demo_uw'}, apiSecret);
    
//     return { timestamp, signature }
//   }

// using this API should require authentication
router.get('/signuploadform', function (req, res, next) {
  const sig = signuploadform()
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: cloudName,
    apikey: apiKey
  })
})

// // using this API should require authentication
// router.get('/widget', function (req, res, next) {
//     const sig = signuploadwidget()
//     res.json({
//       signature: sig.signature,
//       timestamp: sig.timestamp,
//       cloudname: cloudName,
//       apikey: apiKey
//     })
//   })

module.exports=router;
  
