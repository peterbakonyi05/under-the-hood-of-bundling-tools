const fsp = require("fs-promise");

const { getModuleDependencies, generateBundle } = require("./util");

module.exports = function cjsBundle(entry, output) {
    return getModuleDependencies(entry)
        .then(generateBundle)
        .then(data => fsp.writeFile(output, data));
}