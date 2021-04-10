import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CoopcycleTestModule } from '../../../test.module';
import { TypeCommerceComponent } from 'app/entities/type-commerce/type-commerce.component';
import { TypeCommerceService } from 'app/entities/type-commerce/type-commerce.service';
import { TypeCommerce } from 'app/shared/model/type-commerce.model';

describe('Component Tests', () => {
  describe('TypeCommerce Management Component', () => {
    let comp: TypeCommerceComponent;
    let fixture: ComponentFixture<TypeCommerceComponent>;
    let service: TypeCommerceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [TypeCommerceComponent],
      })
        .overrideTemplate(TypeCommerceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeCommerceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeCommerceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new TypeCommerce(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.typeCommerces && comp.typeCommerces[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
