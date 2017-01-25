(function (allModules, entryIds) {
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
	entryIds.forEach(function (entryId) { require(entryId); });
} ({
	1: [function (require, module, exports) {
	module.exports = {
		add: function (a, b) {
			return a + b;
		}
	};
	}, {}],
	2: [function (require, module, exports) {
		const calculator = require("./calculator");

		console.log(calculator.add(1, 2));
	}, { "./calculator": 1 }]
}, [2]))