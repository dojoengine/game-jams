/**
 * Setups controller options:
 * https://docs.cartridge.gg/controller/getting-started
 *
 * This example uses Katana for local host development.
 */
import manifest from '../contracts/manifest_dev.json' assert { type: 'json' };

const actionsContract = manifest.contracts.find((contract) => contract.tag === 'witch_or_treat-actions');
const VRF_PROVIDER_ADDRESS = '0x15f542e25a4ce31481f986888c179b6e57412be340b8095f72f75a328fbb27b';

const controllerOpts = {
  chains: [{ rpcUrl: 'http://localhost:5050' }],
  // "KATANA"
  defaultChainId: '0x4b4154414e41',
  policies: {
    contracts: {
      [actionsContract.address]: {
        name: 'Actions',
        description: 'Actions contract to control game activities',
        methods: [
          {
            name: 'Treat_Generator',
            entrypoint: 'treat_generator',
            description: 'Generate treats for each house in the game',
          },
          {
            name: 'Potion_Brewery',
            entrypoint: 'potion_brewery',
            description: 'Brew potions/ power-ups in the game',
          },
          {
            name: 'Guzzle_Potion',
            entrypoint: 'guzzle_potion',
            description: 'Allows the player to consume a potion in the game',
          },
          {
            name: 'Gameover',
            entrypoint: 'gameover',
            description: 'Ends the game on activation a curse and administers punishment',
          },
        ],
      },
      [VRF_PROVIDER_ADDRESS]: {
        methods: [{ entrypoint: 'request_random' }],
      },
    },
  },
};

export default controllerOpts;
