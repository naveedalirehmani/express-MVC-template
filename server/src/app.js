const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetRouter = require('./routes/planets/planets.router.js')
const launchesRouter = require('./routes/launches/launches.router.js')

const app = express()

app.use(cors({
    origin:'http://localhost:3000'
}))

app.use(morgan('combined'))

app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')))

app.use('/planets',planetRouter)
app.use('/launches',launchesRouter)

// the app was also working without, did this to just be sure.
app.get('/*',(request,response)=>{
    response.sendFile(path.join(__dirname,'..','public','index.html'))
})

// console.log(require.cache)

module.exports = app