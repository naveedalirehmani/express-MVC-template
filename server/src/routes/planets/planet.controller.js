const planetsModel = require("../../models/planets/planets.model.js")

async function httpGetNewAllPlanets (request,response){
    const planets = await planetsModel.getPlanetsData()
    response.status(200).send(planets)
}

function httpGetAllPlanets (request,response){
    response.status(200).send(planetsModel.result)
}

module.exports = {
    httpGetAllPlanets,httpGetNewAllPlanets
}