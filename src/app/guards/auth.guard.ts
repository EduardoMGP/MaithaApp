import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {ApiService} from "../services/api.service";
import {inject, Injectable} from "@angular/core";

@Injectable()
export class AuthService {
  constructor(private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ((state.url === '/login' || state.url === "/register") && ApiService.checkToken()) {
      this.router.navigate(['/users']);
      return false;
    } else if (state.url !== '/login' && state.url !== '/register' && !ApiService.checkToken()) {
      console.log("entro")
      console.log(state.url)
      console.log(route)
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).canActivate(route, state);
}
