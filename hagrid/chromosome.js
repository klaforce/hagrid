const Sequence = require("./sequence");
const rn = require("random-number");
const sh = require("child_process").execFileSync;

class Chromosome {
    constructor(nifflerParams) {
        this.nifflerParams = nifflerParams;
        this.chromosome = new Array();
        this.fitnessValue = -1000;

        //there are 8 parameters currently used to manipulate niffler
        //a hagrid Chromosome is a sequence of those variables in binary form
        if (this.nifflerParams) {
            this.chromosome.push(new Sequence(nifflerParams.halitemax));
            this.chromosome.push(new Sequence(nifflerParams.maxships));
            this.chromosome.push(new Sequence(nifflerParams.capacity));
            this.chromosome.push(new Sequence(nifflerParams.recreate));
            this.chromosome.push(
                new Sequence(nifflerParams.fitnessformaxships)
            );
            this.chromosome.push(
                new Sequence(nifflerParams.fitnessfordistancetodropoff)
            );
            this.chromosome.push(
                new Sequence(nifflerParams.halitecellmodifier)
            );
            this.chromosome.push(
                new Sequence(nifflerParams.modifierturnsships)
            );
        }
    }

    fitness() {
        //lazy load fitness
        if (this.fitnessValue > -1000) return this.fitnessValue;

        //run the niffler appliction to get fitness of this chromosome
        let result = sh("../niffler/halite.exe", [
            "--no-replay",
            "--no-logs",
            "-vvv",
            "--results-as-json",
            "--width 32",
            "--height 32",
            this.getCommand()
        ]);

        let jsonResults = JSON.parse(result);
        this.fitnessValue = jsonResults.stats[0].score;
        return this.fitnessValue;
    }

    getCommand() {
        return `node ../niffler/NifflerBot.js --halitemax=${this.chromosome[0].convert()} --maxships=${this.chromosome[1].convert()} --capacity=${this.chromosome[2].convert()} --recreate=${this.chromosome[3].convert()} --fitnessformaxships=${this.chromosome[4].convert()} --fitnessfordistancetodropoff=${this.chromosome[5].convert()} --halitecellmodifier=${this.chromosome[6].convert()} --modifierturnsships=${this.chromosome[7].convert()}`;
    }

    crossover(mate) {
        //we'll be using a single point cross over so select a random point and swap the genes
        //going to try at the sequence level rather than the gene level first
        let crossoverPoint = rn({
            min: 2,
            max: this.chromosome.length - 2,
            integer: true
        });

        let progeny = new Chromosome();

        for (let i = 0; i < crossoverPoint; i++) {
            progeny.chromosome.push(this.chromosome[i]);
        }
        for (let i = crossoverPoint; i < mate.chromosome.length; i++) {
            progeny.chromosome.push(mate.chromosome[i]);
        }

        return progeny;
    }

    mutate() {
        //since we are doing it at the sequence level we can hack mutation
        //by dong a single point crossover with itself
        return this.crossover(this);
    }
}

module.exports = Chromosome;
