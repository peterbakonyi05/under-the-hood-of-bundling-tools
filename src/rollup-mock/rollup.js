import {Bundle} from "./Bundle";

function rollup(options) {
    const bundle = new Bundle(options);
    bundle.build();
}
