import { stringToBase64urlString } from '@turnkey/encoding';
import { WalletStamperError } from './errors.mjs';
import { WalletType } from './types.mjs';
import { SIGNATURE_SCHEME_TK_API_ED25519, SIGNATURE_SCHEME_TK_API_SECP256K1_EIP191, STAMP_HEADER_NAME } from './constants.mjs';

// WalletStamper class implements the TStamper interface to use wallet's signature and public key
// to authenticate requests to Turnkey.
class WalletStamper {
    constructor(wallet) {
        this.wallet = wallet;
    }
    async stamp(payload) {
        let signature;
        try {
            signature = await this.wallet.signMessage(payload);
        }
        catch (error) {
            throw new WalletStamperError("Failed to sign the message", error);
        }
        // Determine the signature scheme based on the wallet type.
        const scheme = this.wallet.type === WalletType.Solana
            ? SIGNATURE_SCHEME_TK_API_ED25519
            : SIGNATURE_SCHEME_TK_API_SECP256K1_EIP191;
        let publicKey;
        try {
            // For Ethereum, we need to recover the public key from the signature over the payload.
            // This is because recovering the SECP256K1 public key requires a signed message.
            // This avoids an additional call to the wallet to get the public key.
            if (this.wallet.type === WalletType.Ethereum) {
                const { recoverPublicKey, hashMessage } = await import('viem');
                const { compressRawPublicKey, toDerSignature } = await import('@turnkey/crypto');
                const secp256k1PublicKey = await recoverPublicKey({
                    hash: hashMessage(payload),
                    signature: signature,
                });
                publicKey = secp256k1PublicKey.replace("0x", "");
                const publicKeyBytes = Uint8Array.from(Buffer.from(publicKey, "hex"));
                publicKey = Buffer.from(compressRawPublicKey(publicKeyBytes)).toString("hex");
                // Convert the signature to DER format which is required by the Turnkey API.
                signature = toDerSignature(signature.replace("0x", ""));
            }
            else {
                // For Solana, we can directly use the public key.
                publicKey = await this.wallet.getPublicKey();
            }
        }
        catch (error) {
            throw new WalletStamperError("Failed to recover public key", error);
        }
        const stamp = {
            publicKey,
            scheme,
            signature,
        };
        // Return the stamp as a base64url encoded JSON string in the header format.
        return {
            stampHeaderName: STAMP_HEADER_NAME,
            stampHeaderValue: stringToBase64urlString(JSON.stringify(stamp)),
        };
    }
}

export { WalletStamper };
//# sourceMappingURL=stamper.mjs.map
