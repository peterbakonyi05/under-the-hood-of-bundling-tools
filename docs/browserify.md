# Browserify

* 800 loc + some core modules
* support Common JS module format (`require`, `module.exports`)
* uses pipes/streams for transformation

## Basic steps of transformation
* get the dependencies (using `module-deps`)
* do some stuff (syntax check, sort them, dedupe etc.)
* emit dependencies
