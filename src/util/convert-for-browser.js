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
	var installedModules = {};
	function require(moduleId, dependencies) {
		if (!installedModules[moduleId]) {
			installedModules[moduleId] = {
				exports: {}
			};
			allModules[moduleId][0].call(
				installedModules[moduleId].exports,
				function (dependency) {
					var dependencModuleId = allModules[moduleId][1][dependency];
					return require(dependencModuleId);
				},
				installedModules[moduleId],
				installedModules[moduleId].exports
			);
		}

		return installedModules[moduleId].exports;
	}
	entryIds.forEach(function(entryId) { require(entryId); });
}(${modules}, ${JSON.stringify(entryIds)}))`;
}