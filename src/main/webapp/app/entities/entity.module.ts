import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'compte',
        loadChildren: () => import('./compte/compte.module').then(m => m.CoopcycleCompteModule),
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.CoopcycleRestaurantModule),
      },
      {
        path: 'type-commerce',
        loadChildren: () => import('./type-commerce/type-commerce.module').then(m => m.CoopcycleTypeCommerceModule),
      },
      {
        path: 'produit',
        loadChildren: () => import('./produit/produit.module').then(m => m.CoopcycleProduitModule),
      },
      {
        path: 'commande',
        loadChildren: () => import('./commande/commande.module').then(m => m.CoopcycleCommandeModule),
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CoopcycleCourseModule),
      },
      {
        path: 'avis',
        loadChildren: () => import('./avis/avis.module').then(m => m.CoopcycleAvisModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class CoopcycleEntityModule {}
