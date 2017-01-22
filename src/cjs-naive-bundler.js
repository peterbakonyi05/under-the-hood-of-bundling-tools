const path = require('path');
const fs = require("fs");
var mdeps = require('module-deps');
var JSONStream = require('JSONStream');
const t = require('through2');

var md = mdeps();

function bundle(entry, output) {
    md
        .pipe(JSONStream.stringify())
        // todo: transform files...
        .pipe(fs.createWriteStream(output));

    md.end({ file: entry });
}

bundle(path.join(__dirname, '../example/calculator-cjs/index.js'), "bundle.js");