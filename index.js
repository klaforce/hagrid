const Hagrid = require("./hagrid");
const args = require("yargs").argv;
const hagrid = new Hagrid(args);
const results = hagrid.execute();
console.log(`Results are ${JSON.stringify(results)}`);
