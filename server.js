const express = require('express')
const dbConnection = require('./DB/mongoose')
require("dotenv").config();


const PORT = process.env.configPort ;


const app = express()

app.use(express.json());



app.get('/api/test',(req, res) => {
    res.send("created successfully")
})

app.use(require('./routes/userRoute'));
// article
app.use(require('./routes/articleRoute'));

app.listen(PORT ,()=> {
    console.log(`server is started at port localhost:${PORT}`)
})

