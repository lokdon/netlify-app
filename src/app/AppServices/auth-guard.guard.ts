import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable(
  {
    "providedIn":'root'
  }
)
export class AuthGuard  {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) :Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(localStorage.getItem('authToken')!=null)
      {
        console.log("auth key found")
        //this.router.navigate(['user/dashboard']);
        return true;
      }else{
        console.log("not auth key found")
        this.router.navigate(['auth/login']);
        return false
      }

      
  }
}
