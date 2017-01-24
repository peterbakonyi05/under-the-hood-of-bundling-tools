const _ = require("lodash");
const path = require('path');
const fsp = require("fs-promise");
const mdeps = require('module-deps');
const concat = require("concat-stream");

/**
 * @example
 * [
 *  {
 *      "id":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\calculator.js",
 *      "file":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\calculator.js",
 *      "source":"module.exports = {\r\n\tadd: function (a, b) {\r\n\t\treturn a + b;\r\n\t}\r\n};",
 *      "deps":{}
 *  },
 *  {
 *      "id":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\index.js",
 *      "file":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\index.js",
 *      "source":"const calculator = require(\"./calculator\");\n\nconsole.log(calculator.add(1, 2));",
 *      "deps":{"./calculator":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\calculator.js"},
 *      "entry":true
 *  }
 * ]
 */
function parseModules(entry) {
    return new Promise(resolve => {
        const md = mdeps();
        md.pipe(concat(resolve))
        md.end({ file: entry });
    });
}

function addBoilerPlate(parsedModules) {
    const entryIds = [];
    let modules = "{";
    _.forEach(parsedModules, m => {
        if (m.entry) {
            entryIds.push(m.id);
        }
        modules += `${JSON.stringify(m.id)}: [function (require, module, exports) { ${m.source} }, ${JSON.stringify(m.deps)}],`;
    });
    modules = modules.slice(0, -1) + "}";

    return `(function (allModules, entryIds) {
	var installedModules = {};
	function require(moduleId, dependencies) {
		if (!installedModules[moduleId]) {
			installedModules[moduleId] = {
				exports: {}
			};
			allModules[moduleId][0].call(
				installedModules[moduleId].exports,
				function (dependency) {
					var dependencModuleId = allModules[moduleId][1][dependency];
					return require(dependencModuleId);
				},
				installedModules[moduleId],
				installedModules[moduleId].exports
			);
		}

		return installedModules[moduleId].exports;
	}
	entryIds.forEach(function(entryId) { require(entryId); });
}(${modules}, ${JSON.stringify(entryIds)}))`;
}

function bundle(entry, output) {
    return parseModules(entry)
        .then(addBoilerPlate)
        .then(data => fsp.writeFile(output, data));
}

bundle(path.join(__dirname, '../example/calculator-cjs/index.js'), path.join(__dirname, '../output/cjs-custom/bundle.js'));