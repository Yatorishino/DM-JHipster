import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoopcycleSharedModule } from 'app/shared/shared.module';
import { TypeCommerceComponent } from './type-commerce.component';
import { TypeCommerceDetailComponent } from './type-commerce-detail.component';
import { TypeCommerceUpdateComponent } from './type-commerce-update.component';
import { TypeCommerceDeleteDialogComponent } from './type-commerce-delete-dialog.component';
import { typeCommerceRoute } from './type-commerce.route';

@NgModule({
  imports: [CoopcycleSharedModule, RouterModule.forChild(typeCommerceRoute)],
  declarations: [TypeCommerceComponent, TypeCommerceDetailComponent, TypeCommerceUpdateComponent, TypeCommerceDeleteDialogComponent],
  entryComponents: [TypeCommerceDeleteDialogComponent],
})
export class CoopcycleTypeCommerceModule {}
