const {parse} = require("csv-parse");
const path = require('path')
const fs = require("fs");

const result = [];

const isHabitable = (planet)=>{
    return planet['koi_disposition'] === 'CONFIRMED' && (planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11) && (planet['koi_prad'] < 1.6);
};

function getPlanetsData () {
    return new Promise((resolve,reject)=>{
        fs.createReadStream(path.join(__dirname,'..','..','data','keplerData.csv'))
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if(isHabitable(data)){
            result.push(data);
        }
      })
      .on("error", (error) => {
        console.log(error, "error");
        reject(error)
      })
      .on("end", () => {
        console.log(result.length + ' Habitable planets');
        console.log("streamEnded");
        resolve(result)
      });

    })
}

  module.exports = {
    result,
    getPlanetsData
  }