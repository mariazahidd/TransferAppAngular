import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Transaction } from 'server/src/models/transaction.model';
import { TransactionService } from 'src/app/Services/transaction.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TransactionsTableDataSource } from './transactions-table-datasource';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.css']
})
export class TransactionsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Transaction>;

  dataSource: TransactionsTableDataSource;
  displayedColumns = ['AccountHolder', 'IBAN', 'Amount', 'Date', 'Note', 'update', 'delete'];
  private serviceSubscribe: Subscription;

  constructor(private router: Router, private transactionService: TransactionService, 
    private dialog: MatDialog, private snackBar: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataSource = new TransactionsTableDataSource(this.transactionService); 
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.serviceSubscribe = this.dataSource.transactions$.subscribe(res => {
      if(res) {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = res;
        this.table.dataSource = this.dataSource;
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter(filterValue.trim().toLowerCase());
  }
  redirectToAdd() {
    this.router.navigate(['/transactions/add'])
  }
  redirectToUpdate(id: string) {
    this.router.navigate(['/transactions', id, 'edit'])
  }
  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id).subscribe((response) => {
      if (response) {
        this.dataSource.delete(id); 
      }
    })
  }
  openDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const a = document.createElement('a');
        a.click();
        a.remove();
        this.deleteTransaction(id);
        this.snackBar.open('Deleting Transaction', '', {
          duration: 2000,
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}
