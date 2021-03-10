import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Transactions Details heading', () => {
    page.navigateTo();
    expect(page.getMainHeading()).toEqual('Transactions Details');
  });

  it('should display 5 transactions', () => {
    page.navigateTo();
    expect(page.getAllTransactions()).toEqual(5);
  });

  it('should filter results', function() {
    page.navigateTo();
    expect(page.applySearchFilter()).toEqual(1);
  });

  it('should navigate to Create transaction page when Add button is clicked', () => {
    page.navigateTo();
    page.navigateToCreateTransactionPage();
    expect(page.getMainHeading()).toEqual('Create Transaction');
  });

  it('should navigate to Update transaction page of first transaction', () => {
    page.navigateTo();
    page.clickEditButton();
    expect(page.getMainHeading()).toEqual('Update Transaction');
  });


 

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
