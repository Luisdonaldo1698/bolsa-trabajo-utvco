import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { Roles } from '../models/userRol.enum';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EgresadoGuard implements CanActivate {
  constructor(
    private nav: Router,
    private authService: AuthService,
  ){}

  canActivate(): boolean{
    if(!!this.authService.user?.userId){
      return this.authService.user?.rol === Roles.EGRESADO;
    }
    this.nav.navigateByUrl('login');
    return false;
  }

}
