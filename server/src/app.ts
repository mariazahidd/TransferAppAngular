import express from 'express';
import cors from 'cors';
import { Routes } from './routes/transactionRoutes';

class App {
  public express;
  public routes: Routes = new Routes();

  constructor () {
    this.express = express();
    this.express.use(express.json());
    this.express.use(cors());
    this.routes.setRoutes(this.express);
  }
}

export default new App().express;