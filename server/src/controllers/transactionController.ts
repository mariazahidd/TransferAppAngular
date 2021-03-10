import { Request, Response } from 'express';
import { Transaction, TransactionDetails } from '../models/transaction.model';

export class TransactionController {

    public getTransactions(req: Request, res: Response) {
        res.json(TransactionDetails.getTransactionInstance().getTransactions());
    }
    public getTransaction(req: Request, res: Response) {
        let id: string = req.query.ID.toString();
        res.json(TransactionDetails.getTransactionInstance().getTransaction(id));
    }
    public addTransaction(req: Request, res: Response) {
        let transaction: Transaction = req.body;
        TransactionDetails.getTransactionInstance().addTransaction(transaction);
        res.send(true);
    }
    public editTransaction(req: Request, res: Response) {
        let transaction: Transaction = req.body;
        TransactionDetails.getTransactionInstance().editTransaction(transaction);
        res.send(true);
    }
    public deleteTransaction(req: Request, res: Response) {
        let id: string = req.query.ID.toString();
        TransactionDetails.getTransactionInstance().deleteTransaction(id);
        res.send(true);
    }
}