const request = require('request');

//Function to fetch IPv4 address
const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url,(error, response, body) => {
    if (error) {
      callback(error,null);
    } else if (response.statusCode !== 200) {
      const msg = `StatusCode ${response.statusCode} while fetching IP.Response: ${body}`;
      callback(Error(msg),null);
    } else {
      let data = JSON.parse(body);
      callback(error,data.ip);
    }
  });
};

//Function to fetch coordinates based on IPv4 address
const fetchCoordinatesByIp = function(ip,callback) {
  const url = "https://geo.ipify.org/api/v1?apiKey=at_YpQoyWqu6yxxwPx2awK9hk7DS64s0&ipAddress=" + ip;
  request(url,(error, response, body) => {
    if (error) {
      callback(error,null);
    } else if (response.statusCode !== 200) {
      const msg = `StatusCode ${response.statusCode} when fetching coordinates for IP.Response: ${body}`;
      callback(Error(msg), null);
    } else {
      let data = JSON.parse(body);
      let result = {
        latitude: data['location']['lat'],
        longitude: data['location']['lng']
      };
      callback(error, result);
    }
  });
};

//Function to get to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url,(error, response, body) => {
    if (error) {
      callback(error,null);
    } else if (response.statusCode !== 200) {
      const msg = `StatusCode ${response.statusCode} when fetching ISS pass time for the coordinates.Response: ${body}`;
      callback(Error(msg), null);
    } else {
      callback(error, JSON.parse(body)['response']);
    }
  });
};

// Orchestrates multiple API requests in order to determine the next 5 upcoming ISS passes
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error,null);
    }
    fetchCoordinatesByIp(ip,(error, coord) => {
      if (error) {
        return callback(error,null);
      }
      fetchISSFlyOverTimes(coord,(error,response) => {
        if (error) {
          return callback(error,null);
        }
        return callback(error,response);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };

