import { TransactionResolver } from './transaction-resolver';

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TransactionService } from '../Services/transaction.service';
import { MockTransactionService } from '../Services/mock-transaction.service';



describe('TransactionResolver', () => {
  let resolver: TransactionResolver;
  let transactionService: MockTransactionService;
  let route: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: TransactionService, useClass: MockTransactionService },
      ]
    });

    route = new ActivatedRouteSnapshot();   
    transactionService = TestBed.inject(TransactionService);
    resolver = TestBed.inject(TransactionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve when token is available', () => {
    resolver.resolve(route).subscribe(resolved => {
      expect(resolved).toBeTruthy();
    });

  })


});