const Hagrid = require("./hagrid");
const args = require("yargs").argv;
const hagrid = new Hagrid(args);
const results = hagrid.execute();
console.log(
    `The selected candidate has a fitness of ${
        results.fitnessValue
    }. The command to run is ${results.getCommand()}`
);
