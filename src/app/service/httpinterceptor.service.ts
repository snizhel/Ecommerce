import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

      if (sessionStorage.getItem('username') && sessionStorage.getItem('basicauth')) {
        req = req.clone({
          setHeaders: {
            Authorization: sessionStorage.getItem('basicauth')
          }
        })
      }
  
      return next.handle(req);
  
    }

}