import * as wasm from "./account_wasm_bg.wasm";
export * from "./account_wasm_bg.js";
import { __wbg_set_wasm } from "./account_wasm_bg.js";
__wbg_set_wasm(wasm);