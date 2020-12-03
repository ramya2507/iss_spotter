const { nextISSTimesForMyLocation } = require('./iss');

//Callback function
const printPassTimes = function(passes) {
  for (let pass of passes) {
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${date} for ${pass['duration']} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passes);
});