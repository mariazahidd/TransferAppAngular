import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransactionHomeComponent } from './Components/transaction-home/transaction-home.component';
import { TransactionService } from './Services/transaction.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TransactionsTableComponent } from './Components/transactions-table/transactions-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { AddTransactionComponent } from './Components/add-transaction/add-transaction.component';
import { ConfirmationDialogComponent } from './Components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularIbanModule } from 'angular-iban';
import localeDe from '@angular/common/locales/de';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { registerLocaleData } from '@angular/common';
import { TransactionFormComponent } from './Components/transaction-form/transaction-form.component';
import { EditTransactionComponent } from './Components/edit-transaction/edit-transaction.component';
import { TransactionResolver } from './Resolvers/transaction-resolver';
import { MatNativeDateModule } from '@angular/material/core';


registerLocaleData(localeDe);
@NgModule({
  declarations: [
    AppComponent,
    TransactionHomeComponent,
    TransactionsTableComponent,
    AddTransactionComponent,
    ConfirmationDialogComponent,
    TransactionFormComponent,
    EditTransactionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    AngularIbanModule,
    FlexLayoutModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    TransactionService,
    TransactionResolver,
    { provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
