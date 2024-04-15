import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token') ?? '';
  const baseUrl = environment.token_auth_config.apiBase;

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
    url: baseUrl + req.url,
  });

  return next(req);
};
