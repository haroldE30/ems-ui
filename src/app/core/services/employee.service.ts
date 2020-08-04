import { FormGroup } from '@angular/forms';
import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import { Employee } from '@core/models';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(
    private router: Router, 
    private http: HttpClient,
    private datePipe: DatePipe
    ) {}

  handleError(response: HttpErrorResponse) {
    let errorMessage = 'Unknow Error';
    if (response.error instanceof ErrorEvent) {
      errorMessage = `Error: ${response.error.message}`;
    } else {
      errorMessage = `Error: ${response.status} ${response.error.message}`;
    }
    return throwError(errorMessage);
  }

  getAll() {
    return this.http.get<Employee[]>(`${environment.apiUrl}/employees`).pipe(catchError(this.handleError));
  }

  getById(id: number) {
    return this.http.get<Employee>(`${environment.apiUrl}/employees/${id}`).pipe(catchError(this.handleError));
  }

  create(form: FormGroup) {
    let employee = this.createEmployee(form);
    
    return this.http.post(`${environment.apiUrl}/employees`, employee).pipe(catchError(this.handleError));
  }

  update(id: number, form: FormGroup) {
    let employee = this.createEmployee(form);
    return this.http.put(`${environment.apiUrl}/employees/${id}`, employee).pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/employees/${id}`).pipe(catchError(this.handleError));
  }

  private createEmployee(form: FormGroup): Employee {
    let employee = new Employee();

    employee.firstName = form.value.firstName;
    employee.middleName = form.value.middleName;
    employee.lastName = form.value.lastName;
    employee.birthDate = this.formatDate(form.value.birthDate.singleDate.jsDate);
    employee.phone = form.value.phone;
    employee.mobile = form.value.mobile;
    employee.email = form.value.email;
    employee.gender = form.value.gender;
    employee.maritalStatus = form.value.maritalStatus;
    employee.employmentStatus = form.value.employmentStatus;
    employee.employedDate = this.formatDate(form.value.employedDate.singleDate.jsDate);
    employee.street = form.value.street;
    employee.city = form.value.city
    employee.zipCode = form.value.zipCode;
    employee.country = form.value.country;
    employee.positionId = form.value.positionId;
    employee.departmentId = form.value.departmentId;

    return employee;
  }

  private formatDate(date: Date) {
    let pattern = "yyyy-MM-dd";
    return this.datePipe.transform(date, pattern);
  }
}
