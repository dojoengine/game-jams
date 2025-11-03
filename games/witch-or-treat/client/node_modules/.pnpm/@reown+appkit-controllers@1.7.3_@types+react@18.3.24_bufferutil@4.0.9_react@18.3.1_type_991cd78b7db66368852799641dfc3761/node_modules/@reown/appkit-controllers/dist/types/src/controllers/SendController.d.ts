import { type Balance } from '@reown/appkit-common';
export interface TxParams {
    receiverAddress: string;
    sendTokenAmount: number;
    gasPrice: bigint;
    decimals: string;
}
export interface ContractWriteParams {
    receiverAddress: string;
    tokenAddress: string;
    sendTokenAmount: number;
    decimals: string;
}
export interface SendControllerState {
    tokenBalances: Balance[];
    token?: Balance;
    sendTokenAmount?: number;
    receiverAddress?: string;
    receiverProfileName?: string;
    receiverProfileImageUrl?: string;
    gasPrice?: bigint;
    gasPriceInUSD?: number;
    networkBalanceInUSD?: string;
    loading: boolean;
    lastRetry?: number;
}
type StateKey = keyof SendControllerState;
export declare const SendController: {
    state: SendControllerState;
    subscribe(callback: (newState: SendControllerState) => void): () => void;
    subscribeKey<K extends StateKey>(key: K, callback: (value: SendControllerState[K]) => void): () => void;
    setToken(token: SendControllerState["token"]): void;
    setTokenAmount(sendTokenAmount: SendControllerState["sendTokenAmount"]): void;
    setReceiverAddress(receiverAddress: SendControllerState["receiverAddress"]): void;
    setReceiverProfileImageUrl(receiverProfileImageUrl: SendControllerState["receiverProfileImageUrl"]): void;
    setReceiverProfileName(receiverProfileName: SendControllerState["receiverProfileName"]): void;
    setGasPrice(gasPrice: SendControllerState["gasPrice"]): void;
    setGasPriceInUsd(gasPriceInUSD: SendControllerState["gasPriceInUSD"]): void;
    setNetworkBalanceInUsd(networkBalanceInUSD: SendControllerState["networkBalanceInUSD"]): void;
    setLoading(loading: SendControllerState["loading"]): void;
    sendToken(): void;
    sendEvmToken(): void;
    fetchTokenBalance(onError?: (error: unknown) => void): Promise<Balance[]>;
    fetchNetworkBalance(): void;
    isInsufficientNetworkTokenForGas(networkBalanceInUSD: string, gasPriceInUSD: number | undefined): boolean;
    hasInsufficientGasFunds(): boolean;
    sendNativeToken(params: TxParams): Promise<void>;
    sendERC20Token(params: ContractWriteParams): Promise<void>;
    sendSolanaToken(): void;
    resetSend(): void;
};
export {};
