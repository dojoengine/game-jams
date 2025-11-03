import { p256 } from '@noble/curves/p256';
import { createHash } from 'sha256-uint8array';
import { uint8ArrayToHexString } from '@turnkey/encoding';

const signWithApiKey = async (input) => {
    const publicKey = p256.getPublicKey(input.privateKey, true);
    // Public key in the usual 02 or 03 + 64 hex digits
    const publicKeyString = uint8ArrayToHexString(publicKey);
    if (publicKeyString != input.publicKey) {
        throw new Error(`Bad API key. Expected to get public key ${input.publicKey}, got ${publicKeyString}`);
    }
    const hash = createHash().update(input.content).digest();
    const signature = p256.sign(hash, input.privateKey);
    return signature.toDERHex();
};

export { signWithApiKey };
//# sourceMappingURL=purejs.mjs.map
