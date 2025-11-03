import { proxy, subscribe as sub } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
// -- State --------------------------------------------- //
const state = proxy({
    walletImages: {},
    networkImages: {},
    chainImages: {},
    connectorImages: {},
    tokenImages: {},
    currencyImages: {}
});
// -- Controller ---------------------------------------- //
export const AssetController = {
    state,
    subscribeNetworkImages(callback) {
        return sub(state.networkImages, () => callback(state.networkImages));
    },
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    subscribe(callback) {
        return sub(state, () => callback(state));
    },
    setWalletImage(key, value) {
        state.walletImages[key] = value;
    },
    setNetworkImage(key, value) {
        state.networkImages[key] = value;
    },
    setChainImage(key, value) {
        state.chainImages[key] = value;
    },
    setConnectorImage(key, value) {
        state.connectorImages = { ...state.connectorImages, [key]: value };
    },
    setTokenImage(key, value) {
        state.tokenImages[key] = value;
    },
    setCurrencyImage(key, value) {
        state.currencyImages[key] = value;
    }
};
//# sourceMappingURL=AssetController.js.map