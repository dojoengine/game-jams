import { EthereumWalletInterface, WalletType } from "./types";
import { Hex } from "viem";
import "viem/window";
/**
 * Abstract class representing a base Ethereum wallet.
 * This class is used for stamping requests with an Ethereum wallet.
 *
 * To use this class, extend it and implement the `signMessage` method
 * to provide a custom signing function. The `signMessage` method should
 * return a promise that resolves to a hexadecimal string representing
 * the signature of the provided message.
 */
export declare abstract class BaseEthereumWallet implements EthereumWalletInterface {
    type: WalletType.Ethereum;
    /**
     * Abstract method to sign a message.
     * Must be implemented by subclasses to provide a custom signing function.
     *
     * @param message - The message to be signed, either as a string or a Hex.
     * @returns A promise that resolves to a Hex string representing the signature.
     */
    abstract signMessage(message: string | Hex): Promise<Hex>;
    /**
     * Retrieves the public key associated with the wallet.
     *
     * @returns A promise that resolves to a string representing the compressed public key.
     */
    getPublicKey(): Promise<string>;
}
/**
 * EthereumWallet class extends the BaseEthereumWallet to provide
 * specific implementations for Ethereum-based wallets.
 *
 * This class is responsible for signing messages using the Ethereum
 * provider available in the browser (e.g., MetaMask). It interacts
 * with the Ethereum provider to request account access and sign
 * messages.
 */
export declare class EthereumWallet extends BaseEthereumWallet {
    /**
     * Signs a message using the Ethereum provider.
     *
     * @param message - The message to be signed, either as a string or a Hex.
     * @returns A promise that resolves to a Hex string representing the signature.
     *
     * This method uses the 'personal_sign' method of the Ethereum provider
     * to sign the message with the user's account.
     */
    signMessage(message: string | Hex): Promise<`0x${string}`>;
    /**
     * Retrieves the Ethereum provider from the window object.
     *
     * @returns The EIP1193Provider instance.
     *
     * This method checks if the Ethereum provider is available in the
     * window object and throws an error if not found.
     */
    private getProvider;
    /**
     * Requests the user's Ethereum account from the provider.
     *
     * @returns A promise that resolves to the user's Ethereum address.
     *
     * This method uses the 'eth_requestAccounts' method of the Ethereum
     * provider to request access to the user's account. It throws an error
     * if no account is connected.
     */
    private getAccount;
}
export declare const getCompressedPublicKey: (signature: Hex, message: string) => Promise<string>;
//# sourceMappingURL=ethereum.d.ts.map