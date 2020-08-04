import { AlertService } from './../../core/services/alert.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { PositionService } from './../../core/services/position.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'protractor';
import { Messages } from '@shared/messages.enum';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  messages = Messages;

  constructor(
    private positionService: PositionService, 
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    if (!this.isAddMode) {
      this.positionService.getById(this.id).subscribe(
        (p) => {
            this.f.title.setValue(p.title);
            this.f.description.setValue(p.description);
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
      this.createPosition();
    } else {
      this.updatePosition();
    }
  }

  private createPosition() {
    this.positionService.create(this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Position saved.', {autoClose: true, keepAfterRouteChange: true});
          this.router.navigate(['positions']);
      },
        error => {
          this.alertService.error(error, {autoClose: false, keepAfterRouteChange: true});
          this.loading = false;
        }
      );
  }

  private updatePosition() {
    this.positionService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Position updated.', {autoClose: true, keepAfterRouteChange: true});
          this.router.navigate(['positions']);
      },
        error => {
          this.alertService.error(error, {autoClose: false, keepAfterRouteChange: true});
          this.loading = false;
        }
      );
  }

}
