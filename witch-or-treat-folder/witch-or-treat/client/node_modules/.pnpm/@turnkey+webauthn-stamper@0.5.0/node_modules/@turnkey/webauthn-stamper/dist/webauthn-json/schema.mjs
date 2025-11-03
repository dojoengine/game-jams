import { required, optional, derived, copyValue, convertValue } from './convert.mjs';

const simplifiedClientExtensionResultsSchema = {
    appid: optional(copyValue),
    appidExclude: optional(copyValue),
    credProps: optional(copyValue),
};
// `navigator.get()` response
const publicKeyCredentialWithAssertion = {
    type: required(copyValue),
    id: required(copyValue),
    rawId: required(convertValue),
    authenticatorAttachment: optional(copyValue),
    response: required({
        clientDataJSON: required(convertValue),
        authenticatorData: required(convertValue),
        signature: required(convertValue),
        userHandle: required(convertValue),
    }),
    clientExtensionResults: derived(simplifiedClientExtensionResultsSchema, (pkc) => pkc.getClientExtensionResults()),
};

export { publicKeyCredentialWithAssertion };
//# sourceMappingURL=schema.mjs.map
