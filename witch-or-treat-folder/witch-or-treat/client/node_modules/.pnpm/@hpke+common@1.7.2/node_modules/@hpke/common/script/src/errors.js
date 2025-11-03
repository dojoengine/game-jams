(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotSupportedError = exports.DeriveKeyPairError = exports.MessageLimitReachedError = exports.OpenError = exports.SealError = exports.ExportError = exports.DecapError = exports.EncapError = exports.DeserializeError = exports.SerializeError = exports.ValidationError = exports.InvalidParamError = exports.HpkeError = void 0;
    /**
     * The base error class of hpke-js.
     * @group Errors
     */
    class HpkeError extends Error {
        constructor(e) {
            let message;
            if (e instanceof Error) {
                message = e.message;
            }
            else if (typeof e === "string") {
                message = e;
            }
            else {
                message = "";
            }
            super(message);
            this.name = this.constructor.name;
        }
    }
    exports.HpkeError = HpkeError;
    /**
     * Invalid parameter.
     * @group Errors
     */
    class InvalidParamError extends HpkeError {
    }
    exports.InvalidParamError = InvalidParamError;
    /**
     * KEM input or output validation failure.
     * @group Errors
     */
    class ValidationError extends HpkeError {
    }
    exports.ValidationError = ValidationError;
    /**
     * Public or private key serialization failure.
     * @group Errors
     */
    class SerializeError extends HpkeError {
    }
    exports.SerializeError = SerializeError;
    /**
     * Public or private key deserialization failure.
     * @group Errors
     */
    class DeserializeError extends HpkeError {
    }
    exports.DeserializeError = DeserializeError;
    /**
     * encap() failure.
     * @group Errors
     */
    class EncapError extends HpkeError {
    }
    exports.EncapError = EncapError;
    /**
     * decap() failure.
     * @group Errors
     */
    class DecapError extends HpkeError {
    }
    exports.DecapError = DecapError;
    /**
     * Secret export failure.
     * @group Errors
     */
    class ExportError extends HpkeError {
    }
    exports.ExportError = ExportError;
    /**
     * seal() failure.
     * @group Errors
     */
    class SealError extends HpkeError {
    }
    exports.SealError = SealError;
    /**
     * open() failure.
     * @group Errors
     */
    class OpenError extends HpkeError {
    }
    exports.OpenError = OpenError;
    /**
     * Sequence number overflow on the encryption context.
     * @group Errors
     */
    class MessageLimitReachedError extends HpkeError {
    }
    exports.MessageLimitReachedError = MessageLimitReachedError;
    /**
     * Key pair derivation failure.
     * @group Errors
     */
    class DeriveKeyPairError extends HpkeError {
    }
    exports.DeriveKeyPairError = DeriveKeyPairError;
    /**
     * Not supported failure.
     * @group Errors
     */
    class NotSupportedError extends HpkeError {
    }
    exports.NotSupportedError = NotSupportedError;
});
