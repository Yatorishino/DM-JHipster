import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITypeCommerce } from 'app/shared/model/type-commerce.model';

type EntityResponseType = HttpResponse<ITypeCommerce>;
type EntityArrayResponseType = HttpResponse<ITypeCommerce[]>;

@Injectable({ providedIn: 'root' })
export class TypeCommerceService {
  public resourceUrl = SERVER_API_URL + 'api/type-commerces';

  constructor(protected http: HttpClient) {}

  create(typeCommerce: ITypeCommerce): Observable<EntityResponseType> {
    return this.http.post<ITypeCommerce>(this.resourceUrl, typeCommerce, { observe: 'response' });
  }

  update(typeCommerce: ITypeCommerce): Observable<EntityResponseType> {
    return this.http.put<ITypeCommerce>(this.resourceUrl, typeCommerce, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeCommerce>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeCommerce[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
