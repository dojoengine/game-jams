/**
 * The base error class of hpke-js.
 * @group Errors
 */
export declare class HpkeError extends Error {
    constructor(e: unknown);
}
/**
 * Invalid parameter.
 * @group Errors
 */
export declare class InvalidParamError extends HpkeError {
}
/**
 * KEM input or output validation failure.
 * @group Errors
 */
export declare class ValidationError extends HpkeError {
}
/**
 * Public or private key serialization failure.
 * @group Errors
 */
export declare class SerializeError extends HpkeError {
}
/**
 * Public or private key deserialization failure.
 * @group Errors
 */
export declare class DeserializeError extends HpkeError {
}
/**
 * encap() failure.
 * @group Errors
 */
export declare class EncapError extends HpkeError {
}
/**
 * decap() failure.
 * @group Errors
 */
export declare class DecapError extends HpkeError {
}
/**
 * Secret export failure.
 * @group Errors
 */
export declare class ExportError extends HpkeError {
}
/**
 * seal() failure.
 * @group Errors
 */
export declare class SealError extends HpkeError {
}
/**
 * open() failure.
 * @group Errors
 */
export declare class OpenError extends HpkeError {
}
/**
 * Sequence number overflow on the encryption context.
 * @group Errors
 */
export declare class MessageLimitReachedError extends HpkeError {
}
/**
 * Key pair derivation failure.
 * @group Errors
 */
export declare class DeriveKeyPairError extends HpkeError {
}
/**
 * Not supported failure.
 * @group Errors
 */
export declare class NotSupportedError extends HpkeError {
}
//# sourceMappingURL=errors.d.ts.map