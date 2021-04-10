import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAvis } from 'app/shared/model/avis.model';
import { AvisService } from './avis.service';

@Component({
  templateUrl: './avis-delete-dialog.component.html',
})
export class AvisDeleteDialogComponent {
  avis?: IAvis;

  constructor(protected avisService: AvisService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.avisService.delete(id).subscribe(() => {
      this.eventManager.broadcast('avisListModification');
      this.activeModal.close();
    });
  }
}
