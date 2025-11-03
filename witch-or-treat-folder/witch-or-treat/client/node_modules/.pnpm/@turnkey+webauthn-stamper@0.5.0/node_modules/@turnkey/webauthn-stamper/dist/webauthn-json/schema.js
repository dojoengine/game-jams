'use strict';

var convert = require('./convert.js');

const simplifiedClientExtensionResultsSchema = {
    appid: convert.optional(convert.copyValue),
    appidExclude: convert.optional(convert.copyValue),
    credProps: convert.optional(convert.copyValue),
};
// `navigator.get()` response
const publicKeyCredentialWithAssertion = {
    type: convert.required(convert.copyValue),
    id: convert.required(convert.copyValue),
    rawId: convert.required(convert.convertValue),
    authenticatorAttachment: convert.optional(convert.copyValue),
    response: convert.required({
        clientDataJSON: convert.required(convert.convertValue),
        authenticatorData: convert.required(convert.convertValue),
        signature: convert.required(convert.convertValue),
        userHandle: convert.required(convert.convertValue),
    }),
    clientExtensionResults: convert.derived(simplifiedClientExtensionResultsSchema, (pkc) => pkc.getClientExtensionResults()),
};

exports.publicKeyCredentialWithAssertion = publicKeyCredentialWithAssertion;
//# sourceMappingURL=schema.js.map
