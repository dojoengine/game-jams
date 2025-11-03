import { bufferToBase64url } from './base64url.mjs';
import { convert } from './convert.mjs';
import { publicKeyCredentialWithAttestation, publicKeyCredentialWithAssertion } from './schema.mjs';

function createResponseToJSON(credential) {
    return convert(bufferToBase64url, publicKeyCredentialWithAttestation, credential);
}
function getResponseToJSON(credential) {
    return convert(bufferToBase64url, publicKeyCredentialWithAssertion, credential);
}

export { createResponseToJSON, getResponseToJSON };
//# sourceMappingURL=api.mjs.map
