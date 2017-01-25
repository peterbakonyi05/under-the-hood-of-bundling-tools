const bundle = require("../src").cjsBundle;
const args = require("./args");

bundle(args.entry, args.output);