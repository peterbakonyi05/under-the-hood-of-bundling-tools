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
* understand Webpack
* understand Rollup

## Intro
Not focusing on how you get Webpack/Rollup/Browserify to working (there are thousands of good articles, I linked some at the end).
We are going to focus on what happens behind the scenes/under the hood.

Big words: statically analyzable, tree-shaking (what do they mean?) why the `export` syntax?

### How we get from here to here?
global+jquery => TS + Angular / React + Flow + Modular...
Let's get our hands a bit dirty...

## Naive implementation

### ES5 (Browserify / Webpack)
* module deps (~ 500loc)
    * todo: how it works?
* get the dependencies defined in one file: 

### ES6 (webpack)
Why ES6: statically analyzable ==> tree shaking

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

#### Modifying
* Once we have our code in AST mode, we can loop the whole tree an change whatever we want
    * traverse: https://github.com/estools/estraverse
    * scope analyzer: https://github.com/estools/escope
    * recursive traversing: https://github.com/estools/esrecurse

#### Converting back to JS
* https://github.com/estools/escodegen

### ES6 (Rollup)

## Architecture

### Config

### Plugins (minify...)

### Loaders (Babel, TS)

### NPM Linking

### HMR

## Interesting
Some numbers/performance
Big projects, lot of dependency, TS file
* Initial bundle: 24sec
* Increment: 2-8sec

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
If you understand the basic concepts and architecture, it is easy to use any of the bundling tools, even if it is wrapped inside a CLI.