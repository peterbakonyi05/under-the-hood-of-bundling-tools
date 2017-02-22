(function (modules, entryIds) {
    var cache = {};
    function require(id) {
        if (!cache[id]) {
            cache[id] = {
                exports: {}
            };
            modules[id][0].call(
                cache[id].exports,
                function (dependency) {
                    var dependencyId = modules[id][1][dependency];
                    return require(dependencyId);
                },
                cache[id],
                cache[id].exports
            );
        }

        return cache[id].exports;
    }
    entryIds.forEach(require);
}({
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
}, [2]));