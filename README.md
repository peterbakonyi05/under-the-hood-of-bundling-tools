# Demistifying Bundling

## Install
```
$ npm i
```

## Npm scripts

```
$ npm run build:cjs             // runs src/common-js on CommonJS example
$ npm run build:cjs:browserify  // runs browserify on CommonJS example
$ npm run build:cjs:webpack     // runs webpack on CommonJS example
$ npm run build:es2015:webpack  // runs webpack on ES2015 example
```

## Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /bin/                       # Process CLI input and call the bundlers implemented in /src
├── /example/                   # Can be used as an input for bundling
├── /node_modules/              # 3rd-party libraries and utilities
├── /output/                    # Generated output by bundling tools for comparison 
├── /src/                       # Source code
│   ├── /common-js/             # Naive CommonJS bundler
│   ├── /dummy/                 # Dummy examples with tests
└── package.json                # The list of 3rd party libraries and utilities

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
