import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITypeCommerce } from 'app/shared/model/type-commerce.model';

@Component({
  selector: 'jhi-type-commerce-detail',
  templateUrl: './type-commerce-detail.component.html',
})
export class TypeCommerceDetailComponent implements OnInit {
  typeCommerce: ITypeCommerce | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ typeCommerce }) => (this.typeCommerce = typeCommerce));
  }

  previousState(): void {
    window.history.back();
  }
}
