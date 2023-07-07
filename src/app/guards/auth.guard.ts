import {CanActivateFn, Router} from '@angular/router';
import {ApiService} from "../services/api.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  let router: Router = new Router();
  if ((state.url === '/login' || state.url === "/register") && ApiService.checkToken())
    return router.parseUrl('/users');
  else if (state.url !== '/login' && state.url !== '/register' && !ApiService.checkToken())
    return router.parseUrl('/login');
  return true;
};

