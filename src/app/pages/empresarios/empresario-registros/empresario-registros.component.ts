import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrarSintomasModel } from 'src/app/models/registrar-sintomas.model';
import { AuthService } from '../../../services/auth.service';
import { PacienteService } from '../../../services/paciente.service';
import { AlertService } from '../../../services/alert.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-paciente-registros',
  templateUrl: './empresario-registros.component.html',
  styleUrls: ['./empresario-registros.component.scss']
})
export class EmpresarioRegistrosComponent implements OnInit, OnDestroy {

  registros: RegistrarSintomasModel[] = [];
  loading: boolean = false;

  private _unsubscribeAll: Subject<boolean>;

  constructor(
    private authService: AuthService,
    private pacienteService: PacienteService,
    private alertService: AlertService,
    private router: Router,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getRegistros();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
    this._unsubscribeAll.unsubscribe();
  }

  getRegistros(){
    this.loading = true;
    const userId = this.authService.user?.userId;
    this.pacienteService.listarRegistros(userId!)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(resp => {
        this.registros = resp;
        this.loading = false;
      }, err => {
        this.loading = false;
        console.log(err);
        this.alertService.showAlert('Error', err, 'error');
      });
  }

  goToNuevoRegistro(){
    this.router.navigate(['/empresario/nuevo']);
  }

  verReceta(recetaUrl: string){
    console.log(recetaUrl)
    window.open(recetaUrl, "_blank")
  }

}
