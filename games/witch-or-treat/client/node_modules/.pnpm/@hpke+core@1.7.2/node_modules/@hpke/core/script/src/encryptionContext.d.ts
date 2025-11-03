import type { AeadInterface, KdfInterface } from "@hpke/common";
import type { AeadParams } from "./interfaces/aeadParams.js";
import type { KeyInfo } from "./interfaces/keyInfo.js";
import { ExporterContextImpl } from "./exporterContext.js";
export declare class EncryptionContextImpl extends ExporterContextImpl {
    protected _aead: AeadInterface;
    protected _nK: number;
    protected _nN: number;
    protected _nT: number;
    protected _ctx: KeyInfo;
    constructor(api: SubtleCrypto, kdf: KdfInterface, params: AeadParams);
    protected computeNonce(k: KeyInfo): ArrayBuffer;
    protected incrementSeq(k: KeyInfo): void;
}
//# sourceMappingURL=encryptionContext.d.ts.map