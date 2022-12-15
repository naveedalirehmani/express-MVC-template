const {Router} = require('express')
const planetsController = require('./planet.controller.js')

const planetRouter = Router()

// THIS WILL GET PRE POPULATED PLANETS DATA THAT WAS CREATED ON SERVER START
planetRouter.get('/',planetsController.httpGetAllPlanets)
//THIS WILL LOOK FOR ANY NEW PLANETS AND RETURN LATEST DATA
planetRouter.get('/new',planetsController.httpGetNewAllPlanets)

module.exports = planetRouter