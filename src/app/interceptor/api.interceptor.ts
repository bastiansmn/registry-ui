import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {AlertService} from "../services/alert.service";
import ErrorResponse from "../model/error.model";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private _alertService: AlertService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => this.handleError(err))
      );
  }

  private handleError(err: HttpErrorResponse) {
    this._alertService.show({
      severity: 'error',
      summary: "Registry error",
      detail: err.error
    });

    if (err.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Une erreur a eu lieu sur le client ou sur le réseau:', err.error);
    } else {
      const backendError = err.error as ErrorResponse;
      backendError.errors.forEach(error => {
        this._alertService.show({
          severity: 'error',
          summary: "Registry error",
          detail: error.message
        });
      });
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Registry returned code ${err.status}, the body was: `, err.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('An error occurred; please try again later.'));
  }
}
