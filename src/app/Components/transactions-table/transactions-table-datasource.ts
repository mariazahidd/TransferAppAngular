import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, filter } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { Transaction } from 'server/src/models/transaction.model';
import { TransactionService } from 'src/app/Services/transaction.service';

export class TransactionsTableDataSource extends DataSource<Transaction> {
  data: Transaction[] = [];
  transactions$: BehaviorSubject<Transaction[]>;
  paginator: MatPaginator;
  sort: MatSort;
  private filter$ = new BehaviorSubject({ searchTerm: null })
 
  constructor(private transactionService: TransactionService) {
    super();
    this.transactions$ = new BehaviorSubject(null);
  }

  connect(): Observable<Transaction[]> {
    const dataMutations = [
      this.transactionService.getAllTransactions().pipe(map((data: Array<Transaction>) => {
        this.data = data;
        return data;
      })),
      this.paginator.page,
      this.sort.sortChange,
      this.filter$
    ];
    return merge(...dataMutations).pipe(
      map((data) => {
        return this.getPagedData(this.getSortedData(this.applyFilter([...this.data], data['searchTerm'])));
      }),
    );
  }

  public delete(id: string) {
    const itemIndex = this.data.findIndex(({ ID }) => ID === id);
    this.data.splice(itemIndex, 1);
    this.transactions$.next(this.data);
  }

  public filter(filterValue: string) {
    let searchText = filterValue.toLowerCase();
    this.filter$.next({ searchTerm: searchText });
  }
  private applyFilter(data: Transaction[], filterValue: string) {
    if (!filterValue) {
      return data;
    }
    return data.filter((transactionData: Transaction) => {
      return (transactionData.AccountHolder.toLowerCase().includes(filterValue)
        || (transactionData.Note != undefined && transactionData.Note.toLowerCase().includes(filterValue)));
    });
  }

  disconnect() { }

  private getPagedData(data: Transaction[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Transaction[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'AccountHolder': return compare(a.AccountHolder, b.AccountHolder, isAsc);
        case 'IBAN': return compare(a.IBAN, b.IBAN, isAsc);
        case 'Amount': return compare(a.Amount, b.Amount, isAsc);
        case 'Note': return compare(a.Note, b.Note, isAsc);
        case 'Date': return compareDates(a.Date, b.Date, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
function compareDates(a: Date | string, b: Date | string, isAsc: boolean) {
  return (new Date(a).getTime() < new Date(b).getTime() ? -1 : 1) * (isAsc ? 1 : -1);
}
