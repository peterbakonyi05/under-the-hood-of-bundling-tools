# Webpack

## Flow
* `bin` folder gets `webpack` factory function from `../lib/webpack` and passes the options
* `webpack(options, callback?: Function): Compiler`
	* this wires up the entire logic (compiler, plugins, options schema validation)
	* if `callback` is passed it will call `comiler.run()` or `compiler.watch()` depending on the watch settings
	* also exports all the available plugins
* `Compiler`
	* public
		* `run()`: core logic of compilation
			* apply `before-run` plugins
			* apply `run` plugins`
			* `readRecords()`
			* `compile(): Compilation`
			* `emitAssets()` writes the outcome on the file system
			* `emitRecords()`writes statistics to the file system
		* `apply()`
		* `watch()`
		* `purgeInputFileSystem()`
	* protected
		* `compile()`
		* `readRecords()`
* `Compilation`
	* 
* `Parser`
	* todo
