const path = require("path");
const bundle = require("../src").cjsBundle;

bundle(path.resolve("example/calculator-cjs/index.js", path.resolve("output/cjs-bundle.js"));
