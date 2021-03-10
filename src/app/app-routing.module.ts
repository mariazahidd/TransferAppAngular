import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTransactionComponent } from './Components/add-transaction/add-transaction.component';
import { EditTransactionComponent } from './Components/edit-transaction/edit-transaction.component';
import { TransactionHomeComponent } from './Components/transaction-home/transaction-home.component';
import { TransactionResolver } from './Resolvers/transaction-resolver';


const routes: Routes = [
  {
    path: '', redirectTo: '/transactions', pathMatch: 'full'
  },
  {
    path: 'transactions' ,
    children: [
      { path: '', component: TransactionHomeComponent },

      {
        path: 'add', component: AddTransactionComponent,
      },
      {
        path: ':id', 
        resolve: { TransactionResolver },
        children: [
          {
            path: 'edit', component: EditTransactionComponent
          }
        ]
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
