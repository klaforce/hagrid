const rn = require("random-number");

class Sequence {
    constructor(param) {
        //each sequence is comprised of 14 binary digits. 10,000 is currently the
        //largest value supported which is 10011100010000 in binary
        this.value = new Array();

        //generate a random value for this paramater for the sequence and store
        const randomValue = rn(param);
        const binaryRep = randomValue.toString(2);

        //store 0's for the upfront numbers as needed
        for (let i = 0; i < 14 - binaryRep.length; i++) {
            this.value.push(0);
        }

        //now store the value in binary of the random number
        for (let i = 0; i < binaryRep.length; i++) {
            this.value.push(parseInt(binaryRep[i]));
        }
    }
}

module.exports = Sequence;
