const bundle = require("../src").es2015Bundle;
const args = require("./args");

bundle(args.entry, args.output);