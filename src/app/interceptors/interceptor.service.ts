import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ResponseApi } from '../models/response.model';
import { SpinnerService } from '../services/spinner.service';
import { Router } from '@angular/router';
import { ResponseType } from '../enums/response.enum';
import { Auth } from '../enums/auth.enum';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService, private _spinnerService: SpinnerService, private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Authorization = localStorage.getItem(Auth.accessToken);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${Authorization}`,
      'X-API-Key': environment.apiKey
    });

    const reqClone = req.clone({
      headers
    })
    this._spinnerService.llamarSpinner();
    return next.handle(reqClone).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body: ResponseApi = event.body;
          const statusCode = body.statusCode;
          let message = body.friendlyMessage;
          switch (statusCode) {
            case ResponseType.Ok:
              this.successMessage(message);
              break;
            case ResponseType.BadRequest:
              this.errorMessage(message);
              break;
            case ResponseType.Unauthorized:
              this.errorMessage(message);
              this.router.navigate(['login']);
              break;
            default:
            // code block
          }
        }
        return event;
      }),
      catchError(this.errorHandler),
      finalize(() => this._spinnerService.detenerSpinner())
    )
  }

  errorHandler(error: HttpErrorResponse) {
    console.log('Sucedio Un error');
    console.warn(error);
    return throwError(error.message);
  }

  errorMessage(message: any) {
    this.toastr.error(message, 'Error');
  }

  successMessage(message: any) {
    this.toastr.success(message, 'Exito');
  }

}
