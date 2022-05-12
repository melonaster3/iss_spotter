const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error,response,body) => {
    const ip = JSON.parse(body).ip;
    if (error) {
      callback(error,null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Reponse: ${body}`;
      callback(Error(msg),null);
      return;
    }
    callback(null,ip)
  });
};

const fetchCoordsByIP = (ip, callback) => {

    request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      } else if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
        return;
      }
  
      const { latitude, longitude } = JSON.parse(body);
  
      callback(null, { latitude, longitude });
    });
  };

const fetchFlyoverTime = (coordinates, callback) => {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
      const passes = JSON.parse(body).response;
      callback(null,passes);
  })

}


module.exports = { fetchMyIP, fetchCoordsByIP, fetchFlyoverTime };

