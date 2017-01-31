# Demistifying Bundling

## Install
`npm i`

## Folder structure
todo: explain folder structure

## Debugging
todo: link to vs code

### Browserify
todo

### Webpack
todo

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
