import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getMainHeading(): Promise<string> {
    return element(by.tagName('h3')).getText() as Promise<string>;
  }

  navigateToCreateTransactionPage(): Promise<any> {
    return element(by.buttonText('Add')).click() as Promise<any>;
  }

  getAllTransactions(): Promise<number> {
    return element.all(by.tagName('mat-row')).count() as Promise<number>;
  }

  clickEditButton(): Promise<any> {
    let firstTransaction = element.all(by.tagName('mat-row')).first();   
    return firstTransaction.element(by.css('.mat-column-update')).click() as Promise<any>;
  }

  applySearchFilter(): Promise<any> {
    element(by.css('.mat-input-element')).sendKeys('Maria');
    return element.all(by.tagName('mat-row')).count() as Promise<any>;
  }
}
