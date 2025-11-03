/**
 * Code modified from https://github.com/google/tink/blob/6f74b99a2bfe6677e3670799116a57268fd067fa/javascript/subtle/bytes.ts
 *
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Converts the hex string to a byte array.
 *
 * @param hex the input
 * @return the byte array output
 * @throws {!Error}
 * @static
 */
export declare function fromHex(hex: string): Uint8Array;
/**
 * Converts a byte array to hex.
 *
 * @param bytes the byte array input
 * @return hex the output
 * @static
 */
export declare function toHex(bytes: Uint8Array): string;
/**
 * Base64 encode a byte array.
 *
 * @param bytes the byte array input
 * @param opt_webSafe True indicates we should use the alternative
 *     alphabet, which does not require escaping for use in URLs.
 * @return base64 output
 * @static
 */
export declare function toBase64(bytes: Uint8Array, opt_webSafe?: boolean): string;
/**
 * Turns a byte array into the string given by the concatenation of the
 * characters to which the numbers correspond. Each byte is corresponding to a
 * character. Does not support multi-byte characters.
 *
 * @param bytes Array of numbers representing
 *     characters.
 * @return Stringification of the array.
 */
export declare function toByteString(bytes: Uint8Array): string;
//# sourceMappingURL=bytes.d.ts.map