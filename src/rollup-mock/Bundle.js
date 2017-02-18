export class Bundle {
    constructor(options) {
        this.options = options;
        this.modules = new Map();
        this.scope = new BundleScope();
    }

    build() {
        return this.fetchModuleWithDependencies(this.options.entry)
            .then(entryModule => {
                this.entryModule = entryModule;

                // link references to their declarations
                // to generate a complete picture of the bundle
                this.modules.forEach(module => module.bindImportSpecifiers());
                this.modules.forEach(module => module.bindReferences());

                // marking. We 'run' each statement to see which ones
                // need to be included in the generated bundle (tree shaking)
                this.modules.forEach(module => {
                    module.run();
                });

                // finalise, deshadow
                this.deconflict();
            })
    }

    render() {
        // pseudo/simplified, but more or less this happens here
        let source = "";
        this.modules.forEach(module => source += module.render());
        // based on this.options.format it will be converted to the given format (in the example: iife)
        return source;
    }


    // private methods
    fetchModuleWithDependencies() {
        const indexModule = new Module({
            id: "src/index.js",
            sourceCode: "import ...",
            bundle: this,
            resolvedIds: { "./calculator": "src/calculator.js" }
        });
        const calculatorModule = new Module({
            id: "src/calculator.js",
            sourceCode: "export function add...",
            bundle: this,
            resolvedIds: {}
        });
        this.modules.set(indexModule.id, indexModule);
        this.modules.set(calculatorModule.id, calculatorModule);
        return Promise.resolve(indexModule);
    }

    deconflict() {
        // e.g: deshadow if there is name collision in the BundleScope
    }
}