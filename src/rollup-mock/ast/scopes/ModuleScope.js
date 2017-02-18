import { Scope } from "./Scope";

// same
export class ModuleScope extends Scope {
    constructor(module) {
        super({
            isModuleScope: true,
            isBlockScope: false
        });
        this.module = module;
    }

    deshadow(names) {
        // deshadow `this.module.imports` first
        super.deshadow(names);
    }
}
