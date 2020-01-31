import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('CALLING AuthGuard canActivate');
    return this.auth.user$.pipe(
      map(user => {
        if (user) {
          return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } } );
        return false;
      })
    );
  }

}
