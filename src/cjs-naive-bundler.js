const fsp = require("fs-promise");

const args = require("./args");
const { getModuleDependencies, convertForBrowser } = require("./util");

function bundle(entry, output) {
	return getModuleDependencies(entry)
		.then(convertForBrowser)
		.then(data => fsp.writeFile(output, data));
}

bundle(args.entry, args.output);