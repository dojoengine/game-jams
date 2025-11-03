'use strict';

var p256 = require('@noble/curves/p256');
var sha256Uint8array = require('sha256-uint8array');
var encoding = require('@turnkey/encoding');

const signWithApiKey = async (input) => {
    const publicKey = p256.p256.getPublicKey(input.privateKey, true);
    // Public key in the usual 02 or 03 + 64 hex digits
    const publicKeyString = encoding.uint8ArrayToHexString(publicKey);
    if (publicKeyString != input.publicKey) {
        throw new Error(`Bad API key. Expected to get public key ${input.publicKey}, got ${publicKeyString}`);
    }
    const hash = sha256Uint8array.createHash().update(input.content).digest();
    const signature = p256.p256.sign(hash, input.privateKey);
    return signature.toDERHex();
};

exports.signWithApiKey = signWithApiKey;
//# sourceMappingURL=purejs.js.map
