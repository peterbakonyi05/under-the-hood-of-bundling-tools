const _ = require("lodash");

module.exports = function convertForBrowser(parsedModules) {
	const entryIds = [];
	let modules = "{";
	_.forEach(parsedModules, m => {
		if (m.entry) {
			entryIds.push(m.id);
		}
		modules += `${JSON.stringify(m.id)}: [function (require, module, exports) { ${m.source} }, ${JSON.stringify(m.deps)}],`;
	});
	modules = modules.replace(/.$/, "}");

	return `(function (allModules, entryIds) {
	var cache = {};
	function require(id, dependencies) {
		if (!cache[id]) {
			cache[id] = {
				exports: {}
			};
			allModules[id][0].call(
				cache[id].exports,
				function (dependency) {
					var dependencid = allModules[id][1][dependency];
					return require(dependencid);
				},
				cache[id],
				cache[id].exports
			);
		}

		return cache[id].exports;
	}
	entryIds.forEach(function(entryId) { require(entryId); });
}(${modules}, ${JSON.stringify(entryIds)}))`;
}