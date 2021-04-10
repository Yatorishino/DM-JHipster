import { IRestaurant } from 'app/shared/model/restaurant.model';
import { ICommande } from 'app/shared/model/commande.model';

export interface IProduit {
  id?: number;
  nom?: string;
  prix?: number;
  description?: string;
  restaurant?: IRestaurant;
  commandes?: ICommande[];
}

export class Produit implements IProduit {
  constructor(
    public id?: number,
    public nom?: string,
    public prix?: number,
    public description?: string,
    public restaurant?: IRestaurant,
    public commandes?: ICommande[]
  ) {}
}
