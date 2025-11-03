import { proxy, snapshot } from 'valtio/vanilla';
import { subscribeKey as subKey } from 'valtio/vanilla/utils';
import { AccountController } from './AccountController.js';
import { ChainController } from './ChainController.js';
import { ConnectorController } from './ConnectorController.js';
import { ModalController } from './ModalController.js';
import { OptionsController } from './OptionsController.js';
// -- State --------------------------------------------- //
const state = proxy({
    view: 'Connect',
    history: ['Connect'],
    transactionStack: []
});
// -- Controller ---------------------------------------- //
export const RouterController = {
    state,
    subscribeKey(key, callback) {
        return subKey(state, key, callback);
    },
    pushTransactionStack(action) {
        state.transactionStack.push(action);
    },
    popTransactionStack(cancel) {
        const action = state.transactionStack.pop();
        if (!action) {
            return;
        }
        if (cancel) {
            // When the transaction is cancelled, we go back to the previous view
            this.goBack();
            action?.onCancel?.();
        }
        else {
            // When the transaction is successful, we do conditional navigation depending on the action properties
            if (action.goBack) {
                this.goBack();
            }
            else if (action.replace) {
                /*
                 *  If the history like ["ConnectingSiwe", "ApproveTransaction"], this means SIWE popup is opened after page rendered (not after user interaction)
                 *  we need to conditionally call replace.
                 *  There is a chance that there is only these two views in the history; when user approved, the modal should closed and history should be empty (both connectingsiwe and approveTX should be removed)
                 *  If there is another views before the ConnectingSiwe (if the CS is not the first view), we should back to the first view before CS.
                 */
                const history = state.history;
                const connectingSiweIndex = history.indexOf('ConnectingSiwe');
                if (connectingSiweIndex > 0) {
                    // There are views before ConnectingSiwe
                    this.goBackToIndex(connectingSiweIndex - 1);
                }
                else {
                    // ConnectingSiwe is the first view
                    ModalController.close();
                    state.history = [];
                }
            }
            else if (action.view) {
                this.reset(action.view);
            }
            action?.onSuccess?.();
        }
    },
    push(view, data) {
        if (view !== state.view) {
            state.view = view;
            state.history.push(view);
            state.data = data;
        }
    },
    reset(view, data) {
        state.view = view;
        state.history = [view];
        state.data = data;
    },
    replace(view, data) {
        const lastView = state.history.at(-1);
        const isSameView = lastView === view;
        if (!isSameView) {
            state.view = view;
            state.history[state.history.length - 1] = view;
            state.data = data;
        }
    },
    goBack() {
        const shouldReload = !ChainController.state.activeCaipAddress && this.state.view === 'ConnectingFarcaster';
        if (state.history.length > 1 && !state.history.includes('UnsupportedChain')) {
            state.history.pop();
            const [last] = state.history.slice(-1);
            if (last) {
                state.view = last;
            }
        }
        else {
            ModalController.close();
        }
        if (state.data?.wallet) {
            state.data.wallet = undefined;
        }
        // Reloading the iframe contentwindow and doing the view animation in the modal causes a small freeze in the transition. Doing these separately fixes that.
        setTimeout(() => {
            if (shouldReload) {
                AccountController.setFarcasterUrl(undefined, ChainController.state.activeChain);
                const authConnector = ConnectorController.getAuthConnector();
                authConnector?.provider?.reload();
                const optionsState = snapshot(OptionsController.state);
                authConnector?.provider?.syncDappData?.({
                    metadata: optionsState.metadata,
                    sdkVersion: optionsState.sdkVersion,
                    projectId: optionsState.projectId,
                    sdkType: optionsState.sdkType
                });
            }
        }, 100);
    },
    goBackToIndex(historyIndex) {
        if (state.history.length > 1) {
            state.history = state.history.slice(0, historyIndex + 1);
            const [last] = state.history.slice(-1);
            if (last) {
                state.view = last;
            }
        }
    }
};
//# sourceMappingURL=RouterController.js.map