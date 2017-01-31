# Demistifying Bundling

## TODOs
* OK - understand Browserify
* OK - implement very naive bundling
    * OK - https://github.com/substack/stream-handbook
    * OK - `finish cjs-naive-bundler.js`
* implement very naive ES6 bundling using babel or TS or both (or at least the steps)
    * understand ASTs
    * understand `babel-core` AST
    * undrstand Typescript compiler (https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)
* [ongoing] - understand Webpack
* [ongoing] - understand Rollup

## Intro
Not focusing on how you get Webpack/Rollup/Browserify to working (there are thousands of good articles, I linked some at the end).
We are going to focus on what happens behind the scenes/under the hood.

Big words: statically analyzable, tree-shaking (what do they mean?) why the `export` syntax?


### How we get from here to here?
global+jquery => TS + Angular / React + Flow + Modular...
todo: explain CommonJS and ES2015/ES6 module format

Let's get our hands a bit dirty...

## ES5+CJS implementation (Browserify / Webpack)
* steps of the implementation
* todo: check the implementation of `module-deps` plugin to reference it here
* note: this is exactly how Browserify works. (It doesn't support ES6 module format out of the box)
* the generated output is also very similar to the webpack output (todo: check webpack output one more time)

## Next evolutionary step: Temporary ES6 solutions
* using another tool as a plugin to transpile ES6 module format to CommonJS and then do the bundling
* I will skip this because the bundling tools now support ES6 modules and that is superior because that is part of the language
* using TypeScript or Babel now: you should leave the module format as ES6/ES2015 (todo: link Babel and tsconfig settings here)

## ES6 (webpack/rollup)
Why ES6: statically analyzable ==> tree shaking
Problem: `import`, `export` are built in keywords now, we cannot provide a runtime implementation.
To make it work in the the browser we need to transform the code. It means the bundler needs to understand the code.
How do we do that?

## AST

### Note on ASTs
* terms
    * lexical analysis (tokenization): lexer forms the first phase of a compiler
    * syntactic analysis (parsing): the process of analysing a string of symbols
        * parser takes input data and builds a data structure (like parse tree/concrete syntax tree)
    * AST is the result of simplifying the concrete syntax tree down to the things that actually needed to represent the meaning of the program
* abstract syntax trees are data structures (trees to be exact) that represents the syntactical structure of your source code (https://medium.com/@jerrymao/what-is-an-abstract-syntax-tree-and-why-do-i-care-c7882db8edc8#.2ng9c676g)
* by parsing source code into an AST, it is much easier to perform static analysis

#### Creating AST
* https://medium.com/@jotadeveloper/abstract-syntax-trees-on-javascript-534e33361fc7#.671blsgek
    * https://github.com/estree/estree: the first AST common specification
    * fully compatible parsers with the specs 
        * https://github.com/jquery/esprima (most pupular, Istanbul is also using this one)
        * https://github.com/ternjs/acorn (Acorn claims to be faster, smaller and prettier than Esprima)
        * https://github.com/babel/babylon (Babels parser)
        * TODO: TypeScript parser?
        * all the players perf comparison: http://esprima.org/test/compare.html, https://astexplorer.net/

```js
// type: ImportDeclaration
import * as _ from "lodash";

// type: ExportNamedDeclaration
export function a() {
	return 1;
}

// type: ExportDefaultDeclaration
export default class B {
}

```

#### Modifying
* Once we have our code in AST mode, we can loop the whole tree an change whatever we want
    * traverse: https://github.com/estools/estraverse
    * scope analyzer: https://github.com/estools/escope
    * recursive traversing: https://github.com/estools/esrecurse
* Example

#### Converting back to JS
* https://github.com/estools/escodegen

### ES6 module loaders (Rollup/Webpack 2)
* Building blocks of the implementation (take rollup as a reference because it is much cleaner and more compact)
* todo: show webpack and rollup output


## Advanced topics
* HMR
* todo: find another interesting topic

## Frameworks, CLIs
Angular-cli (webpack)
Create-react-app (webpack)
Ionic (previously system, now webpack or rollup)
Meteor
Aurelia
Shortly some other libraries (ember, cycle.js...)

## Articles
Collection of sources and articles on how to do it for your project.

## Sources
* Webpack
* Rollup
* Browserify
* https://www.youtube.com/watch?v=admLV6V2eDg&list=PLUzuI4zq53eHbqKe4Dcf6YaSL-CXscDv5&index=3

## Summary
If you understand the basic concepts and architecture, it is easier to configure and use any of the bundling tools.
Especially when it comes to debugging.
