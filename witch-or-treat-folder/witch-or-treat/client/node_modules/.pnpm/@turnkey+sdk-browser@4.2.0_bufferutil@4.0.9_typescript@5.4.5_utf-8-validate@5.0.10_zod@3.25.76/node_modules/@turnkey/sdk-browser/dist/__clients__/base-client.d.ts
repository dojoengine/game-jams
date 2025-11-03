import type { TurnkeySDKClientConfig, AuthClient } from "@types";
import { TurnkeySDKClientBase } from "../__generated__/sdk-client-base";
export declare abstract class TurnkeyBaseClient extends TurnkeySDKClientBase {
    authClient?: AuthClient | undefined;
    constructor(config: TurnkeySDKClientConfig, authClient?: AuthClient);
}
//# sourceMappingURL=base-client.d.ts.map