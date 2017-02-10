const fsp = require("fs-promise");

const { getModuleDependencies, convertForBrowser } = require("./util");

module.exports = function cjsBundle(entry, output) {
	return getModuleDependencies(entry)
		.then(convertForBrowser)
		.then(data => fsp.writeFile(output, data));
}

// example
cjsBundle("src/indexjs", "output/bundle.js");