import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITypeCommerce } from 'app/shared/model/type-commerce.model';
import { TypeCommerceService } from './type-commerce.service';

@Component({
  templateUrl: './type-commerce-delete-dialog.component.html',
})
export class TypeCommerceDeleteDialogComponent {
  typeCommerce?: ITypeCommerce;

  constructor(
    protected typeCommerceService: TypeCommerceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.typeCommerceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('typeCommerceListModification');
      this.activeModal.close();
    });
  }
}
