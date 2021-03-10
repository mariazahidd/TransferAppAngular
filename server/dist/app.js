"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const transactionRoutes_1 = require("./routes/transactionRoutes");
class App {
    constructor() {
        this.routes = new transactionRoutes_1.Routes();
        this.express = express_1.default();
        this.express.use(express_1.default.json());
        this.express.use(cors_1.default());
        this.routes.setRoutes(this.express);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map