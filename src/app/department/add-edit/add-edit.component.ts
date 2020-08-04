import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DepartmentService, AlertService } from '@core/services';
import { first } from 'rxjs/operators';
import { Messages } from '@shared/messages.enum';

@Component({
  templateUrl: './add-edit.component.html',
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id = null;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  messages = Messages;

  constructor(
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.departmentService.getById(this.id)
        .subscribe(
          (d) => {
            this.f.name.setValue(d.name);
            this.f.description.setValue(d.description);
          }
        );
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createDepartment();
    } else {
      this.updateDepartment();
    }
  }

  private createDepartment() {
    this.departmentService.create(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Department saved.', {autoClose: true, keepAfterRouteChange: true});
          this.router.navigate(['departments']);
        },
        error => {
          this.alertService.error(error, {autoClose: false, keepAfterRouteChange: true});
          this.loading = false;
        }
      );
  }

  private updateDepartment() {
    this.departmentService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Department updated.', {autoClose: true, keepAfterRouteChange: true});
          this.router.navigate(['departments']);
        },
        error => {
          this.alertService.error(error, {autoClose: false, keepAfterRouteChange: true});
          this.loading = false;
        }
      );
  }


}
