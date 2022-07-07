import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrosComponent } from '../registros/registros.component';
import { ComponentsModule } from '../../../components/components.module';
import { PrimeModule } from 'src/app/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../../pipes/pipes.module';
import { EgresadoComponent } from './egresado.component';
import { EgresadoRoutingModule } from './egresado-routing.module';
import { PostularmeComponent } from '../postularme/postularme.component';
import { EgresadoProfileComponent } from '../egresado-profile/egresado-profile.component';


@NgModule({
  declarations: [
    EgresadoComponent,
    RegistrosComponent,
    PostularmeComponent,
    EgresadoProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EgresadoRoutingModule,
    PrimeModule,
    ComponentsModule,
    PipesModule,
  ],
  // bootstrap: [DoctorComponent],
})
export class EgresadoModule { }
