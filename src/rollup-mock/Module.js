import Nodes from "../ast/nodes/index";

class Module {
    constructor({ id, sourceCode, bundle, resolvedIds }) {
        this.id = id;
        this.bundle = bundle;
        this.resolvedIds = resolvedIds;
        this.sourceCode = sourceCode;
        this.scope = new ModuleScope(this);
        this.dependencies = []; // all dependencies
        this.imports = {};
        this.exports = {};
        this.declarations = {};

        this.ast = acorn.parse(sourceCode, acornOptions);
        this.enhance();
    }

    bindImportSpecifiers() {
        // for index.js
        const calculatorModuleId = this.resolvedIds[this.imports.calculator.source];
        this.imports.calculator.module = this.bundle.modules.get(calculatorModuleId);
    }

    bindReferences() {
        for (const node of this.ast.body) {
            node.bind(this.scope);
        }
    }

    run() {
        for (const node of this.ast.body) {
            if (node.hasEffects(this.scope)) {
                node.run(this.scope);
            }
        }
    }

    render() {
        // pseudo, very basic
        let source = "";
        this.ast.eachNode(node => source += node.render());
        return source;
    }

    // private from here
    enhance() {
        // convert raw AST nodes to Node instances defined in ./ast/Nodes
        this.ast.eachNode(node => node.__proto__ = nodes[node.type].prototype); // pseudo code!

        // add imports and exports
        for (const node of this.ast.body) {
            if (node.isImportDeclaration) {
                this.addImport(node);
            } else if (node.isExportDeclaration) {
                this.addExport(node);
            }
        }
    }


    private addExports(node) {
        // for calculator.js
        this.exports.add = {
            localName: "add"
        };

    }

    private addImports(node) {
        // for index.js
        this.imports.calculator = {
            module: null, // we don't know yet where this is coming from (first we need to create all the modules)
            source: "./calculator",
            name: "*",
            specifier: node.specifiers // ImportNameSpecifier enhanced Node
        };
    }
}
