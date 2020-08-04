import { AlertService } from './alert.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Position } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknow Error';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.alertService.error(errorMessage, {autoClose: false, keepAfterRouteChange: true});
    return throwError(errorMessage);
  }

  getAll() {
    return this.http.get<Position[]>(`${environment.apiUrl}/positions`).pipe(catchError(this.handleError));
  }

  getById(id: number) {
    return this.http.get<Position>(`${environment.apiUrl}/positions/${id}`).pipe(catchError(this.handleError));
  }

  create(position: Position) {
    return this.http.post(`${environment.apiUrl}/positions`, position).pipe(catchError(this.handleError));
  }

  update(id: number, position: Position) {
    return this.http.put(`${environment.apiUrl}/positions/${id}`, position).pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/positions/${id}`).pipe(catchError(this.handleError));
  }  
}
