const { nextISSTimesForMyLocation }= require("./iss_promised");


nextISSTimesForMyLocation()
.then ((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work: " , error.message);
})

const printPassTimes = (passTimes) => {
  let timeFrame;
  let time = passTimes;
  for (let indv of time) { 
    timeFrame = Date(indv.risetime);
    console.log(`Next pass at ${timeFrame} for ${indv.duration} seconds!`);
  }
}