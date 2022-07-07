import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { EmpresarioGuard } from './guards/empresario.guard';
import { EgresadoGuard } from './guards/egresado.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'empresario',
    loadChildren: () => import('./pages/empresarios/empresario/empresario.module').then(m => m.EmpresarioModule),
    canActivate: [EmpresarioGuard, AuthGuard],
  },
  {
    path: 'egresado',
    loadChildren: () => import('./pages/egresados/egresado/egresado.module').then(m => m.EgresadoModule),
    canActivate: [EgresadoGuard,AuthGuard],
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin-home/admin-home.module').then(m => m.AdminHomeModule),
    canActivate: [AdminGuard, AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
