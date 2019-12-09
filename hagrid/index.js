const Chromosome = require("./chromosome");

class Hagrid {
    constructor(params) {
        this.params = params;
        this.population = new Map();

        //this is a set of parameters to send to niffler
        //each item has a min and max value that the population
        //will stay within. This only happens during chromosome creation
        //after that the evolutionary algorithm may go out of these ranges
        this.nifflerParams = {
            halitemax: { min: 1000, max: 5000, integer: true },
            maxships: { min: 1, max: 10, integer: true },
            capacity: { min: 100, max: 1000, integer: true },
            recreate: { min: 20, max: 200, integer: true },
            fitnessformaxships: { min: 1000, max: 10000, integer: true },
            fitnessfordistancetodropoff: { min: 1, max: 10, integer: true },
            halitecellmodifier: { min: 5, max: 50, integer: true },
            modifierturnsships: { min: 2, max: 10, integer: true }
        };
    }

    createPopulation() {
        //create initial population by randomly manipulating the niffler variables
        for (let i = 0; i < this.params.initialpopulation; i++) {
            this.population.set(i, new Chromosome(this.nifflerParams));
        }
    }

    execute() {
        this.createPopulation();
        for (let i = 0; i < this.params.generations; i++) {
            this.evolve();
        }

        return this.population;
    }
}

module.exports = Hagrid;
