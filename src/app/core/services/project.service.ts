import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Project } from '@core/models';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  private handleError(response: HttpErrorResponse) {
    let errorMessage = 'Unknown Error';
    if (response.error instanceof ErrorEvent) {
      errorMessage = `Error: ${response.error.message}`;
    } else {
      errorMessage = `Error: ${response.status} ${response.error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getAll() {
    return this.http.get<Project[]>(`${environment.apiUrl}/projects`).pipe(catchError(this.handleError));
  }
}
