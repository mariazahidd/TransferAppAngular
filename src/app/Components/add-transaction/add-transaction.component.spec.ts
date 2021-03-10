import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Transaction } from 'server/src/models/transaction.model';
import { MockTransactionService } from 'src/app/Services/mock-transaction.service';
import { TransactionService } from 'src/app/Services/transaction.service';

import { AddTransactionComponent } from './add-transaction.component';

describe('AddTransactionComponent', () => {
  let component: AddTransactionComponent;
  let fixture: ComponentFixture<AddTransactionComponent>;
  let mockServiceInstance: MockTransactionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [AddTransactionComponent],
      providers: [{ provide: TransactionService, useClass: MockTransactionService }]
    })
    TestBed.compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddTransactionComponent);
        component = fixture.debugElement.componentInstance;
        mockServiceInstance = TestBed.get(TransactionService)
        fixture.detectChanges();
      });
  }));



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
