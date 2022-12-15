const http = require('http');
const app = require('./app.js')

const PORT = process.env.PORT || 8000;

const {getPlanetsData} = require('./models/planets/planets.model.js')

const server = http.createServer(app)

async function populatePlanetsData (){
    await getPlanetsData()
    console.log('\x1b[35m','Planets Data Populated')
    server.listen(PORT,()=>{
        console.log('server is listning on ', PORT)
    })
}

populatePlanetsData();