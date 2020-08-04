import { AlertService } from './alert.service';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Department } from '@core/models';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient, 
    private alertService: AlertService) { }

  handleError(response: HttpErrorResponse) {
    let errorMessage = 'Unknown Error';
    if (response.error instanceof ErrorEvent) {
      errorMessage = `Error: ${response.error.message}`;
    } else {
      errorMessage = `Error Code: ${response.status}\nMessage:${response.message}`;
    }
    this.alertService.error(errorMessage, {autoClose: false, keepAfterRouteChange: true});
    return throwError(errorMessage);
  }

  getAll() {
    return this.http.get<Department[]>(`${environment.apiUrl}/departments`).pipe(catchError(this.handleError));
  }

  getById(id: number) {
    return this.http.get<Department>(`${environment.apiUrl}/departments/${id}`).pipe(catchError(this.handleError));
  }

  create(department: Department) {
    return this.http.post(`${environment.apiUrl}/departments`, department).pipe(catchError(this.handleError));
  }

  update(id: number, department: Department) {
    return this.http.put<Department>(`${environment.apiUrl}/departments/${id}`, department).pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/departments/${id}`).pipe(catchError(this.handleError));
  }
}
