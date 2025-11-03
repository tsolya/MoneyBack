var cors = require('cors')
require('dotenv').config

const express = require("express")
const logger = require ("./utils/logger")
const tables = require("./modules/tables")


const app = express()


//Middlewareek
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', tables)


  
app.listen(process.env.PORT, ()=> {
    logger.info(`Server listening on port: ${process.env.PORT}`)
})