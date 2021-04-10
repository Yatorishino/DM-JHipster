import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { AvisDetailComponent } from 'app/entities/avis/avis-detail.component';
import { Avis } from 'app/shared/model/avis.model';

describe('Component Tests', () => {
  describe('Avis Management Detail Component', () => {
    let comp: AvisDetailComponent;
    let fixture: ComponentFixture<AvisDetailComponent>;
    const route = ({ data: of({ avis: new Avis(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [AvisDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AvisDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AvisDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load avis on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.avis).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
