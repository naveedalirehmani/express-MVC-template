const launchesModel = require('../../models/launches/launches.model')

function httpGetAllLaunches (request,response){
    return response.status(200).json(launchesModel.getAllLaunches())
}

function httpAddNewLaunch (request,response){
    const launch = request.body;
    
    if(!launch.launchDate || !launch.mission || !launch.rocket || !launch.target){
        return response.status(400).json({error:"missing launch field"})
    }
    
    launch.launchDate = new Date(launch.launchDate);
    
    if(launch.launchDate.toString() === 'Invalid Date'){
        return response.status(400).json({
            error:"invalid date format"
        })
    }

    launchesModel.addNewLaunch(launch)
    
    return response.status(201).json(launch)

}

function httpAbortLaunch (request,response) {
    const id = +request.params.id

    if(!launchesModel.launchWithIdExists(id)){
        return response.status(404).json({error:'launch with id does not exits'})
    }

    const abortedLaunch = launchesModel.abortMissionById(id)
    return response.status(200).json(abortedLaunch)
    
}

module.exports = {
    httpGetAllLaunches,httpAddNewLaunch,httpAbortLaunch
}