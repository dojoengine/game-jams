import { getResponseToJSON } from './api.mjs';

async function get(options) {
    const response = (await navigator.credentials.get(options));
    response.toJSON = () => getResponseToJSON(response);
    return response;
}

export { get };
//# sourceMappingURL=index.mjs.map
