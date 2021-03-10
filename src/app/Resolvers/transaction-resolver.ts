import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { Transaction } from "server/src/models/transaction.model";
import { TransactionService } from "../Services/transaction.service";

@Injectable({
    providedIn: 'root'
  })
export class TransactionResolver implements Resolve<Transaction>{
    constructor(private transactionService: TransactionService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Transaction> {
        let id = route.paramMap.get('id');
        return this.transactionService.getTransaction(id);       
    }
}
