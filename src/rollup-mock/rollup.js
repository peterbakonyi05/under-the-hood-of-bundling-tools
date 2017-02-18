import fsp from "fs-promise";
import { Bundle } from "./Bundle";

function rollup(options) {
    const bundle = new Bundle(options);
    bundle.build()
        .then(() => {
            const code = bundle.render();
            return fsp.writeFile(options.output, code);
        });
}
