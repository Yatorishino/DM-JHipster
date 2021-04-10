import { ICompte } from 'app/shared/model/compte.model';
import { ICommande } from 'app/shared/model/commande.model';

export interface ICourse {
  id?: number;
  compte?: ICompte;
  commande?: ICommande;
}

export class Course implements ICourse {
  constructor(public id?: number, public compte?: ICompte, public commande?: ICommande) {}
}
