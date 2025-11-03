import type { KdfInterface } from "./kdfInterface.js";
import type { KemInterface } from "./kemInterface.js";
/**
 * The DHKEM interface.
 */
export interface DhkemInterface extends KemInterface {
    readonly kdf: KdfInterface;
}
//# sourceMappingURL=dhkemInterface.d.ts.map