import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'angular-iban';
import { MockTransactionService } from 'src/app/Services/mock-transaction.service';

import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;
  let formBuilder: FormBuilder
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder],
      declarations: [TransactionFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFormComponent);
    formBuilder = TestBed.get(FormBuilder)
    component = fixture.componentInstance;
    component.formGroup = formBuilder.group({
      'ID': [null],
      'AccountHolder': [null, Validators.required],
      'IBAN': [null, [Validators.required, ValidatorService.validateIban]],
      'Amount': [null, [Validators.required, Validators.minLength(2), component.currencyValidator]],
      'Date': [null, [Validators.required]],
      'Note': [null]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });


  it('Invalid IBAN should cause IBAN validity to false', () => {
    const IBAN = 'D1250010517064848';
    component.formGroup.controls.IBAN.setValue(IBAN);
    expect(component.formGroup.controls.IBAN.valid).toBe(false);
  });

  it('Valid IBAN should cause IBAN validity to true', () => {
    const IBAN = 'DE12500105170648489890';
    component.formGroup.controls.IBAN.setValue(IBAN);
    expect(component.formGroup.controls['IBAN'].valid).toBe(true);
  });

  it('AccountHolder field validity', () => {
    let accountHolder = component.formGroup.controls['AccountHolder'];
    expect(accountHolder.valid).toBeFalsy();

    accountHolder.setValue("");
    expect(accountHolder.hasError('required')).toBeTruthy();
  });

  it('Amount field validity', () => {
    const amount = component.formGroup.controls['Amount'];
    expect(amount.valid).toBeFalsy();

    amount.setValue("");
    expect(amount.hasError('required')).toBeTruthy();
  });

  it('should return true if the form is valid', () => {
    component.transaction = {
      ID: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d4b6d',
      AccountHolder: 'Marie',
      IBAN: 'DE12500105170648489890',
      Amount: 65.00,
      Date: new Date()
    };
    component.formGroup.controls.ID.setValue(component.transaction.ID);
    component.formGroup.controls.AccountHolder.setValue(component.transaction.AccountHolder);
    component.formGroup.controls.IBAN.setValue(component.transaction.IBAN);
    component.formGroup.controls.Date.setValue(component.transaction.Date);
    component.formGroup.controls.Amount.setValue(component.transaction.Amount);
    component.formGroup.controls.Note.setValue(component.transaction.Note);
    expect(component.formGroup.valid).toBe(true);
  });
});
