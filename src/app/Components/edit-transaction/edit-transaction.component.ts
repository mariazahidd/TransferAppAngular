import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'server/src/models/transaction.model';
import { TransactionService } from 'src/app/Services/transaction.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  transaction: Transaction;
  constructor(private route: ActivatedRoute, private router: Router, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { TransactionResolver: Transaction }) => {
        this.transaction = data.TransactionResolver;
      })
  }
  editTransaction(data: Transaction) {
    this.transactionService.editTransaction(data).subscribe((response) => {
      if (response) {
        this.router.navigate(['/']);
      }
    });
  }

}
