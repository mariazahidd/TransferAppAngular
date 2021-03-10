"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_model_1 = require("../models/transaction.model");
class TransactionController {
    getTransactions(req, res) {
        res.json(transaction_model_1.TransactionDetails.getTransactionInstance().getTransactions());
    }
    getTransaction(req, res) {
        let id = req.query.ID.toString();
        res.json(transaction_model_1.TransactionDetails.getTransactionInstance().getTransaction(id));
    }
    addTransaction(req, res) {
        let transaction = req.body;
        transaction_model_1.TransactionDetails.getTransactionInstance().addTransaction(transaction);
        res.send(true);
    }
    editTransaction(req, res) {
        let transaction = req.body;
        transaction_model_1.TransactionDetails.getTransactionInstance().editTransaction(transaction);
        res.send(true);
    }
    deleteTransaction(req, res) {
        let id = req.query.ID.toString();
        transaction_model_1.TransactionDetails.getTransactionInstance().deleteTransaction(id);
        res.send(true);
    }
}
exports.TransactionController = TransactionController;
//# sourceMappingURL=transactionController.js.map