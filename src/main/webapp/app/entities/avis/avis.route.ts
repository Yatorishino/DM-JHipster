import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAvis, Avis } from 'app/shared/model/avis.model';
import { AvisService } from './avis.service';
import { AvisComponent } from './avis.component';
import { AvisDetailComponent } from './avis-detail.component';
import { AvisUpdateComponent } from './avis-update.component';

@Injectable({ providedIn: 'root' })
export class AvisResolve implements Resolve<IAvis> {
  constructor(private service: AvisService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAvis> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((avis: HttpResponse<Avis>) => {
          if (avis.body) {
            return of(avis.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Avis());
  }
}

export const avisRoute: Routes = [
  {
    path: '',
    component: AvisComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.avis.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AvisDetailComponent,
    resolve: {
      avis: AvisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.avis.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AvisUpdateComponent,
    resolve: {
      avis: AvisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.avis.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AvisUpdateComponent,
    resolve: {
      avis: AvisResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'coopcycleApp.avis.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
