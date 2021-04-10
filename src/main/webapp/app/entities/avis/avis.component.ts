import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAvis } from 'app/shared/model/avis.model';
import { AvisService } from './avis.service';
import { AvisDeleteDialogComponent } from './avis-delete-dialog.component';

@Component({
  selector: 'jhi-avis',
  templateUrl: './avis.component.html',
})
export class AvisComponent implements OnInit, OnDestroy {
  avis?: IAvis[];
  eventSubscriber?: Subscription;

  constructor(protected avisService: AvisService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.avisService.query().subscribe((res: HttpResponse<IAvis[]>) => (this.avis = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAvis();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAvis): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAvis(): void {
    this.eventSubscriber = this.eventManager.subscribe('avisListModification', () => this.loadAll());
  }

  delete(avis: IAvis): void {
    const modalRef = this.modalService.open(AvisDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.avis = avis;
  }
}
