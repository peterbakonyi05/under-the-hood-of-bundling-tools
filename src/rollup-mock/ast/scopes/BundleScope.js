import { Scope } from "./Scope";

export class BundleScope extends Scope{
    findDeclaration() {
        // Same as scope, just handles if the given reference is not found
        // it will assume that it is a global declaration
    }
}