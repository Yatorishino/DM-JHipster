import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { AvisComponent } from 'app/entities/avis/avis.component';
import { AvisService } from 'app/entities/avis/avis.service';
import { Avis } from 'app/shared/model/avis.model';

describe('Component Tests', () => {
  describe('Avis Management Component', () => {
    let comp: AvisComponent;
    let fixture: ComponentFixture<AvisComponent>;
    let service: AvisService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [AvisComponent],
      })
        .overrideTemplate(AvisComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AvisComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AvisService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Avis(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.avis && comp.avis[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
