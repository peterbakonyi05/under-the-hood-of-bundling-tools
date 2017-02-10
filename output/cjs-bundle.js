(function (modules, entryIds) {
	var cache = {};
	function require(id, dependencies) {
		if (!cache[id]) {
			cache[id] = {
				exports: {}
			};
			modules[id][0].call(
				cache[id].exports,
				function (dependency) {
					var dependencid = modules[id][1][dependency];
					return require(dependencid);
				},
				cache[id],
				cache[id].exports
			);
		}

		return cache[id].exports;
	}
	entryIds.forEach(require);
}({1: [function (require, module, exports) { // calculator.js
module.exports = {
	add: function (a, b) {
		return a + b;
	}
}; }, {}],2: [function (require, module, exports) { // index.js
const calculator = require("./calculator");
const result = calculator.add(1, 2);
console.log(result); }, {"./calculator":1}]}, [2]))