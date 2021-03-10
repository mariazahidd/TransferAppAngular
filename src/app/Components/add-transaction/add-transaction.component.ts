import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'server/src/models/transaction.model';
import { TransactionService } from 'src/app/Services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {
  constructor(private router: Router, private transactionService: TransactionService) { }

  ngOnInit(): void {
  }
  addTransaction(data: Transaction) {
    this.transactionService.createTransaction(data).subscribe((response) => {
      if (response) {
        this.router.navigate(['/'])
      }
    });
  }

}
