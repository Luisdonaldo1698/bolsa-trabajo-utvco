import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { UserModel } from '../../../models/user.model';
import { Roles } from 'src/app/models/userRol.enum';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {
  @Input()rol: string = Roles.EMPRESARIO;

  pacientes: UserModel[] = [];
  doctores: UserModel[] = [];
  loading: boolean = false;

  private _unsubscribeAll: Subject<boolean>;

  constructor(
    private adminService: AdminService,
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
    this._unsubscribeAll.unsubscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    if(this.rol === Roles.EMPRESARIO){
      this.adminService.listarPacientes()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(resp => {
          this.pacientes = resp;
          this.loading = false;
        },err => {
          console.log(err);
          this.loading = false;
        });
    }
    else {
      this.adminService.listarDoctores()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(resp => {
          this.doctores = resp;
          this.loading = false;
        },err => {
          console.log(err);
          this.loading = false;
        });
    }
  }

  eliminarUsuario(usuario: UserModel){
    console.log('eliminar');
    console.log(usuario);
  }

}
