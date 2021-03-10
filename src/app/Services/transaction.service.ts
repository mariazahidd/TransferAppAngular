import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Transaction } from 'server/src/models/transaction.model';


@Injectable()
export class TransactionService {
  private baseUrl: string = 'http://localhost:3000/';
  private transactionsList: Array<Transaction>;

  constructor(private http: HttpClient) {
    this.transactionsList = [];
  }
  getAllTransactions(): Observable<Array<Transaction>> {
    // if (this.transactionsList.length > 0) {
    //   return of(this.transactionsList);
    // }
    // else {
      return this.http.get(`${this.baseUrl}transactions`)
        .pipe(
          map((data: Array<Transaction>) => {
            this.transactionsList = data;
            return this.transactionsList;
          }));
   // }


  }
  public createTransaction(data: Transaction): Observable<any> {
    let transaction: Transaction = data;

    //transaction.ID = uuidv4();
    this.transactionsList.push(transaction);
    return this.http.post(`${this.baseUrl}transaction`, data);
  }
  public getTransaction(id: string): Observable<any> {
    let httpParams = new HttpParams().set('ID', id);
    let options = { params: httpParams };
    return this.http.get(`${this.baseUrl}transaction`, options);
  }

  public editTransaction(data: Transaction) {
    return this.http.put(`${this.baseUrl}transaction`, data);
  }

  public deleteTransaction(id: string) {
    let httpParams = new HttpParams().set('ID', id);
    let options = { params: httpParams };
    return this.http.delete(`${this.baseUrl}transaction`, options);
  }
}
