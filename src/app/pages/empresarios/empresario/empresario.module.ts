import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '../../../prime.module';
import { ComponentsModule } from '../../../components/components.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { EmpresarioRoutingModule } from './empresario-routing.module';
import { EmpresarioComponent } from './empresario.component';
import { EmpresarioRegistrosComponent } from '../empresario-registros/empresario-registros.component';
import { RegistrarVacanteComponent } from '../registrar-vacante/registrar-vacante.component';


@NgModule({
  declarations: [
    EmpresarioComponent,
    RegistrarVacanteComponent,
    EmpresarioRegistrosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmpresarioRoutingModule,
    PrimeModule,
    ComponentsModule,
    PipesModule,
  ]
})
export class EmpresarioModule { }
