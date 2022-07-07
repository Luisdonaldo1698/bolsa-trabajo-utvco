import { Component, OnInit } from '@angular/core';
import { Roles } from '../../../models/userRol.enum';

@Component({
  selector: 'app-doctor',
  templateUrl: './egresado.component.html',
  styleUrls: ['./egresado.component.scss']
})
export class EgresadoComponent implements OnInit {
  rol: Roles = Roles.EGRESADO;

  constructor() { }

  ngOnInit(): void {
  }

}
