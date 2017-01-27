const path = require("path");
const yargs = require("yargs");

const argv = yargs
	.alias("e", "entry")
	.alias("o", "output")
	.argv

module.exports = {
	entry: path.join(__dirname, "../", argv.entry),
	output: path.join(__dirname, "../", argv.output)
};