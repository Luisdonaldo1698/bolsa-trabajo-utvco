import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../models/userRol.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private nav: Router,
    private authService: AuthService,
  ){}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!!this.authService.user?.userId){
      return this.authService.user?.rol === Roles.ADMIN;
    }
    this.nav.navigateByUrl('login');
    return false;
  }

}
