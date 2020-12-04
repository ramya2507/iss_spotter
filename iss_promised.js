const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json'); 
};
const fetchCoordinatesByIp = function(body) {
  const ip = JSON.parse(body).ip;
  return request('https://geo.ipify.org/api/v1?apiKey=at_YpQoyWqu6yxxwPx2awK9hk7DS64s0&ipAddress=' + ip);
};
const fetchISSFlyOverTimes = function(body) {
   const coords = {
    lat:JSON.parse(body)['location']['lat'],
    lng:JSON.parse(body)['location']['lng']
  }
  
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lng}`)
}
const nextISSTimesForMyLocation = function(){
  return fetchMyIP()
  .then(fetchCoordinatesByIp)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    const { response } = JSON.parse(data);
    return response;
  })
};


module.exports = { nextISSTimesForMyLocation };