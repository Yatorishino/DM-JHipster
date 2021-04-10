import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AvisComponentsPage, AvisDeleteDialog, AvisUpdatePage } from './avis.page-object';

const expect = chai.expect;

describe('Avis e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let avisComponentsPage: AvisComponentsPage;
  let avisUpdatePage: AvisUpdatePage;
  let avisDeleteDialog: AvisDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Avis', async () => {
    await navBarPage.goToEntity('avis');
    avisComponentsPage = new AvisComponentsPage();
    await browser.wait(ec.visibilityOf(avisComponentsPage.title), 5000);
    expect(await avisComponentsPage.getTitle()).to.eq('coopcycleApp.avis.home.title');
    await browser.wait(ec.or(ec.visibilityOf(avisComponentsPage.entities), ec.visibilityOf(avisComponentsPage.noResult)), 1000);
  });

  it('should load create Avis page', async () => {
    await avisComponentsPage.clickOnCreateButton();
    avisUpdatePage = new AvisUpdatePage();
    expect(await avisUpdatePage.getPageTitle()).to.eq('coopcycleApp.avis.home.createOrEditLabel');
    await avisUpdatePage.cancel();
  });

  it('should create and save Avis', async () => {
    const nbButtonsBeforeCreate = await avisComponentsPage.countDeleteButtons();

    await avisComponentsPage.clickOnCreateButton();

    await promise.all([
      avisUpdatePage.setNoteInput('5'),
      avisUpdatePage.setDescriptionInput('description'),
      avisUpdatePage.courseSelectLastOption(),
    ]);

    expect(await avisUpdatePage.getNoteInput()).to.eq('5', 'Expected note value to be equals to 5');
    expect(await avisUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await avisUpdatePage.save();
    expect(await avisUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await avisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Avis', async () => {
    const nbButtonsBeforeDelete = await avisComponentsPage.countDeleteButtons();
    await avisComponentsPage.clickOnLastDeleteButton();

    avisDeleteDialog = new AvisDeleteDialog();
    expect(await avisDeleteDialog.getDialogTitle()).to.eq('coopcycleApp.avis.delete.question');
    await avisDeleteDialog.clickOnConfirmButton();

    expect(await avisComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
