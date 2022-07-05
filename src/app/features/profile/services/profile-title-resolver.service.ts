import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProfileTitleResolverService implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): string {
    return route.params['username'];
  }

}
