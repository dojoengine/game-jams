'use strict';

var crypto = require('crypto');
var utils = require('./utils.js');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var crypto__namespace = /*#__PURE__*/_interopNamespaceDefault(crypto);

const signWithApiKey = async (input) => {
    const { content, publicKey, privateKey } = input;
    const privateKeyObject = crypto__namespace.createPrivateKey({
        // @ts-expect-error -- the key can be a JWK object since Node v15.12.0
        // https://nodejs.org/api/crypto.html#cryptocreateprivatekeykey
        key: utils.convertTurnkeyApiKeyToJwk({
            uncompressedPrivateKeyHex: privateKey,
            compressedPublicKeyHex: publicKey,
        }),
        format: "jwk",
    });
    const sign = crypto__namespace.createSign("SHA256");
    sign.write(Buffer.from(content));
    sign.end();
    return sign.sign(privateKeyObject, "hex");
};

exports.signWithApiKey = signWithApiKey;
//# sourceMappingURL=nodecrypto.js.map
