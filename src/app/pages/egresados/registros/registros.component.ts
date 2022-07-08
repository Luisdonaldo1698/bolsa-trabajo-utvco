import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrarSintomasModel } from '../../../models/registrar-sintomas.model';
import { DoctorService } from '../../../services/doctor.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit, OnDestroy {

  registros: RegistrarSintomasModel[] = [];
  loading: boolean = false;
  fecha: Date = new Date;
  display: boolean = false;

  registroPaciente: RegistrarSintomasModel = {
    id: '',
    descripcion: '',
    gravidez: '',
    diasTranscurridos: 0,
    personasConvividas: 0,
    oxigenacion: '',
    temperatura: '',
    fecha: '',
    hora: '',
    paciente: {
      nombre: '',
      email: '',
      rol: '',
    },
    sintomas: {
      dolorCabeza: false,
      diarrea: false,
      faltaDeGusto: false,
      faltaDeOlfato: false,
      vomito: false,
      tos: false,
      cansancio: false,
      dificultadRespiratoria: false,
      neumonia: false,
    },
  };

  private _unsubscribeAll: Subject<boolean>;

  constructor(
    private doctorService: DoctorService,
    private router: Router,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.cargarRegistros();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
    this._unsubscribeAll.unsubscribe();
  }

  showDialog(registro: RegistrarSintomasModel) {
    this.registroPaciente = registro;
    this.display = true;
    console.log(registro);
  }

  cargarRegistros(fecha?: string){
    if(!fecha){
      fecha = moment().format('YYYY-MM-DD');
    }
    this.loading = true;
    this.doctorService.listarRegistros(fecha)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(resp => {
        console.log(resp);
        this.registros = resp;
        this.loading = false;
      },err => {
        console.log(err);
        this.loading = false;
      });
  }

  filtroFecha(){
    const formatoFecha = moment(this.fecha).format('YYYY-MM-DD');
    this.cargarRegistros(formatoFecha);
  }

  goToGenerarReceta(){
    this.doctorService.saveRegistro(this.registroPaciente);
    this.router.navigate(['egresado/crear-receta']);
  }

  verReceta(recetaUrl: string){
    console.log(recetaUrl);
    window.open(recetaUrl, "_blank");
  }
}
