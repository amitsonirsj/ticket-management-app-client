import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public _authService: AuthService,
    public router: Router,
    private _toastrService: ToastrService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this._authService.isAuthenticated() && route.routeConfig?.path != 'login' && route.routeConfig?.path != 'signup') {
      this._toastrService.warning("Please login to continue!");
      this.router.navigate(['login']);
      return false;
    } else if (this._authService.isAuthenticated() && (route.routeConfig?.path == 'login' || route.routeConfig?.path == 'signup')) {
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
