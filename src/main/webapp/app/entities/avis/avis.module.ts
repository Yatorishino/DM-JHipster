import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleSharedModule } from 'app/shared/shared.module';
import { AvisComponent } from './avis.component';
import { AvisDetailComponent } from './avis-detail.component';
import { AvisUpdateComponent } from './avis-update.component';
import { AvisDeleteDialogComponent } from './avis-delete-dialog.component';
import { avisRoute } from './avis.route';

@NgModule({
  imports: [CoopcycleSharedModule, RouterModule.forChild(avisRoute)],
  declarations: [AvisComponent, AvisDetailComponent, AvisUpdateComponent, AvisDeleteDialogComponent],
  entryComponents: [AvisDeleteDialogComponent],
})
export class CoopcycleAvisModule {}
