import { ICourse } from 'app/shared/model/course.model';

export interface IAvis {
  id?: number;
  note?: number;
  description?: string;
  course?: ICourse;
}

export class Avis implements IAvis {
  constructor(public id?: number, public note?: number, public description?: string, public course?: ICourse) {}
}
