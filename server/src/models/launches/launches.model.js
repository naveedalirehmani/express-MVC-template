const launches = new Map()

let lastFlightNumber = 100;

const launch = {
    flightNumber:100,
    mission:'Kepler Exploration X',
    rocket:"Kepler IS1",
    launchDate:new Date('December 7, 2030'),
    target:'Kepler-442 b',
    customer:['NASA','ZTM'],
    upcoming:true,
    success:true
}

launches.set(launch.flightNumber,launch)

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunch(launch){
    const newFlightNumber = ++lastFlightNumber
    launches.set(newFlightNumber,
        {...launch,
            flightNumber:newFlightNumber,
            customer:['naveed\'s space explorations'],
            upcoming:true,
            success:true
        })
}   

function launchWithIdExists(id){
    return launches.has(id)
}

function abortMissionById(id){
    const abortedLaunch = launches.get(id);
    abortedLaunch.success = false;
    abortedLaunch.upcoming = false;  
    return abortedLaunch;
}

module.exports = {
    getAllLaunches,addNewLaunch,launchWithIdExists,abortMissionById
}