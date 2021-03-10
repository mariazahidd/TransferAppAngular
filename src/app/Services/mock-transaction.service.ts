import { Observer } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { Transaction } from "server/src/models/transaction.model";

const mockData: Transaction[] = [{
  ID: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d4b6d',
  AccountHolder: 'Marie',
  IBAN: 'DE12500105170618489892',
  Amount: 654654,
  Date: new Date()
},
{
  ID: '9b1deb4d-3b7d-4bad-9bdd-2b2d7b3dcb6d',
  AccountHolder: 'Smith',
  IBAN: 'DE12500103170648489892',
  Amount: 65654,
  Date: new Date()
}];
export class MockTransactionService {
  getAllTransactions() {
   
    return Observable.create((observer: Observer<Array<Transaction>>) => {
      observer.next(mockData);
    });
  }

  getTransaction(id: string): Observable<any> {
    return Observable.create((observer: Observer<Transaction>) => {
      observer.next(mockData[0]);
    });
  }

}
