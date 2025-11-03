import { deposit, } from '../actions/deposit.js';
import { finalizeWithdrawal, } from '../actions/finalizeWithdrawal.js';
import { requestExecute, } from '../actions/requestExecute.js';
export function walletActionsL1() {
    return (client) => ({
        deposit: (args) => deposit(client, args),
        finalizeWithdrawal: (args) => finalizeWithdrawal(client, args),
        requestExecute: (args) => requestExecute(client, args),
    });
}
//# sourceMappingURL=walletL1.js.map