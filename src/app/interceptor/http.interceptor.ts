import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth/auth.service";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  let authService = inject(AuthService);

  if (authService.isAdmin()) {
    return next(req.clone({
      setHeaders: {
        accept: 'application/json'
      }
    }))
  }

  return next(req);
};
