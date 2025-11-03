'use strict';

var sdkClientBase = require('../__generated__/sdk-client-base.js');

class TurnkeyBaseClient extends sdkClientBase.TurnkeySDKClientBase {
    constructor(config, authClient) {
        super(config);
        this.authClient = authClient;
    }
}

exports.TurnkeyBaseClient = TurnkeyBaseClient;
//# sourceMappingURL=base-client.js.map
