(function bundle(allModules, installedModules, entryModules) {
	function s(o, u) {
		if (!installedModules[o]) {
			if (!allModules[o]) {
				var a = typeof require == "function" && require;
				if (!u && a) {
					return a(o, !0);
				}
				if (i) {
					return i(o, !0);
				}
				var f = new Error("Cannot find module '" + o + "'");
				throw f.code = "MODULE_NOT_FOUND", f
			}
			var l = installedModules[o] = {
				exports: {}
			};
			allModules[o][0].call(l.exports, function (e) {
				var n = allModules[o][1][e];
				return s(n ? n : e)
			}, l, l.exports, bundle, allModules, installedModules, entryModules)
		}
		return installedModules[o].exports;
	}

	var i = typeof require == "function" && require;
	for (var o = 0; o < entryModules.length; o++) {
		s(entryModules[o]);
	}
	return s;
})({
	1: [function (require, module, exports) {
		module.exports = {
			add: function (a, b) {
				return a + b;
			}
		};
	}, {}],
	2: [function (require, module, exports) {
		var calculator = require("./calculator");
		console.log(calculator.add(1, 2));
	}, { "./calculator": 1 }]
}, {}, [2]);
