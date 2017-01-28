# Webpack

## TODOs
* finish Flow
* check where runs the tree shaking (optimize tree)

## Basic concepts
* loader
* plugin
* compiler
* parser

## Base classes
```js
class Module` {
	// represents a module
}

class NormalModule extends Module {
	build() {
		// this is how a module gets created from the source!!!
		this.parser.parse(this._source.source(), {
			current: this,
			module: this,
			compilation: compilation,
			options: options
		});
	}
}

class ContextModule extends Module {
	// todo: what is this
}

class RuleSet {
	// todo: what is it
}

class Parser {
	parse(source, initialState) {
		const ast = acorn.parse(source, {
			ranges: true,
			locations: true,
			ecmaVersion: 2017,
			sourceType: "module",
			plugins: {
				dynamicImport: true
			},
			onComment: comments
		});
		this.state = initialState;
		this.applyPlugins(ast);
		this.walkStatements(); // parses imports and exports
		return this.state;
	}
}
```

## Flow
* `bin` folder gets `webpack` factory function from `../lib/webpack` and passes the options
* `webpack(options, callback?: Function): Compiler`
	* this wires up the entire logic (compiler, plugins, options schema validation)
	* if `callback` is passed it will call `comiler.run()` or `compiler.watch()` depending on the watch settings
	* also exports all the available plugins
* `Compiler`
	* public
		* `run()`: controls the steps related to compilation
			* apply plugins (before run, after run)
			* do actual compilation: `compile(): Compilation`
			* write files (and stats) on the file system
		* `watch()`: compile when files changing
* `NormalModuleFactory`
	* probably handles normal dependencies (what is that?)
	* todo: what does it do???
	* used by the compiler
	* creates `NormalModule`s
* `ContextModuleFactory`
	* probably handles context dependencies (what is that?)
	* todo: what does it do???
* `Compilation`: represents a given compilation, core logic of compilation, handles dependencies...
	* `Compiler` creates it, and passes `NormalModuleFactory` and `ContextModuleFactory`
	* `addModule()`
	* `getModule()`
	* `buildModule()`
	* `processModuleDependencies()`
	* `addModuleDependencies()`
	* `getStats()`
* `Parser`
	* user only by `NormalModuleFactory`

