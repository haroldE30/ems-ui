import { AlertService, PositionService, DepartmentService } from '@core/services';
import { first } from 'rxjs/operators';
import { EmployeeService } from './../../core/services/employee.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Messages } from '@shared/messages.enum';
import { AngularMyDatePickerDirective, IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker/public-api';
import { GENDER } from '@shared/gender';
import { MARITAL_STATUS } from '@shared/marital-status';
import { EMPLOYMENT_STATUS } from '@shared/employment-status';
import { COUNTRIES } from '@shared/countries';

@Component({
  templateUrl: './add-edit.component.html',
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;

  positions = null;
  departments = null;
  
  messages = Messages;
  gender = GENDER;
  maritalStatus = MARITAL_STATUS;
  employmentStatus = EMPLOYMENT_STATUS;
  countries = COUNTRIES;

  emailErrorMessages: string[] = [];
  mobileErrorMessages: string[] = [];

  @ViewChild('dp') myDp: AngularMyDatePickerDirective;
  @ViewChild('dp1') myDp1: AngularMyDatePickerDirective;
  myOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: this.messages.PLACE_HOLDER_DATE_PATTERN
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private positionService: PositionService,
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef
  ) { }
  
  public get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    let bdModel: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}, dateRange: null};
    let edModel: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date()}, dateRange: null};

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: ['', Validators.required],
      birthDate: [bdModel,  Validators.required],
      phone: ['', Validators.pattern(/^0\d{1,3}[\s]\d{3,4}[-]\d{4}/)],
      mobile: ['', [Validators.required, Validators.pattern(/^09\d{2}[\s]\d{7}/)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      employmentStatus: ['', Validators.required],
      employedDate: [edModel, Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      positionId: ['', Validators.required],
      departmentId: ['', Validators.required],
    });
    this.clearDates();

    of (this.positionService.getAll().subscribe(data => this.positions = data));
    of (this.departmentService.getAll().subscribe(data => this.departments = data));

    if (!this.isAddMode) {
      this.employeeService.getById(this.id)
        .subscribe(data => {
          this.f.firstName.setValue(data.firstName);
          this.f.middleName.setValue(data.middleName);
          this.f.lastName.setValue(data.lastName);
          let bd: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date(data.birthDate)}, dateRange: null};
          this.f.birthDate.setValue(bd);
          this.f.phone.setValue(data.phone);
          this.f.email.setValue(data.email);
          this.f.gender.setValue(data.gender.toLowerCase());
          this.f.maritalStatus.setValue(data.maritalStatus.toLowerCase());
          this.f.employmentStatus.setValue(data.employmentStatus.toLowerCase());
          let ed: IMyDateModel = {isRange: false, singleDate: {jsDate: new Date(data.employedDate)}, dateRange: null};
          this.f.employedDate.setValue(ed);
          this.f.street.setValue(data.street);
          this.f.city.setValue(data.city);
          this.f.zipCode.setValue(data.zipCode);
          this.f.country.setValue(data.country);
          this.f.positionId.setValue(data.positionId);
          this.f.departmentId.setValue(data.departmentId);
        });
    }
  }

  onSubmit() {
    this.submitted = true;

    this.emailErrorMessages = [];
    if (this.f.email.hasError('required')) {
      this.emailErrorMessages.push(this.messages.ERROR_EMPLOYEE_EMAIL_REQUIRED);
    }
    if (this.f.email.hasError('email') || this.f.email.dirty || this.f.email.touched){
      this.emailErrorMessages.push(this.messages.ERROR_EMPLOYEE_EMAIL_FORMAT);
    }

    this.mobileErrorMessages = [];
    if (this.f.mobile.hasError('required')) {
      this.mobileErrorMessages.push(this.messages.ERROR_EMPLOYEE_MOBILE_NUMBER_REQUIRED);
    }
    if (this.f.mobile.hasError('pattern') || this.f.mobile.dirty || this.f.mobile.touched) {
      this.mobileErrorMessages.push(this.messages.ERROR_EMPLOYEE_MOBILE_NUMBER_FORMAT);
    }

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createEmployee();
    } else {
      this.updateEmployee();
    }
  }

  private clearDates(): void {
    this.f.birthDate.setValue(null);
    this.f.employedDate.setValue(null);
  }

  toggleBdCalendar(): void {
    this.cdr.detectChanges();
    this.myDp.toggleCalendar();
  }

  toggleEdCalendar(): void {
    this.cdr.detectChanges();
    this.myDp1.toggleCalendar();
  }

  changeMaritalStatus(status: string) {
    this.f.maritalStatus.setValue(status);
  }

  changeEmploymentStatus(status: string) {
    this.f.employmentStatus.setValue(status);
  }

  changePosition(id: number) {
    this.f.positionId.setValue(id);
  }

  changeDepartment(id: number) {
    this.f.departmentId.setValue(id);
  }

  private createEmployee() {
    this.employeeService.create(this.form)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Employee saved.', { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['/employees']);
        },
        error => {
          this.alertService.error(error, { autoClose: false, keepAfterRouteChange: true });
          this.loading = false;
        }
      );
  }

  private updateEmployee() {
    this.employeeService.update(this.id, this.form)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Employee updated.', { autoClose: true, keepAfterRouteChange: true });
          this.router.navigate(['/employees']);
        },
        error => {
          this.alertService.error(error, { autoClose: false, keepAfterRouteChange: true });
          this.loading = false;
        }
      );
  }

}
