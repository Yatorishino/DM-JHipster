import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITypeCommerce, TypeCommerce } from 'app/shared/model/type-commerce.model';
import { TypeCommerceService } from './type-commerce.service';
import { TypeCommerceComponent } from './type-commerce.component';
import { TypeCommerceDetailComponent } from './type-commerce-detail.component';
import { TypeCommerceUpdateComponent } from './type-commerce-update.component';

@Injectable({ providedIn: 'root' })
export class TypeCommerceResolve implements Resolve<ITypeCommerce> {
  constructor(private service: TypeCommerceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITypeCommerce> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((typeCommerce: HttpResponse<TypeCommerce>) => {
          if (typeCommerce.body) {
            return of(typeCommerce.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TypeCommerce());
  }
}

export const typeCommerceRoute: Routes = [
  {
    path: '',
    component: TypeCommerceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.typeCommerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TypeCommerceDetailComponent,
    resolve: {
      typeCommerce: TypeCommerceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.typeCommerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TypeCommerceUpdateComponent,
    resolve: {
      typeCommerce: TypeCommerceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.typeCommerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TypeCommerceUpdateComponent,
    resolve: {
      typeCommerce: TypeCommerceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.typeCommerce.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
