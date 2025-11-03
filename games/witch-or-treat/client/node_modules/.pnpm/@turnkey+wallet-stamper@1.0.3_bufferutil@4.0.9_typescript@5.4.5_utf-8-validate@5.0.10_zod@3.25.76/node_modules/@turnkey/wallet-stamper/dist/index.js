'use strict';

var constants = require('./constants.js');
var errors = require('./errors.js');
var types = require('./types.js');
var stamper = require('./stamper.js');
var ethereum = require('./ethereum.js');



exports.SIGNATURE_SCHEME_TK_API_ED25519 = constants.SIGNATURE_SCHEME_TK_API_ED25519;
exports.SIGNATURE_SCHEME_TK_API_SECP256K1_EIP191 = constants.SIGNATURE_SCHEME_TK_API_SECP256K1_EIP191;
exports.STAMP_HEADER_NAME = constants.STAMP_HEADER_NAME;
exports.WalletStamperError = errors.WalletStamperError;
Object.defineProperty(exports, "WalletType", {
	enumerable: true,
	get: function () { return types.WalletType; }
});
exports.WalletStamper = stamper.WalletStamper;
exports.BaseEthereumWallet = ethereum.BaseEthereumWallet;
exports.EthereumWallet = ethereum.EthereumWallet;
exports.getCompressedPublicKey = ethereum.getCompressedPublicKey;
//# sourceMappingURL=index.js.map
