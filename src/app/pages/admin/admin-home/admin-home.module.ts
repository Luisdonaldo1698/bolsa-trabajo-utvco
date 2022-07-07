import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHomeRoutingModule } from './admin-home-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { PrimeModule } from '../../../prime.module';
import { ListaUsuariosComponent } from '../lista-usuarios/lista-usuarios.component';
import { ComponentsModule } from '../../../components/components.module';


@NgModule({
  declarations: [
    AdminHomeComponent,
    ListaUsuariosComponent,
  ],
  imports: [
    CommonModule,
    AdminHomeRoutingModule,
    PrimeModule,
    ComponentsModule,
  ]
})
export class AdminHomeModule { }
