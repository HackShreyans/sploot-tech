const mongoose = require('mongoose');

const dbConnection = mongoose.connect('mongodb+srv://admin:admin@cluster0.jpll8.mongodb.net/sploot',{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("database connected")
}).catch(()=>{
    console.log("error to connecting database");
})

exports = dbConnection;