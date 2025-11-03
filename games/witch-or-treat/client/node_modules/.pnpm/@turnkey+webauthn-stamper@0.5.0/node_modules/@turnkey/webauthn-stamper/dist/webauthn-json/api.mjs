import { bufferToBase64url } from './base64url.mjs';
import { convert } from './convert.mjs';
import { publicKeyCredentialWithAssertion } from './schema.mjs';

function getResponseToJSON(credential) {
    return convert(bufferToBase64url, publicKeyCredentialWithAssertion, credential);
}

export { getResponseToJSON };
//# sourceMappingURL=api.mjs.map
