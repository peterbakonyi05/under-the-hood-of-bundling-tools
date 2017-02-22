# Rollup

Much-much cleaner implementation than webpack. It os easier to understand how it works.

## Base classes

```js
function rollup(options) {
    const bundle = new Bundle(options);
    return bundle.build().then(() => {
        return {
            imports,
            exports,
            modules,
            generate,
            write
        };
    });
}

class Bundle {
    build() {
        // Phase 1 – discovery. We load the entry module and find which
		// modules it imports, and import those, until we have all
		// of the entry module's dependencies

        // Phase 2 – binding. We link references to their declarations
		// to generate a complete picture of the bundle

        // Phase 3 – marking. We 'run' each statement to see which ones
		// need to be included in the generated bundle

        // Phase 4 – final preparation. We order the modules with an
		// enhanced topological sort that accounts for cycles, then
		// ensure that names are deconflicted throughout the bundle


    }
}
```

## Entities

### Node base class
* bind scope
* run `callback`on each child
* find parent, find scope
* render (todo: see who is overriding it)
    * e.g: for `ImportDeclaration` this will be remove
* run: abstract (todo: check what this does for some subclasses)
* hasEffects (todo: what does this do?)
* gatherPossibleValues (todo: what does this do?)

What kind of Nodes do we have?
* `ExportNamedDeclaration`
* `FunctionDeclaration`
* `ReturnStatement` => Same as `Node`
* `BinaryExpression`

* `ImportDeclaration`
* `ExpressionStatement` => `CallExpression` => `MemberExpression` inside a `CallExpression`, inside it two `Literal`s

### Scopes
Base Scope

todo: make sure here that it converst ModuleScope ==> BundleScope, and see where it happens

* BundleScope
    * todo: `SyntheticGlobalDeclaration`
* ModuleScope
    * 

## Flow
* `src/rollup`: very high level, easy
* Bundle
* Module
    * todo: understand `addExports` and `addImports`
* Declaration
* ExternalDeclaration