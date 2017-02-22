# Under the hood of bundling tools

This project is a collection of small examples that helps understanding how bundling tools (Webpack, Rollup, Browserify)
work under the hood. I created this project part of a presentation I prepared for the MaltaJS meetup group. 

## Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /bin/                         # Call bundlers with the example input (not important)
├── /docs/                        # Class and sequence diagram for rollup for better understanding
├── /example/                     # Can be used as an input for bundling
│   ├── calculator-cjs            # Basic module example using CommonJS format
│   ├── calculator-es2015         # Basic module example using ES2015 format
│   ├── cyclic-cjs                # Cyclic dependency example (shows the limitation of CJS module format)
│   ├── cyclic-es2015             # Cyclic dependency example (shows how ES2015 solves this problem)
├── /node_modules/                # 3rd-party libraries and utilities
├── /output/                      # Generated output by bundling tools for comparison (naming is logical)
│    ├── index.html               # Just open in the browser to see the examples running in the browser
├── /src/                         # Source code
│   ├── /common-js/               # Naive CommonJS bundler
│   ├── /dummy/                   # Dummy examples with tests
│       ├── module-dependencies   # Easiest way to get the dependencies of a module
│       ├── require-detector      # Getting dependencies of a CommonJS module using RegExp
│       ├── es6-to-cjs-transfor   # Converting ES6 `export` to CommonJS `require` statements
└── package.json                  # The list of 3rd party libraries and utilities
```


## Install
```
$ npm i
```

## Calculator example

You can modify the examples defined in `/example/calculator-cjs`, `/example/calculator-es2015` and then run the scripts
to see how the generated output changes.

### Build scripts for testing the generated output

```
$ npm run build:calculator:cjs             // runs src/calculator-cjs on CommonJS example
$ npm run build:calculator:cjs:browserify  // runs browserify on CommonJS example
$ npm run build:calculator:cjs:fuse-box    // runs Fuse-Box on CommonJS example
$ npm run build:calculator:cjs:webpack     // runs webpack on CommonJS example
$ npm run build:calculator:es2015:webpack  // runs webpack on ES2015 example
$ npm run build:calculator:es2015:rollup   // runs rollup on ES2015 example
```


## Cyclic example


Build scripts for testing the generated output from `/example/cyclic-cjs`, `/example/cyclic-es2015`
Shows thas ES2015 modules export bindings, not values. Demonstrates how this is solved by bundling tools that has built in support for ES2015 format.

### Build scripts for testing the generated output

```
$ npm run build:cyclic:cjs:webpack     // runs webpack on CommonJS example
$ npm run build:cyclic:es2015:webpack  // runs webpack on ES2015 example
$ npm run build:cyclic:es2015:rollup   // runs rollup on ES2015 example
```


## Debugging Rollup

In case you want to take a deep dive into a bundling tool. Check out the `docs/rollup` folder for some useful diagrams.


### Setup
See: https://code.visualstudio.com/Docs/editor/debugging

```json
{
    "program": "${workspaceRoot}\\node_modules\\rollup\\bin\\rollup",
    "args": [
       "example/calculator-es2015/index.js",
       "--output output/rollup/bundle.js",
       "--format iife"
    ]
}
```

Put a breakpoint in dist/rollup.js inside `function rollup() {}` (~9876 line)
