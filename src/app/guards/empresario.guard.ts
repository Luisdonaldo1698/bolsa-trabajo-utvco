import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Roles } from '../models/userRol.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresarioGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private nav: Router,
  ){}

  canActivate(): boolean {
    if(!!this.authService.user?.userId){
      return this.authService.user?.rol === Roles.EMPRESARIO;
    }
    this.nav.navigateByUrl('login');
    return false;
  }

}
