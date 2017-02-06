const _ = require("lodash");
const concat = require("concat-stream");
const mdeps = require('module-deps');

/**
 * @example
 * [
 *  {
 *      "id": 1,
 *      "file":"c:\\src\\calculator-cjs\\calculator.js",
 *      "source":"module.exports = {\r\n\tadd: function (a, b) {\r\n\t\treturn a + b;\r\n\t}\r\n};",
 *      "deps":{}
 *  },
 *  {
 *      "id": 2,
 *      "file":"c:\\src\\calculator-cjs\\index.js",
 *      "source":"const calculator = require(\"./calculator\");\n\nconsole.log(calculator.add(1, 2));",
 *      "deps":{"./calculator": 1},
 *      "entry":true
 *  }
 * ]
 */
module.exports = function getModuleDependencies(entry) {
    return new Promise(resolve => {
        const md = mdeps();
        md.pipe(concat(resolve))
        md.end({file: entry});
    })
        .then(convertIdsToNumbers);
}

function convertIdsToNumbers(parsedModules) {
    let currentId = 1;
    const ids = {};
    const getConvertedId = stringId => {
        if (ids[stringId]) {
            return ids[stringId];
        }
        ids[stringId] = currentId++;
        return ids[stringId];
    }

    _.forEach(parsedModules, currentModule => {
        currentModule.id = getConvertedId(currentModule.id);
        _.forEach(currentModule.deps, (id, localDep) => {
            currentModule.deps[localDep] = getConvertedId(id);
        });
    });

    return parsedModules;
}