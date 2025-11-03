// ----------------------------
// CURVE_SECP256K1 Accounts
// ----------------------------
// Ethereum
const defaultEthereumAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/60'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_ETHEREUM",
    };
};
const DEFAULT_ETHEREUM_ACCOUNTS = [
    defaultEthereumAccountAtIndex(0),
];
// Cosmos
const defaultCosmosAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/118'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_COSMOS",
    };
};
const DEFAULT_COSMOS_ACCOUNTS = [
    defaultCosmosAccountAtIndex(0),
];
// Tron
const defaultTronAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/195'/${pathIndex}'`,
        addressFormat: "ADDRESS_FORMAT_TRON",
    };
};
const DEFAULT_TRON_ACCOUNTS = [
    defaultTronAccountAtIndex(0),
];
// Bitcoin Mainnet P2PKH
const defaultBitcoinMainnetP2PKHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/0'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_MAINNET_P2PKH",
    };
};
const DEFAULT_BITCOIN_MAINNET_P2PKH_ACCOUNTS = [
    defaultBitcoinMainnetP2PKHAccountAtIndex(0),
];
// Bitcoin Mainnet P2WPKH
const defaultBitcoinMainnetP2WPKHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/84'/0'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_MAINNET_P2WPKH",
    };
};
const DEFAULT_BITCOIN_MAINNET_P2WPKH_ACCOUNTS = [
    defaultBitcoinMainnetP2WPKHAccountAtIndex(0),
];
// Bitcoin Mainnet P2WSH
const defaultBitcoinMainnetP2WSHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/48'/0'/${pathIndex}'/2'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_MAINNET_P2WSH",
    };
};
const DEFAULT_BITCOIN_MAINNET_P2WSH_ACCOUNTS = [
    defaultBitcoinMainnetP2WSHAccountAtIndex(0),
];
// Bitcoin Mainnet P2TR
const defaultBitcoinMainnetP2TRAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/86'/0'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_MAINNET_P2TR",
    };
};
const DEFAULT_BITCOIN_MAINNET_P2TR_ACCOUNTS = [
    defaultBitcoinMainnetP2TRAccountAtIndex(0),
];
// Bitcoin Mainnet P2SH
const defaultBitcoinMainnetP2SHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/0'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_MAINNET_P2SH",
    };
};
const DEFAULT_BITCOIN_MAINNET_P2SH_ACCOUNTS = [
    defaultBitcoinMainnetP2SHAccountAtIndex(0),
];
// Bitcoin Testnet P2PKH
const defaultBitcoinTestnetP2PKHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_TESTNET_P2PKH",
    };
};
const DEFAULT_BITCOIN_TESTNET_P2PKH_ACCOUNTS = [
    defaultBitcoinTestnetP2PKHAccountAtIndex(0),
];
// Bitcoin Testnet P2WPKH
const defaultBitcoinTestnetP2WPKHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/84'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_TESTNET_P2WPKH",
    };
};
const DEFAULT_BITCOIN_TESTNET_P2WPKH_ACCOUNTS = [
    defaultBitcoinTestnetP2WPKHAccountAtIndex(0),
];
// Bitcoin Testnet P2WSH
const defaultBitcoinTestnetP2WSHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/48'/1'/${pathIndex}'/2'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_TESTNET_P2WSH",
    };
};
const DEFAULT_BITCOIN_TESTNET_P2WSH_ACCOUNTS = [
    defaultBitcoinTestnetP2WSHAccountAtIndex(0),
];
// Bitcoin Testnet P2TR
const defaultBitcoinTestnetP2TRAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/86'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_TESTNET_P2TR",
    };
};
const DEFAULT_BITCOIN_TESTNET_P2TR_ACCOUNTS = [
    defaultBitcoinTestnetP2TRAccountAtIndex(0),
];
// Bitcoin Testnet P2SH
const defaultBitcoinTestnetP2SHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_TESTNET_P2SH",
    };
};
const DEFAULT_BITCOIN_TESTNET_P2SH_ACCOUNTS = [
    defaultBitcoinTestnetP2SHAccountAtIndex(0),
];
// Bitcoin Signet P2PKH
const defaultBitcoinSignetP2PKHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_SIGNET_P2PKH",
    };
};
const DEFAULT_BITCOIN_SIGNET_P2PKH_ACCOUNTS = [
    defaultBitcoinSignetP2PKHAccountAtIndex(0),
];
// Bitcoin Signet P2WPKH
const defaultBitcoinSignetP2WPKHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/84'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_SIGNET_P2WPKH",
    };
};
const DEFAULT_BITCOIN_SIGNET_P2WPKH_ACCOUNTS = [
    defaultBitcoinSignetP2WPKHAccountAtIndex(0),
];
// Bitcoin Signet P2WSH
const defaultBitcoinSignetP2WSHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/48'/1'/${pathIndex}'/2'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_SIGNET_P2WSH",
    };
};
const DEFAULT_BITCOIN_SIGNET_P2WSH_ACCOUNTS = [
    defaultBitcoinSignetP2WSHAccountAtIndex(0),
];
// Bitcoin Signet P2TR
const defaultBitcoinSignetP2TRAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/86'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_SIGNET_P2TR",
    };
};
const DEFAULT_BITCOIN_SIGNET_P2TR_ACCOUNTS = [
    defaultBitcoinSignetP2TRAccountAtIndex(0),
];
// Bitcoin Signet P2SH
const defaultBitcoinSignetP2SHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_SIGNET_P2SH",
    };
};
const DEFAULT_BITCOIN_SIGNET_P2SH_ACCOUNTS = [
    defaultBitcoinSignetP2SHAccountAtIndex(0),
];
// Bitcoin Regtest P2PKH
const defaultBitcoinRegtestP2PKHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_REGTEST_P2PKH",
    };
};
const DEFAULT_BITCOIN_REGTEST_P2PKH_ACCOUNTS = [
    defaultBitcoinRegtestP2PKHAccountAtIndex(0),
];
// Bitcoin Regtest P2WPKH
const defaultBitcoinRegtestP2WPKHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/84'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_REGTEST_P2WPKH",
    };
};
const DEFAULT_BITCOIN_REGTEST_P2WPKH_ACCOUNTS = [
    defaultBitcoinRegtestP2WPKHAccountAtIndex(0),
];
// Bitcoin Regtest P2WSH
const defaultBitcoinRegtestP2WSHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/48'/1'/${pathIndex}'/2'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_REGTEST_P2WSH",
    };
};
const DEFAULT_BITCOIN_REGTEST_P2WSH_ACCOUNTS = [
    defaultBitcoinRegtestP2WSHAccountAtIndex(0),
];
// Bitcoin Regtest P2TR
const defaultBitcoinRegtestP2TRAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/86'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_REGTEST_P2TR",
    };
};
const DEFAULT_BITCOIN_REGTEST_P2TR_ACCOUNTS = [
    defaultBitcoinRegtestP2TRAccountAtIndex(0),
];
// Bitcoin Regtest P2SH
const defaultBitcoinRegtestP2SHAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/1'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_BITCOIN_REGTEST_P2SH",
    };
};
const DEFAULT_BITCOIN_REGTEST_P2SH_ACCOUNTS = [
    defaultBitcoinRegtestP2SHAccountAtIndex(0),
];
// Dogecoin Mainnet
const defaultDogeMainnetAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/3'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_DOGE_MAINNET",
    };
};
const DEFAULT_DOGE_MAINNET_ACCOUNTS = [
    defaultDogeMainnetAccountAtIndex(0),
];
// Dogecoin Testnet
const defaultDogeTestnetAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/3'/${pathIndex}'/0/0`,
        addressFormat: "ADDRESS_FORMAT_DOGE_TESTNET",
    };
};
const DEFAULT_DOGE_TESTNET_ACCOUNTS = [
    defaultDogeTestnetAccountAtIndex(0),
];
// Sei
const defaultSeiAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/118'/${pathIndex}'/0'/0'`,
        addressFormat: "ADDRESS_FORMAT_SEI",
    };
};
// Xrp
const defaultXrpAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_SECP256K1",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/144'/${pathIndex}'/0'/0'`,
        addressFormat: "ADDRESS_FORMAT_XRP",
    };
};
const DEFAULT_SEI_ACCOUNTS = [
    defaultSeiAccountAtIndex(0),
];
// ----------------------------
// CURVE_ED25519 Accounts
// ----------------------------
// Solana
const defaultSolanaAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_ED25519",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/501'/${pathIndex}'/0'`,
        addressFormat: "ADDRESS_FORMAT_SOLANA",
    };
};
const DEFAULT_SOLANA_ACCOUNTS = [
    defaultSolanaAccountAtIndex(0),
];
// SUI
const defaultSuiAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_ED25519",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/784'/${pathIndex}'/0'/0'`,
        addressFormat: "ADDRESS_FORMAT_SUI",
    };
};
const DEFAULT_SUI_ACCOUNTS = [
    defaultSuiAccountAtIndex(0),
];
// Aptos
const defaultAptosAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_ED25519",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/637'/${pathIndex}'/0'/0'`,
        addressFormat: "ADDRESS_FORMAT_APTOS",
    };
};
const DEFAULT_APTOS_ACCOUNTS = [
    defaultAptosAccountAtIndex(0),
];
// Stellar (XLM)
const defaultXlmAccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_ED25519",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/148'/${pathIndex}'`,
        addressFormat: "ADDRESS_FORMAT_XLM",
    };
};
const DEFAULT_XLM_ACCOUNTS = [
    defaultXlmAccountAtIndex(0),
];
// TON V3R2
const defaultTonV3r2AccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_ED25519",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/607'/${pathIndex}'/0'/0'`,
        addressFormat: "ADDRESS_FORMAT_TON_V3R2",
    };
};
const DEFAULT_TON_V3R2_ACCOUNTS = [
    defaultTonV3r2AccountAtIndex(0),
];
// TON V4R2
const defaultTonV4r2AccountAtIndex = (pathIndex) => {
    return {
        curve: "CURVE_ED25519",
        pathFormat: "PATH_FORMAT_BIP32",
        path: `m/44'/607'/${pathIndex}'/0'/0'`,
        addressFormat: "ADDRESS_FORMAT_TON_V4R2",
    };
};
const DEFAULT_TON_V4R2_ACCOUNTS = [
    defaultTonV4r2AccountAtIndex(0),
];

export { DEFAULT_APTOS_ACCOUNTS, DEFAULT_BITCOIN_MAINNET_P2PKH_ACCOUNTS, DEFAULT_BITCOIN_MAINNET_P2SH_ACCOUNTS, DEFAULT_BITCOIN_MAINNET_P2TR_ACCOUNTS, DEFAULT_BITCOIN_MAINNET_P2WPKH_ACCOUNTS, DEFAULT_BITCOIN_MAINNET_P2WSH_ACCOUNTS, DEFAULT_BITCOIN_REGTEST_P2PKH_ACCOUNTS, DEFAULT_BITCOIN_REGTEST_P2SH_ACCOUNTS, DEFAULT_BITCOIN_REGTEST_P2TR_ACCOUNTS, DEFAULT_BITCOIN_REGTEST_P2WPKH_ACCOUNTS, DEFAULT_BITCOIN_REGTEST_P2WSH_ACCOUNTS, DEFAULT_BITCOIN_SIGNET_P2PKH_ACCOUNTS, DEFAULT_BITCOIN_SIGNET_P2SH_ACCOUNTS, DEFAULT_BITCOIN_SIGNET_P2TR_ACCOUNTS, DEFAULT_BITCOIN_SIGNET_P2WPKH_ACCOUNTS, DEFAULT_BITCOIN_SIGNET_P2WSH_ACCOUNTS, DEFAULT_BITCOIN_TESTNET_P2PKH_ACCOUNTS, DEFAULT_BITCOIN_TESTNET_P2SH_ACCOUNTS, DEFAULT_BITCOIN_TESTNET_P2TR_ACCOUNTS, DEFAULT_BITCOIN_TESTNET_P2WPKH_ACCOUNTS, DEFAULT_BITCOIN_TESTNET_P2WSH_ACCOUNTS, DEFAULT_COSMOS_ACCOUNTS, DEFAULT_DOGE_MAINNET_ACCOUNTS, DEFAULT_DOGE_TESTNET_ACCOUNTS, DEFAULT_ETHEREUM_ACCOUNTS, DEFAULT_SEI_ACCOUNTS, DEFAULT_SOLANA_ACCOUNTS, DEFAULT_SUI_ACCOUNTS, DEFAULT_TON_V3R2_ACCOUNTS, DEFAULT_TON_V4R2_ACCOUNTS, DEFAULT_TRON_ACCOUNTS, DEFAULT_XLM_ACCOUNTS, defaultAptosAccountAtIndex, defaultBitcoinMainnetP2PKHAccountAtIndex, defaultBitcoinMainnetP2SHAccountAtIndex, defaultBitcoinMainnetP2TRAccountAtIndex, defaultBitcoinMainnetP2WPKHAccountAtIndex, defaultBitcoinMainnetP2WSHAccountAtIndex, defaultBitcoinRegtestP2PKHAccountAtIndex, defaultBitcoinRegtestP2SHAccountAtIndex, defaultBitcoinRegtestP2TRAccountAtIndex, defaultBitcoinRegtestP2WPKHAccountAtIndex, defaultBitcoinRegtestP2WSHAccountAtIndex, defaultBitcoinSignetP2PKHAccountAtIndex, defaultBitcoinSignetP2SHAccountAtIndex, defaultBitcoinSignetP2TRAccountAtIndex, defaultBitcoinSignetP2WPKHAccountAtIndex, defaultBitcoinSignetP2WSHAccountAtIndex, defaultBitcoinTestnetP2PKHAccountAtIndex, defaultBitcoinTestnetP2SHAccountAtIndex, defaultBitcoinTestnetP2TRAccountAtIndex, defaultBitcoinTestnetP2WPKHAccountAtIndex, defaultBitcoinTestnetP2WSHAccountAtIndex, defaultCosmosAccountAtIndex, defaultDogeMainnetAccountAtIndex, defaultDogeTestnetAccountAtIndex, defaultEthereumAccountAtIndex, defaultSeiAccountAtIndex, defaultSolanaAccountAtIndex, defaultSuiAccountAtIndex, defaultTonV3r2AccountAtIndex, defaultTonV4r2AccountAtIndex, defaultTronAccountAtIndex, defaultXlmAccountAtIndex, defaultXrpAccountAtIndex };
//# sourceMappingURL=turnkey-helpers.mjs.map
