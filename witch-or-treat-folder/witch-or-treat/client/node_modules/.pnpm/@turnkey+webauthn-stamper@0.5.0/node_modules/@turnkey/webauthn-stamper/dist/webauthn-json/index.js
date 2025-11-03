'use strict';

var api = require('./api.js');

async function get(options) {
    const response = (await navigator.credentials.get(options));
    response.toJSON = () => api.getResponseToJSON(response);
    return response;
}

exports.get = get;
//# sourceMappingURL=index.js.map
