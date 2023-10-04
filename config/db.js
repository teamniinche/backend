const mongoose=require('mongoose');

mongoose
    .connect('mongodb+srv://'+process.env.KEY_PSEUDO_PASS+'@cluster0.mecdq3p.mongodb.net/teamniintcheDB',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    )
    .then(()=>console.log('Connected to mongoDB'))