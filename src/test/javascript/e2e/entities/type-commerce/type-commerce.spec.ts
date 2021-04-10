import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TypeCommerceComponentsPage, TypeCommerceDeleteDialog, TypeCommerceUpdatePage } from './type-commerce.page-object';

const expect = chai.expect;

describe('TypeCommerce e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let typeCommerceComponentsPage: TypeCommerceComponentsPage;
  let typeCommerceUpdatePage: TypeCommerceUpdatePage;
  let typeCommerceDeleteDialog: TypeCommerceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TypeCommerces', async () => {
    await navBarPage.goToEntity('type-commerce');
    typeCommerceComponentsPage = new TypeCommerceComponentsPage();
    await browser.wait(ec.visibilityOf(typeCommerceComponentsPage.title), 5000);
    expect(await typeCommerceComponentsPage.getTitle()).to.eq('coopcycleApp.typeCommerce.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(typeCommerceComponentsPage.entities), ec.visibilityOf(typeCommerceComponentsPage.noResult)),
      1000
    );
  });

  it('should load create TypeCommerce page', async () => {
    await typeCommerceComponentsPage.clickOnCreateButton();
    typeCommerceUpdatePage = new TypeCommerceUpdatePage();
    expect(await typeCommerceUpdatePage.getPageTitle()).to.eq('coopcycleApp.typeCommerce.home.createOrEditLabel');
    await typeCommerceUpdatePage.cancel();
  });

  it('should create and save TypeCommerces', async () => {
    const nbButtonsBeforeCreate = await typeCommerceComponentsPage.countDeleteButtons();

    await typeCommerceComponentsPage.clickOnCreateButton();

    await promise.all([typeCommerceUpdatePage.setNomInput('nom')]);

    expect(await typeCommerceUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');

    await typeCommerceUpdatePage.save();
    expect(await typeCommerceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await typeCommerceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last TypeCommerce', async () => {
    const nbButtonsBeforeDelete = await typeCommerceComponentsPage.countDeleteButtons();
    await typeCommerceComponentsPage.clickOnLastDeleteButton();

    typeCommerceDeleteDialog = new TypeCommerceDeleteDialog();
    expect(await typeCommerceDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.typeCommerce.delete.question');
    await typeCommerceDeleteDialog.clickOnConfirmButton();

    expect(await typeCommerceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
