'use strict';

var index = require('./webauthn-json/index.js');
var sha256Uint8array = require('sha256-uint8array');

/// <reference lib="dom" />
// Header name for a webauthn stamp
const stampHeaderName = "X-Stamp-Webauthn";
const defaultTimeout = 5 * 60 * 1000; // five minutes
const defaultUserVerification = "preferred";
/**
 * Stamper to use with `@turnkey/http`'s `TurnkeyClient`
 */
class WebauthnStamper {
    constructor(config) {
        this.rpId = config.rpId;
        this.timeout = config.timeout || defaultTimeout;
        this.userVerification = config.userVerification || defaultUserVerification;
        this.allowCredentials = config.allowCredentials || [];
    }
    async stamp(payload) {
        const challenge = getChallengeFromPayload(payload);
        const signingOptions = {
            publicKey: {
                rpId: this.rpId,
                challenge: challenge,
                allowCredentials: this.allowCredentials,
                timeout: this.timeout,
                userVerification: this.userVerification,
            },
        };
        const clientGetResult = await index.get(signingOptions);
        const assertion = clientGetResult.toJSON();
        const stamp = {
            authenticatorData: assertion.response.authenticatorData,
            clientDataJson: assertion.response.clientDataJSON,
            credentialId: assertion.id,
            signature: assertion.response.signature,
        };
        return {
            stampHeaderName: stampHeaderName,
            stampHeaderValue: JSON.stringify(stamp),
        };
    }
}
function getChallengeFromPayload(payload) {
    const hexString = sha256Uint8array.createHash().update(payload).digest("hex");
    return new TextEncoder().encode(hexString);
}

exports.WebauthnStamper = WebauthnStamper;
//# sourceMappingURL=index.js.map
