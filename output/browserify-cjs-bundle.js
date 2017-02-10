(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// calculator.js
module.exports = {
	add: function (a, b) {
		return a + b;
	}
};
},{}],2:[function(require,module,exports){
// index.js
const calculator = require("./calculator");
const result = calculator.add(1, 2);
console.log(result);
},{"./calculator":1}]},{},[2]);
