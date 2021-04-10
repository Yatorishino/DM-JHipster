import { ICourse } from 'app/shared/model/course.model';
import { ICompte } from 'app/shared/model/compte.model';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IProduit } from 'app/shared/model/produit.model';

export interface ICommande {
  id?: number;
  adresse?: string;
  course?: ICourse;
  compte?: ICompte;
  restaurant?: IRestaurant;
  produits?: IProduit[];
}

export class Commande implements ICommande {
  constructor(
    public id?: number,
    public adresse?: string,
    public course?: ICourse,
    public compte?: ICompte,
    public restaurant?: IRestaurant,
    public produits?: IProduit[]
  ) {}
}
