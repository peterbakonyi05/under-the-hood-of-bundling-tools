# Under the hood of modern bundling tools

## Install
```
$ npm i
```

## Npm scripts

### Calculator example

Build scripts for testing the generated output from /example/calculator-cjs, /example/calculator-es2015

```
$ npm run build:calculator:cjs             // runs src/calculator-cjs on CommonJS example
$ npm run build:calculator:cjs:browserify  // runs browserify on CommonJS example
$ npm run build:calculator:cjs:fuse-box    // runs Fuse-Box on CommonJS example
$ npm run build:calculator:cjs:webpack     // runs webpack on CommonJS example
$ npm run build:calculator:es2015:webpack  // runs webpack on ES2015 example
$ npm run build:calculator:es2015:rollup   // runs rollup on ES2015 example
```


### Cyclic example

Build scripts for testing the generated output from /example/cyclic-cjs, /example/cyclic-es2015.
Shows thas ES2015 modules export bindings, not values. Demonstrates how this is solved by bundling tools that has built in support for ES2015 format.

```
$ npm run build:cyclic:cjs:webpack     // runs webpack on CommonJS example
$ npm run build:cyclic:es2015:webpack  // runs webpack on ES2015 example
$ npm run build:cyclic:es2015:rollup   // runs rollup on ES2015 example
```

## Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /bin/                       # Call bundlers with the example input
├── /example/                   # Can be used as an input for bundling
│   ├── calculator-cjs/es2015   # Basic module example
│   ├── cyclic-cjs/es2015       # Cyclic dependency example (shows the limitation of CJS module format)
├── /node_modules/              # 3rd-party libraries and utilities
├── /output/                    # Generated output by bundling tools for comparison
├── /src/                       # Source code
│   ├── /common-js/             # Naive CommonJS bundler
│   ├── /dummy/                 # Dummy examples with tests
└── package.json                # The list of 3rd party libraries and utilities
```

## Debugging
In case you want to take a deep dive into how some of the tools work.

See: https://code.visualstudio.com/Docs/editor/debugging

### Rollup
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
