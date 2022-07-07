import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrosComponent } from '../registros/registros.component';
import { EgresadoComponent } from './egresado.component';
import { PostularmeComponent } from '../postularme/postularme.component';
import { EgresadoProfileComponent } from '../egresado-profile/egresado-profile.component';

const routes: Routes = [
  {
    path: '',
    component: EgresadoComponent,
    children: [
      {
        path: '',
        component: RegistrosComponent,
      },
      {
        path: 'crear-receta',
        component: PostularmeComponent,
      },
      {
        path: 'perfil',
        component: EgresadoProfileComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgresadoRoutingModule { }
