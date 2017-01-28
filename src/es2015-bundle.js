const fsp = require("fs-promise");
const acorn = require("acorn");
const estraverse = require("estraverse");
const escodegen = require("escodegen");

function getAst(entry) {
	return fsp.readFile(entry, { encoding: "utf-8" })
		.then(source => acorn.parse(source, {
			ranges: true,
			locations: true,
			ecmaVersion: 2017,
			sourceType: "module"
		}));
}

function replaceExportStatemets(ast) {
	return estraverse.replace(ast, {
		enter: (node) => {
			// Replace it with replaced.
			if (node.type === 'ImportDeclaration') {
				const cjsReqire = `const ${node.specifiers[0].local.name} = require("${node.source.value}")`;
				return acorn.parse(cjsReqire);
			}
		}
	});
}

function generate(ast) {
	return escodegen.generate(ast);
}
function es2015Bundle(entry, output) {
	getAst(entry)
		.then(ast => replaceExportStatemets(ast))
		.then(ast => generate(ast))
		.then(source => {
			console.log(source);
		});
}

// todo: delete after debugging
const path = require("path");
es2015Bundle(path.join(__dirname, "../example/calculator-es2015/index.js"));