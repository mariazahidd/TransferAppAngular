export interface Transaction {
    ID: string;
    AccountHolder: string
    IBAN: string;
    Amount: number;
    Date: Date;
    Note?: string;
}

export class TransactionDetails {
    private transactions: Array<Transaction>;
    private static instance: TransactionDetails;
    private constructor() {
        this.transactions = [];
        this.populateCachedTransactions();
    }
    public addTransaction(data: Transaction) {
        this.transactions.push(data);
    }
    public editTransaction(data: Transaction) {
        const index = this.transactions.findIndex(({ID}) => ID === data.ID);
        this.transactions[index] = data;
    }
    public deleteTransaction(id: string) {
        const index = this.transactions.findIndex(({ID}) => ID === id);
        this.transactions.splice(index, 1);
    }
    public getTransaction(id: string): Transaction {
        const index = this.transactions.findIndex(({ID}) => ID === id);
        return this.transactions[index];
    }
    public getTransactions(): Array<Transaction> {
        return this.transactions;
    }

    public static getTransactionInstance(): TransactionDetails {
        if (!TransactionDetails.instance) {
            TransactionDetails.instance = new TransactionDetails()
        }
        return TransactionDetails.instance
    }
    private populateCachedTransactions() {
        let data: Array<Transaction> = [{
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




