# Demistifying Bundling

## TODOs
* OK - understand Browserify
* implement very naive bundling
    * https://github.com/substack/stream-handbook
    * `finish cjs-naive-bundler.js`
* understand Rollup
* understand Webpack
* implement very naive ES6 bundling

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