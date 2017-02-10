const test = require("tape");

const dummyRequireDetector = require("./dummy-require-detector");

const content = `
    const calculator = require("./calculator");
    const calculator = require('./calculator-test");
    const calculator = require('./calculator/add");
    const calculator = require('./calculator/add-test.something.js");

    console.log(1);
`;

test("dummyRequireDetector", t => {
    t.plan(2);
    t.deepEqual(
        dummyRequireDetector(undefined),
        []
    );

    t.deepEqual(
        dummyRequireDetector(content),
        [
            "./calculator",
            "./calculator-test",
            "./calculator/add",
            "./calculator/add-test.something.js"
        ]
    )
});