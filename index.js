const { fetchMyIP, fetchCoordsByIP, fetchFlyoverTime } = require('./iss');

const nextISSTimesForMyLocation = (callback) => {

  fetchMyIP((error, ip) => {
    if (error) {
      callback(error);
      return;
    }
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        callback(error);
        return;
      }
      fetchFlyoverTime(coordinates, (error,time) => {
        if (error) {
          callback(error);
          return;
        }
        let timeFrame;
        for (let indv of time) { 
          timeFrame = Date(indv.risetime);
          console.log(`Next pass at ${timeFrame} for ${indv.duration} seconds!`);
        }
        

      })
  
    });
  
  });

};

nextISSTimesForMyLocation ( (error) => {
  console.log("It didn't work!", error);
});






