const Sequence = require("./sequence");

class Chromosome {
    constructor(nifflerParams) {
        this.nifflerParams = nifflerParams;
        this.chromosome = new Array();

        //there are 8 parameters currently used to manipulate niffler
        //a hagrid Chromosome is a sequence of those variables in binary form
        this.chromosome.push(new Sequence(nifflerParams.halitemax));
        this.chromosome.push(new Sequence(nifflerParams.maxships));
        this.chromosome.push(new Sequence(nifflerParams.capacity));
        this.chromosome.push(new Sequence(nifflerParams.recreate));
        this.chromosome.push(new Sequence(nifflerParams.fitnessformaxships));
        this.chromosome.push(
            new Sequence(nifflerParams.fitnessfordistancetodropoff)
        );
        this.chromosome.push(new Sequence(nifflerParams.halitecellmodifier));
        this.chromosome.push(new Sequence(nifflerParams.modifierturnsships));
    }

    fitness() {
        return 0;
    }
}

module.exports = Chromosome;
