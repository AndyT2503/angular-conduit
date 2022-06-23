import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthRepository } from './../state/auth.repository';

@Injectable({
  providedIn: 'root',
})
export class NonAuthGuard implements CanActivate, CanLoad {
  authRepository = inject(AuthRepository);
  router = inject(Router);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.isAuthenticated$();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> {
    return this.isAuthenticated$();
  }

  private isAuthenticated$() : Observable<boolean | UrlTree> {
    return this.authRepository.isAuthenticated$.pipe(
      map((res) => {
        if (!!res) {
          return this.router.createUrlTree(['/']);
        } else {
          return true;
        }
      }),
      take(1)
    );
  }
}
