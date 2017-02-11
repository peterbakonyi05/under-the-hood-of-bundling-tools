(function (modules, entryIds) {
	var cache = {};
	function require(id, dependencies) {
		if (!cache[id]) {
			cache[id] = {
				exports: {}
			};
			modules[id].call(
				cache[id].exports,
				require,
				cache[id],
				cache[id].exports
			);
		}

		return cache[id].exports;
	}
	entryIds.forEach(require);
}({
	1: function (require, module, exports) { // calculator.js
		module.exports = {
			add: function (a, b) {
				return a + b;
			}
		};
	},
	2: function (require, module, exports) { // index.js
		const calculator = require(1);
		const result = calculator.add(1, 2);
		console.log(result);
	}
}, [2]))