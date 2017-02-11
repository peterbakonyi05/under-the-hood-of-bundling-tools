const acorn = require("acorn"); // JS parser
const estraverse = require("estraverse"); // AST traversal functions
const escodegen = require("escodegen"); // code generator

module.exports = function dummyEs6ToCjsTransformer(source) {
    const ast = acorn.parse(source, {
        ranges: true,
        locations: true,
        ecmaVersion: 2017,
        sourceType: "module"
    });

    estraverse.replace(ast, {
        enter: (n) => {
            if (n.type === 'ImportDeclaration') {
                return acorn.parse(
                    `const ${n.specifiers[0].local.name} = require("${n.source.value}")`
                );
            }
        }
    });

    return escodegen.generate(ast);
};