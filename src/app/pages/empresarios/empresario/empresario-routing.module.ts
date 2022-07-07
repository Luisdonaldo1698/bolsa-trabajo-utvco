import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresarioComponent } from './empresario.component';
import { EmpresarioRegistrosComponent } from '../empresario-registros/empresario-registros.component';
import { RegistrarVacanteComponent } from '../registrar-vacante/registrar-vacante.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresarioComponent,
    children: [
      {
        path: '',
        component: EmpresarioRegistrosComponent,
      },
      {
        path: 'nuevo',
        component: RegistrarVacanteComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresarioRoutingModule { }
