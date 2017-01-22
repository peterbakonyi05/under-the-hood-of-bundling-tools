const path = require('path');
const fs = require("fs");
var mdeps = require('module-deps');
var JSONStream = require('JSONStream');
const t = require('through2');

var md = mdeps();
md
    .pipe(JSONStream.stringify())
    // todo: transform files...
    .pipe(fs.createWriteStream("bundle.js"));

md.end({ file: path.join(__dirname, '../example/calculator-cjs/index.js')});