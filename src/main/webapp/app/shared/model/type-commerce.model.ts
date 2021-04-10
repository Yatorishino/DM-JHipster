import { IRestaurant } from 'app/shared/model/restaurant.model';

export interface ITypeCommerce {
  id?: number;
  nom?: string;
  restaurants?: IRestaurant[];
}

export class TypeCommerce implements ITypeCommerce {
  constructor(public id?: number, public nom?: string, public restaurants?: IRestaurant[]) {}
}
