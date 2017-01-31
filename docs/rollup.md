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

## Flow
* `src/rollup`
    * `rollup()`
        * 