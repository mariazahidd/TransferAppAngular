import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransactionService } from './transaction.service';
import { Transaction } from 'server/src/models/transaction.model';
import { transition } from '@angular/animations';

describe('TransactionServiceService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService]
    }).compileComponents();
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('be able to retrieve transactions from the API getAllTransactions', () => {
    const dummyPosts: Transaction[] = [{
      ID: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3d4b6d',
      AccountHolder: 'Marie',
      IBAN: 'DE12500105170618489892',
      Amount: 654654,
      Date: new Date()
    },
    {
      ID: '9b1deb4d-3b7d-4bad-9bdd-2b2d7b3dcb6d',
      AccountHolder: 'Smith',
      IBAN: 'DE12500103170648489892',
      Amount: 65654,
      Date: new Date()
    }];
    service.getAllTransactions().subscribe(transitions => {
      expect(transitions.length).toBe(2);
      expect(transitions).toEqual(dummyPosts);
    });
    const request = httpMock.expectOne('http://localhost:3000/transactions');
    expect(request.request.method).toBe('GET');
    request.flush(dummyPosts);
  });



});
