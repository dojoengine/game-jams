import { TurnkeySDKClientBase } from '../__generated__/sdk-client-base.mjs';

class TurnkeyBaseClient extends TurnkeySDKClientBase {
    constructor(config, authClient) {
        super(config);
        this.authClient = authClient;
    }
}

export { TurnkeyBaseClient };
//# sourceMappingURL=base-client.mjs.map
