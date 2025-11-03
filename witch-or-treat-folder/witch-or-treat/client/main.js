import Controller from '@cartridge/controller';
import { init, ToriiQueryBuilder, KeysClause } from '@dojoengine/sdk';

import controllerOpts from './controller.js';
import { initGame, updateFromEntitiesData } from './game.js';

import manifest from '../contracts/manifest_dev.json' assert { type: 'json' };

      const DOMAIN_SEPERATOR = {
        name: 'witch_or_treat',
        version: '1.0',
        chainId: 'KATANA',
        revision: '1',
      };

      async function run(account) {
        const torii = await init({
          client: {
            worldAddress: manifest.world.address,
            toriiUrl: 'http://localhost:8080',
          },
          domain: DOMAIN_SEPERATOR,
        });

        initGame(account, manifest);

        // Subscribe to model updates
        const [_, subscription] = await torii.subscribeEntityQuery({
          query: new ToriiQueryBuilder().withClause(
            KeysClause(['witch_or_treat-PotionBar', 'witch_or_treat-TreatBag'], [account.address], 'FixedLen').build(),
          ),
          callback: ({ data, error }) => {
            if (data) {
              console.log('Received entity data update:', data);
              updateFromEntitiesData(data, account, manifest);
            }
            if (error) {
              console.error(error);
            }
          },
        });

        // Unsubscribe on window exit
        window.addEventListener('beforeunload', () => {
          if (subscription) {
            subscription.cancel();
          }
        });
      }

      const controller = new Controller(controllerOpts);

      document.getElementById('controller-button').onclick = async () => {
        try {
          let account = await controller.connect();

          document.getElementById('controller-button').textContent = 'Connected';
          document.getElementById('controller-button').style.backgroundColor = '#4CAF50';
          document.getElementById('play-button-centered').disabled = false;

          run(account).catch((error) => {
            console.error(error);
          });
        } catch (error) {
          console.error('Failed to connect:', error);
          document.getElementById('controller-button').textContent = 'Connection Failed';
          document.getElementById('controller-button').style.backgroundColor = '#f44336';
        }
      };