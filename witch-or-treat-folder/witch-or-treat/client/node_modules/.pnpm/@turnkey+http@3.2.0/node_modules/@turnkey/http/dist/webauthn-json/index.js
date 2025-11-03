'use strict';

var api = require('./api.js');

async function create(options) {
    const response = (await navigator.credentials.create(options));
    response.toJSON = () => api.createResponseToJSON(response);
    return response;
}
async function get(options) {
    const response = (await navigator.credentials.get(options));
    response.toJSON = () => api.getResponseToJSON(response);
    return response;
}

exports.create = create;
exports.get = get;
//# sourceMappingURL=index.js.map
