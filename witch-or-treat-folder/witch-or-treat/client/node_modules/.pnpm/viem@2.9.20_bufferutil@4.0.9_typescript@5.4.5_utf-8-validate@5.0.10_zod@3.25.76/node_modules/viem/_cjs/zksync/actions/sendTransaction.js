"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTransaction = void 0;
const sendTransaction_js_1 = require("../../actions/wallet/sendTransaction.js");
const isEip712Transaction_js_1 = require("../utils/isEip712Transaction.js");
const sendEip712Transaction_js_1 = require("./sendEip712Transaction.js");
async function sendTransaction(client, args) {
    if ((0, isEip712Transaction_js_1.isEIP712Transaction)(args))
        return (0, sendEip712Transaction_js_1.sendEip712Transaction)(client, args);
    return (0, sendTransaction_js_1.sendTransaction)(client, args);
}
exports.sendTransaction = sendTransaction;
//# sourceMappingURL=sendTransaction.js.map