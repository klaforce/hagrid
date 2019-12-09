class Hagrid {
    constructor(params) {
        this.params = params;
    }

    execute() {
        return { test: "blah", params: this.params };
    }
}
module.exports = Hagrid;
