# Webpack

# Flow
* `bin` folder gets `webpack` factory function from `../lib/webpack` and passes the options
* `webpack(options, callback?: Function): Compiler`
	* this wires up the entire logic (compiler, plugins, options schema validation)
	* if `callback` is passed it will call `comiler.run()` or `compiler.watch()` depending on the watch settings
	* also exports all the available plugins
* `Compiler`
	* `apply()`
	* `run()`
	* `watch()`
	* `purgeInputFileSystem()`
* `Parser`
	* todo
