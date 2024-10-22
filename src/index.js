const express = require('express')
const {ServerConfig}= require('./config')

const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen(ServerConfig.PORT , async () => {
    console.log(`Server started succesfully on PORT : ${ServerConfig.PORT}`)
})