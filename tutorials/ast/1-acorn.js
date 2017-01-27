const acorn = require("acorn");
const escodegen = require("escodegen");

const comments = [];
const tokens = [];

const ast = acorn.parse('var x = 42; // answer', {
	// collect ranges for each node
	ranges: true,
	// collect comments in Esprima's format
	onComment: comments,
	// collect token ranges
	onToken: tokens
});

// attach comments using collected information
escodegen.attachComments(ast, comments, tokens);

// generate code
console.log(escodegen.generate(ast, { comment: true }));