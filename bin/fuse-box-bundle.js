const path = require("path");
const FuseBox = require("fuse-box").FuseBox;

const fuseBox = FuseBox.init({ 
  homeDir : path.resolve("../example/calculator-cjs"),
  outFile : path.resolve("../output/fuse-box-commonjs-bundle.js")
})

fuseBox.bundle(">index.js");