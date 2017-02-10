const test = require("tape");

const dummyEs6toCjsTransformer = require("./dummy-es6-to-cjs-transformer");

const source = `
import { calculator } from "./calculator";
calculator.add(1, 2);
`;
const expectedSource = `const calculator = require('./calculator');\ncalculator.add(1, 2);`;

test("dummyEs6toCjsTransformer", t => {
    t.plan(1);
    t.equal(dummyEs6toCjsTransformer(source), expectedSource);
});