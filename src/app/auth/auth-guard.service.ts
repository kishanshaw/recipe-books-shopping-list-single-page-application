import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private isAuth: any;

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree> |UrlTree| Promise<boolean | UrlTree> | boolean {
    return this.authService.userSubject.pipe(
      map(
        (user) => {
          this.isAuth = user;
          if (this.isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        }
      )

    );
  }
}
