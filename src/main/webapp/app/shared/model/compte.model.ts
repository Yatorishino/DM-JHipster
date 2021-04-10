import { ICourse } from 'app/shared/model/course.model';

export interface ICompte {
  id?: number;
  prenom?: string;
  nom?: string;
  adresse?: string;
  telephone?: string;
  course?: ICourse;
}

export class Compte implements ICompte {
  constructor(
    public id?: number,
    public prenom?: string,
    public nom?: string,
    public adresse?: string,
    public telephone?: string,
    public course?: ICourse
  ) {}
}
