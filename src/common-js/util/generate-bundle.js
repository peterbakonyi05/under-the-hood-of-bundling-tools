const _ = require("lodash");

module.exports = function generateBundle(parsedModules) {
    const entryIds = [];
    let modules = "{";
    _.forEach(parsedModules, m => {
        if (m.entry) {
            entryIds.push(m.id);
        }
        modules += `${JSON.stringify(m.id)}: [function (require, module, exports) { ${m.source} }, ${JSON.stringify(m.deps)}],`;
    });
    modules = modules.replace(/.$/, "}");

    return `(function (modules, entryIds) {
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
}(${modules}, ${JSON.stringify(entryIds)}));`;
}