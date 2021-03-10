import { TransactionController } from "../controllers/transactionController";
import { Request, Response } from 'express';

export class Routes {
    public transactionController: TransactionController = new TransactionController();
    public setRoutes(app) {
        app.use((req: Request, res: Response, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
          });

        app.route("/")
        .get((req: Request, res: Response) => {
            res.status(200).send({
                message: "GET request successfulll!!!!"
            });
        });
        app.route('/transactions')
        .get(this.transactionController.getTransactions);

        app.route('/transaction')
        .get(this.transactionController.getTransaction);
        
        app.route('/transaction')
        .post(this.transactionController.addTransaction);

        app.route('/transaction')
        .put(this.transactionController.editTransaction);

        app.route('/transaction')
        .delete(this.transactionController.deleteTransaction)
    }
}