'use strict';

var index = require('./webauthn-json/index.js');

const defaultTimeout = 5 * 60 * 1000; // five minutes
const defaultUserVerification = "preferred";
const defaultSigningOptions = {
    publicKey: {
        timeout: defaultTimeout,
        userVerification: defaultUserVerification,
    },
};
async function getCredentialRequestOptions(payload, tkSigningOptions = defaultSigningOptions) {
    const challenge = await getChallengeFromPayload(payload);
    const signingOptions = {
        ...tkSigningOptions,
        publicKey: {
            ...defaultSigningOptions.publicKey,
            ...tkSigningOptions.publicKey,
            challenge,
        },
    };
    return signingOptions;
}
async function getChallengeFromPayload(payload) {
    const messageBuffer = new TextEncoder().encode(payload);
    const hashBuffer = await crypto.subtle.digest("SHA-256", messageBuffer);
    const hexString = Buffer.from(hashBuffer).toString("hex");
    const hexBuffer = Buffer.from(hexString, "utf8");
    return new Uint8Array(hexBuffer);
}
/* Pulled from https://www.w3.org/TR/webauthn-2/#enum-transport */
function protocolTransportEnumToInternalEnum(protocolEnum) {
    switch (protocolEnum) {
        case "internal": {
            return "AUTHENTICATOR_TRANSPORT_INTERNAL";
        }
        case "usb": {
            return "AUTHENTICATOR_TRANSPORT_USB";
        }
        case "nfc": {
            return "AUTHENTICATOR_TRANSPORT_NFC";
        }
        case "ble": {
            return "AUTHENTICATOR_TRANSPORT_BLE";
        }
        case "hybrid": {
            return "AUTHENTICATOR_TRANSPORT_HYBRID";
        }
        default: {
            throw new Error("unsupported transport format");
        }
    }
}
function toInternalAttestation(attestation) {
    return {
        credentialId: attestation.rawId,
        attestationObject: attestation.response.attestationObject,
        clientDataJson: attestation.response.clientDataJSON,
        transports: attestation.response.transports.map(protocolTransportEnumToInternalEnum),
    };
}
async function getWebAuthnAssertion(payload, options) {
    const webAuthnSupported = hasWebAuthnSupport();
    if (!webAuthnSupported) {
        throw new Error("webauthn is not supported by this browser");
    }
    const signingOptions = await getCredentialRequestOptions(payload, options);
    const clientGetResult = await index.get(signingOptions);
    const assertion = clientGetResult.toJSON();
    const stamp = {
        authenticatorData: assertion.response.authenticatorData,
        clientDataJson: assertion.response.clientDataJSON,
        credentialId: assertion.id,
        signature: assertion.response.signature,
    };
    return JSON.stringify(stamp);
}
async function getWebAuthnAttestation(options) {
    const webAuthnSupported = hasWebAuthnSupport();
    if (!webAuthnSupported) {
        throw new Error("webauthn is not supported by this browser");
    }
    const res = await index.create(options);
    return toInternalAttestation(res.toJSON());
}
// `hasWebAuthnSupport` checks for barebones webauthn support.
// For additional details and granular settings, see:
// https://web.dev/articles/passkey-form-autofill#feature-detection, https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredential
function hasWebAuthnSupport() {
    return !!window.PublicKeyCredential;
}

exports.getWebAuthnAssertion = getWebAuthnAssertion;
exports.getWebAuthnAttestation = getWebAuthnAttestation;
exports.protocolTransportEnumToInternalEnum = protocolTransportEnumToInternalEnum;
//# sourceMappingURL=webauthn.js.map
