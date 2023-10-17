const cloudinary = require('cloudinary').v2;

// Configure your cloud name, API key and API secret:

const myconfig = cloudinary.config({
  cloud_name: 'dapkl1ien',
  api_key: '327969554979561',
  api_secret: 'w0rvj0T50Jf6HHAjx1B8_oo06es',
  secure: true
});

exports.myconfig = myconfig;