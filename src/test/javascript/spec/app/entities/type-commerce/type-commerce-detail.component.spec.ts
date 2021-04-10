import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { TypeCommerceDetailComponent } from 'app/entities/type-commerce/type-commerce-detail.component';
import { TypeCommerce } from 'app/shared/model/type-commerce.model';

describe('Component Tests', () => {
  describe('TypeCommerce Management Detail Component', () => {
    let comp: TypeCommerceDetailComponent;
    let fixture: ComponentFixture<TypeCommerceDetailComponent>;
    const route = ({ data: of({ typeCommerce: new TypeCommerce(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [TypeCommerceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TypeCommerceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TypeCommerceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load typeCommerce on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.typeCommerce).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
