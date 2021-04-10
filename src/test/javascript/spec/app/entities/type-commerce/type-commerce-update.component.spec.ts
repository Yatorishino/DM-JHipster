import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CoopcycleTestModule } from '../../../test.module';
import { TypeCommerceUpdateComponent } from 'app/entities/type-commerce/type-commerce-update.component';
import { TypeCommerceService } from 'app/entities/type-commerce/type-commerce.service';
import { TypeCommerce } from 'app/shared/model/type-commerce.model';

describe('Component Tests', () => {
  describe('TypeCommerce Management Update Component', () => {
    let comp: TypeCommerceUpdateComponent;
    let fixture: ComponentFixture<TypeCommerceUpdateComponent>;
    let service: TypeCommerceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CoopcycleTestModule],
        declarations: [TypeCommerceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TypeCommerceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TypeCommerceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TypeCommerceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeCommerce(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TypeCommerce();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
