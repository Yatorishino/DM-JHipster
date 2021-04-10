import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITypeCommerce, TypeCommerce } from 'app/shared/model/type-commerce.model';
import { TypeCommerceService } from './type-commerce.service';

@Component({
  selector: 'jhi-type-commerce-update',
  templateUrl: './type-commerce-update.component.html',
})
export class TypeCommerceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
  });

  constructor(protected typeCommerceService: TypeCommerceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeCommerce }) => {
      this.updateForm(typeCommerce);
    });
  }

  updateForm(typeCommerce: ITypeCommerce): void {
    this.editForm.patchValue({
      id: typeCommerce.id,
      nom: typeCommerce.nom,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const typeCommerce = this.createFromForm();
    if (typeCommerce.id !== undefined) {
      this.subscribeToSaveResponse(this.typeCommerceService.update(typeCommerce));
    } else {
      this.subscribeToSaveResponse(this.typeCommerceService.create(typeCommerce));
    }
  }

  private createFromForm(): ITypeCommerce {
    return {
      ...new TypeCommerce(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeCommerce>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
