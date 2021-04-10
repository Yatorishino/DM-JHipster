import { element, by, ElementFinder } from 'protractor';

export class RestaurantComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-restaurant div table .btn-danger'));
  title = element.all(by.css('jhi-restaurant div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class RestaurantUpdatePage {
  pageTitle = element(by.id('jhi-restaurant-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  adresseInput = element(by.id('field_adresse'));

  compteSelect = element(by.id('field_compte'));
  typeCommerceSelect = element(by.id('field_typeCommerce'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setAdresseInput(adresse: string): Promise<void> {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput(): Promise<string> {
    return await this.adresseInput.getAttribute('value');
  }

  async compteSelectLastOption(): Promise<void> {
    await this.compteSelect.all(by.tagName('option')).last().click();
  }

  async compteSelectOption(option: string): Promise<void> {
    await this.compteSelect.sendKeys(option);
  }

  getCompteSelect(): ElementFinder {
    return this.compteSelect;
  }

  async getCompteSelectedOption(): Promise<string> {
    return await this.compteSelect.element(by.css('option:checked')).getText();
  }

  async typeCommerceSelectLastOption(): Promise<void> {
    await this.typeCommerceSelect.all(by.tagName('option')).last().click();
  }

  async typeCommerceSelectOption(option: string): Promise<void> {
    await this.typeCommerceSelect.sendKeys(option);
  }

  getTypeCommerceSelect(): ElementFinder {
    return this.typeCommerceSelect;
  }

  async getTypeCommerceSelectedOption(): Promise<string> {
    return await this.typeCommerceSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class RestaurantDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-restaurant-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-restaurant'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
