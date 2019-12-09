const Chromosome = require("./chromosome");
const rn = require("random-number");

class Hagrid {
    constructor(params) {
        this.params = params;
        this.population = new Array();

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
        for (let i = 0; i < this.params.populationsize; i++) {
            this.population.push(new Chromosome(this.nifflerParams));
        }
    }

    crossover() {
        //select two random parents and crossover the genes. Store the child in the population
        let parentOneIndex = rn({
            min: 0,
            max: this.params.populationsize - 1,
            integer: true
        });
        let parentTwoIndex = rn({
            min: 0,
            max: this.params.populationsize - 1,
            integer: true
        });

        let child = this.population[parentOneIndex].crossover(
            this.population[parentTwoIndex]
        );
        this.population.push(child);
    }

    mutation() {
        let parentOneIndex = rn({
            min: 0,
            max: this.params.populationsize,
            integer: true
        });

        let child = this.population[parentOneIndex].mutate();
        this.population.push(child);
    }

    evolve() {
        //TODO add a loop here
        for (let i = 0; i < this.params.populationsize; i++) {
            this.crossover();

            if (rn() < 0.05) {
                this.mutation();
            }
        }

        //regen population for next generation
        //sort by the highest fitness and select the top five
        let newPopulation = this.population.sort((a, b) =>
            a.fitness() < b.fitness() ? 1 : -1
        );

        this.population = newPopulation.slice(0, this.params.populationsize);
    }

    execute() {
        this.createPopulation();
        for (let i = 0; i < this.params.generations; i++) {
            this.evolve();
        }

        return this.population.sort((a, b) =>
            a.fitness() < b.fitness() ? 1 : -1
        )[0];
    }
}

module.exports = Hagrid;
