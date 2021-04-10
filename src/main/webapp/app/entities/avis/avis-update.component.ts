import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAvis, Avis } from 'app/shared/model/avis.model';
import { AvisService } from './avis.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course/course.service';

@Component({
  selector: 'jhi-avis-update',
  templateUrl: './avis-update.component.html',
})
export class AvisUpdateComponent implements OnInit {
  isSaving = false;
  courses: ICourse[] = [];

  editForm = this.fb.group({
    id: [],
    note: [null, [Validators.required]],
    description: [null, [Validators.maxLength(1000)]],
    course: [],
  });

  constructor(
    protected avisService: AvisService,
    protected courseService: CourseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ avis }) => {
      this.updateForm(avis);

      this.courseService.query().subscribe((res: HttpResponse<ICourse[]>) => (this.courses = res.body || []));
    });
  }

  updateForm(avis: IAvis): void {
    this.editForm.patchValue({
      id: avis.id,
      note: avis.note,
      description: avis.description,
      course: avis.course,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const avis = this.createFromForm();
    if (avis.id !== undefined) {
      this.subscribeToSaveResponse(this.avisService.update(avis));
    } else {
      this.subscribeToSaveResponse(this.avisService.create(avis));
    }
  }

  private createFromForm(): IAvis {
    return {
      ...new Avis(),
      id: this.editForm.get(['id'])!.value,
      note: this.editForm.get(['note'])!.value,
      description: this.editForm.get(['description'])!.value,
      course: this.editForm.get(['course'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAvis>>): void {
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

  trackById(index: number, item: ICourse): any {
    return item.id;
  }
}
