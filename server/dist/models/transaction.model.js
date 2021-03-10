"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionDetails = void 0;
class TransactionDetails {
    constructor() {
        this.transactions = [];
        this.populateCachedTransactions();
    }
    addTransaction(data) {
        this.transactions.push(data);
    }
    editTransaction(data) {
        const index = this.transactions.findIndex(({ ID }) => ID === data.ID);
        this.transactions[index] = data;
    }
    deleteTransaction(id) {
        const index = this.transactions.findIndex(({ ID }) => ID === id);
        this.transactions.splice(index, 1);
    }
    getTransaction(id) {
        const index = this.transactions.findIndex(({ ID }) => ID === id);
        return this.transactions[index];
    }
    getTransactions() {
        return this.transactions;
    }
    static getTransactionInstance() {
        if (!TransactionDetails.instance) {
            TransactionDetails.instance = new TransactionDetails();
        }
        return TransactionDetails.instance;
    }
    populateCachedTransactions() {
        let data = [{
                ID: '1e8514d1-6393-4845-ba10-33b19236d5dd',
                AccountHolder: 'Maria',
                IBAN: 'DE12500105170648489890',
                Amount: 676,
                Date: new Date(2020, 12, 5)
            },
            {
                ID: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
                AccountHolder: 'Richard',
                IBAN: 'NL87RABO8818556967',
                Amount: 356.44,
                Date: new Date()
            },
            {
                ID: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d4b6d',
                AccountHolder: 'Marie',
                IBAN: 'JO82GTBF6298956871824273133669',
                Amount: 746.67,
                Date: new Date()
            },
            {
                ID: '9b1deb4d-3b7d-4bad-9bdd-2b2d7b3dcb6d',
                AccountHolder: 'Smith',
                IBAN: 'DE25500105171548775174',
                Amount: 64,
                Date: new Date()
            },
            {
                ID: '9b1deb4d-3b7d-4bad-97dd-2b0d7b3dcb6d',
                AccountHolder: 'Doe',
                IBAN: 'DE12500105172993818358',
                Amount: 64.33,
                Date: new Date()
            }
        ];
        this.transactions = data;
    }
}
exports.TransactionDetails = TransactionDetails;
//# sourceMappingURL=transaction.model.js.map