import { HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token-storage';
import { inject } from '@angular/core';

const TOKEN_HEADER_KEY = 'Authorization';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  console.log("functional-interceptor");
  const tokenStorage = inject(TokenStorageService);
  let authReq = req;
  const token = tokenStorage.getToken();
  if (token !== "{}") {
    authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
  return next(authReq);
};

