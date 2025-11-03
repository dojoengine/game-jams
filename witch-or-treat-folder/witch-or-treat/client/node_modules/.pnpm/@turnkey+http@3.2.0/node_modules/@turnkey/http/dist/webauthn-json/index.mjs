import { createResponseToJSON, getResponseToJSON } from './api.mjs';

async function create(options) {
    const response = (await navigator.credentials.create(options));
    response.toJSON = () => createResponseToJSON(response);
    return response;
}
async function get(options) {
    const response = (await navigator.credentials.get(options));
    response.toJSON = () => getResponseToJSON(response);
    return response;
}

export { create, get };
//# sourceMappingURL=index.mjs.map
