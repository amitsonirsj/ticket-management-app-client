import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  constructor(
    private _toastrService: ToastrService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token)
      request = request.clone({
        setHeaders: { authorization: `Bearer ${token}` }
      })
    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              this._toastrService.error('Unauthorized access!');
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            this._toastrService.error('Unauthorized access!')
          }
          else if (error.status === 400) {
            this._toastrService.error(error.error.message)
          }
          else if (error.status === 404) {
            this._toastrService.error('Page Not Found!')
          }
        }
      }));
  }
}