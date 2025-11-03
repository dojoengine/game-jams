/**
 * Code modified from https://github.com/google/tink/blob/6f74b99a2bfe6677e3670799116a57268fd067fa/javascript/subtle/elliptic_curves.ts
 * - The implementation of integerToByteArray has been modified to augment the resulting byte array to a certain length.
 * - The implementation of PointDecode has been modified to decode both compressed and uncompressed points by checking for correct format
 * - Method isP256CurvePoint added to check whether an uncompressed point is valid
 *
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Decodes a public key in _compressed_ OR _uncompressed_ format.
 * Augmented to ensure that the x and y components are padded to fit 32 bytes.
 *
 * P-256 only
 */
export declare function pointDecode(point: Uint8Array): JsonWebKey;
//# sourceMappingURL=elliptic_curves.d.ts.map