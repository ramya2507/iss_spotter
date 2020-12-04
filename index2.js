const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = function(passes) {
  for (let pass of passes) {
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    console.log(`Next pass at ${date} for ${pass['duration']} seconds!`);
  }
};

nextISSTimesForMyLocation()
.then(passes => printPassTimes(passes))
.catch((error) => {
  console.log("It didn't work: ", error.message);
});


