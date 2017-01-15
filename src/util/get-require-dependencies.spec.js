const test = require("tape");

const getRequireDependencies = require("./get-require-dependencies");

const content = `
    const calculator = require("./calculator");
    const calculator = require('./calculator-test");
    const calculator = require('./calculator/add");
    const calculator = require('./calculator/add-test.something.js");

    console.log(1);
`;

test("getRequireDependencies", t => {
    t.plan(2);
    t.deepEqual(
        getRequireDependencies(undefined),
        []
    );

    t.deepEqual(
        getRequireDependencies(content),
        [
            "./calculator",
            "./calculator-test",
            "./calculator/add",
            "./calculator/add-test.something.js"
        ]
    )
});