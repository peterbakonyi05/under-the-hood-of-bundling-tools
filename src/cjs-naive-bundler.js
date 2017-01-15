const fs = require("fs");
const path = require("path");

const utils = require("./util/index");

function bundle(entry, output) {
    // todo
    const content = fs.readFileSync(path.resolve(entry), "utf-8");
    let dependencies = [

        
    ];

    // normalize locally to entry folder...

    // do recursively

    // add a mapper

    dependencies = dependencies.concat(utils.getRequireDependencies(content));
}

bundle("../example/calculator-cjs/index.js");

module.exports = bundle;