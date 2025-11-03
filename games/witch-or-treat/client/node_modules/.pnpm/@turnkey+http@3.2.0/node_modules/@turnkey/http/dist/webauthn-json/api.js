'use strict';

var base64url = require('./base64url.js');
var convert = require('./convert.js');
var schema = require('./schema.js');

function createResponseToJSON(credential) {
    return convert.convert(base64url.bufferToBase64url, schema.publicKeyCredentialWithAttestation, credential);
}
function getResponseToJSON(credential) {
    return convert.convert(base64url.bufferToBase64url, schema.publicKeyCredentialWithAssertion, credential);
}

exports.createResponseToJSON = createResponseToJSON;
exports.getResponseToJSON = getResponseToJSON;
//# sourceMappingURL=api.js.map
