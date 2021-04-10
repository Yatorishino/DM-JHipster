import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITypeCommerce } from 'app/shared/model/type-commerce.model';
import { TypeCommerceService } from './type-commerce.service';
import { TypeCommerceDeleteDialogComponent } from './type-commerce-delete-dialog.component';

@Component({
  selector: 'jhi-type-commerce',
  templateUrl: './type-commerce.component.html',
})
export class TypeCommerceComponent implements OnInit, OnDestroy {
  typeCommerces?: ITypeCommerce[];
  eventSubscriber?: Subscription;

  constructor(
    protected typeCommerceService: TypeCommerceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.typeCommerceService.query().subscribe((res: HttpResponse<ITypeCommerce[]>) => (this.typeCommerces = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTypeCommerces();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITypeCommerce): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTypeCommerces(): void {
    this.eventSubscriber = this.eventManager.subscribe('typeCommerceListModification', () => this.loadAll());
  }

  delete(typeCommerce: ITypeCommerce): void {
    const modalRef = this.modalService.open(TypeCommerceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.typeCommerce = typeCommerce;
  }
}
