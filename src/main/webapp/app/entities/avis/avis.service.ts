import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAvis } from 'app/shared/model/avis.model';

type EntityResponseType = HttpResponse<IAvis>;
type EntityArrayResponseType = HttpResponse<IAvis[]>;

@Injectable({ providedIn: 'root' })
export class AvisService {
  public resourceUrl = SERVER_API_URL + 'api/avis';

  constructor(protected http: HttpClient) {}

  create(avis: IAvis): Observable<EntityResponseType> {
    return this.http.post<IAvis>(this.resourceUrl, avis, { observe: 'response' });
  }

  update(avis: IAvis): Observable<EntityResponseType> {
    return this.http.put<IAvis>(this.resourceUrl, avis, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAvis>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAvis[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
