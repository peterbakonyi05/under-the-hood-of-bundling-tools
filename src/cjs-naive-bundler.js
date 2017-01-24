const path = require('path');
const fs = require("fs");
var mdeps = require('module-deps');
var JSONStream = require('JSONStream');
const through = require('through');
const concat = require("concat-stream");

/**
 * Get the entry file and 
 * 
 * @returns Promise<[{id: string, source: string, deps: {}, file: string, [entry]: boolean }]>
 * 
 * @example
 * [
 *  {
 *      "id":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\calculator.js",
 *      "source":"module.exports = {\r\n\tadd: function (a, b) {\r\n\t\treturn a + b;\r\n\t}\r\n};",
 *      "deps":{}
 *      "file":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\calculator.js"
 *  },
 *  {
 *      "file":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\index.js",
 *      "id":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\index.js",
 *      "source":"const calculator = require(\"./calculator\");\n\nconsole.log(calculator.add(1, 2));",
 *      "deps":{"./calculator":"c:\\Github\\demystify-bundling\\example\\calculator-cjs\\calculator.js"},
 *      "entry":true
 *  }
 * ]
 */
function getModuleDependencies(entry) {
    return new Promise(resolve => {
        const md = mdeps();
        md.pipe(concat(resolve))
        md.end({ file: entry });
    });
}

function bundle(entry) {
    getModuleDependencies(entry)
        .then(dependencies => {
            console.log(dependencies);
        })
}

bundle(path.join(__dirname, '../example/calculator-cjs/index.js'));

// todo: transform files...
// .pipe(fs.createWriteStream("bundle.js"));
