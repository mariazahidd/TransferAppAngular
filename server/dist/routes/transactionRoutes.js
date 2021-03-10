"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const transactionController_1 = require("../controllers/transactionController");
class Routes {
    constructor() {
        this.transactionController = new transactionController_1.TransactionController();
    }
    setRoutes(app) {
        app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.route("/")
            .get((req, res) => {
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
            .delete(this.transactionController.deleteTransaction);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=transactionRoutes.js.map