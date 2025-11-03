"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxBytesPerTransaction = exports.bytesPerBlob = exports.fieldElementsPerBlob = exports.bytesPerFieldElement = exports.blobsPerTransaction = void 0;
exports.blobsPerTransaction = 6;
exports.bytesPerFieldElement = 32;
exports.fieldElementsPerBlob = 4096;
exports.bytesPerBlob = exports.bytesPerFieldElement * exports.fieldElementsPerBlob;
exports.maxBytesPerTransaction = exports.bytesPerBlob * exports.blobsPerTransaction -
    1 -
    1 * exports.fieldElementsPerBlob * exports.blobsPerTransaction;
//# sourceMappingURL=blob.js.map