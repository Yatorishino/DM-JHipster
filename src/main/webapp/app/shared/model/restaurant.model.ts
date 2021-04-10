import { ICompte } from 'app/shared/model/compte.model';
import { ITypeCommerce } from 'app/shared/model/type-commerce.model';

export interface IRestaurant {
  id?: number;
  nom?: string;
  adresse?: string;
  compte?: ICompte;
  typeCommerces?: ITypeCommerce[];
}

export class Restaurant implements IRestaurant {
  constructor(
    public id?: number,
    public nom?: string,
    public adresse?: string,
    public compte?: ICompte,
    public typeCommerces?: ITypeCommerce[]
  ) {}
}
