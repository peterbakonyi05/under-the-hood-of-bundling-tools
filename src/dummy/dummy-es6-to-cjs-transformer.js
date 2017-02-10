const acorn = require("acorn");
const estraverse = require("estraverse");
const escodegen = require("escodegen");

module.exports = function dummyEs6ToCjsTransformer(source) {
    const ast = acorn.parse(source, {
        ranges: true,
        locations: true,
        ecmaVersion: 2017,
        sourceType: "module"
    });

    estraverse.replace(ast, {
        enter: (node) => {
            // Replace it with replaced.
            if (node.type === 'ImportDeclaration') {
                const cjsReqire = `const ${node.specifiers[0].local.name} = require("${node.source.value}")`;
                return acorn.parse(cjsReqire);
            }
        }
    });

    return escodegen.generate(ast);
}