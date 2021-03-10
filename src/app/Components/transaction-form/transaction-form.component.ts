import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ValidatorService } from 'angular-iban';
import { Transaction } from 'server/src/models/transaction.model';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  @Input('Transaction') transaction: Transaction;
  @Output('OnSubmit') onSubmit: EventEmitter<Transaction>;
  formGroup: FormGroup;
  minDate = new Date();

  constructor(private formBuilder: FormBuilder) {
    this.onSubmit = new EventEmitter<Transaction>();
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    let regex: RegExp = /^-?\d{1,3}(?:\.\d{3})*(?:,\d+)?$/
    this.formGroup = this.formBuilder.group({
      'ID': [null],
      'AccountHolder': [null, Validators.required],
      'IBAN': [null, [Validators.required, ValidatorService.validateIban]],
      'Amount': [null, [Validators.required, Validators.minLength(2),
      Validators.pattern(regex), this.currencyValidator]],
      'Date': [new Date(), [Validators.required]],
      'Note': [null]
    });
    if (this.transaction) {
      this.formGroup.get('ID').disable();
      this.setFormData();
    }
  }
  setFormData() {
    this.formGroup.controls.ID.setValue(this.transaction.ID);
    this.formGroup.controls.AccountHolder.setValue(this.transaction.AccountHolder);
    this.formGroup.controls.IBAN.setValue(this.transaction.IBAN);
    this.formGroup.controls.Date.setValue(this.transaction.Date);
    this.formGroup.controls.Amount.setValue(this.transaction.Amount);
    this.formGroup.controls.Note.setValue(this.transaction.Note);
  }
  getIBANError() {
    return this.formGroup.get('IBAN').hasError('required') ? 'IBAN is required' :
      this.formGroup.get('IBAN').hasError('iban') ? 'Not a valid IBAN' : '';

  }
  getAmountError() {
    return this.formGroup.get('Amount').hasError('required') ? 'Amount is required' :
      this.formGroup.get('Amount').hasError('pattern') ? 'Invalid currency amount' :
        this.formGroup.get('Amount').hasError('maxCustomLength') ? 'Maximum length should be 8 characters' :
          this.formGroup.get('Amount').hasError('maxValue') ? 'Maximum transaction amount should not exceed 20.000.000' :
            this.formGroup.get('Amount').hasError('minValue') ? 'Minimun transaction amount should be 50' : '';
  }
  getDateError() {
    return this.formGroup.get('Date').hasError('required') ? 'Date is required' : '';
  }
  currencyValidator(control: AbstractControl): { [key: string]: boolean } | null {
    let currencyValue = control.value;
    if (currencyValue !== null && isNaN(currencyValue)) {
      if (parseFloat(currencyValue.replace(/\./g, '').replace(',', '.')) < 50)
        return { 'minValue': true };
      else if (currencyValue.replace(/\./g, '').replace(',', '').length > 8)
        return { 'maxCustomLength': true };
      else if (parseFloat(currencyValue.replace(/\./g, '').replace(',', '.')) > 20000000)
        return { 'maxValue': true };
    }
    return null;
  }
  dateChangeHandler(type: string, event: MatDatepickerInputEvent<Date>) {
  }
  onFormSubmit(post) {
    let data: Transaction = this.formGroup.value;
    let amount = this.formGroup.value.Amount;
    data.Amount = parseFloat(amount.toString().replace(/\./g, '').replace(',', '.'));
    data.ID = this.transaction && this.transaction.ID ? this.transaction.ID : uuidv4();
    this.onSubmit.emit(data);
  }



}
