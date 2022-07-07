import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { RegistrarSintomasModel, SintomasModel } from '../../../models/registrar-sintomas.model';
import { PacienteService } from '../../../services/paciente.service';
import { AuthService } from '../../../services/auth.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-sintomas',
  templateUrl: './registrar-vacante.component.html',
  styleUrls: ['./registrar-vacante.component.scss']
})
export class RegistrarVacanteComponent implements OnInit {

  loading: boolean = false;

  formulario!: FormGroup;
  formularioSintomas: FormGroup = new FormGroup({});
  dolorCabeza: FormControl = new FormControl(false, []);
  diarrea: FormControl = new FormControl(false, []);
  faltaDeGusto: FormControl = new FormControl(false, []);
  faltaDeOlfato: FormControl = new FormControl(false, []);
  vomito: FormControl = new FormControl(false, []);
  tos: FormControl = new FormControl(false, []);
  cansancio: FormControl = new FormControl(false, []);
  dificultadRespiratoria: FormControl = new FormControl(false, []);
  neumonia: FormControl = new FormControl(false, []);

  gravidezOptions: {name: string}[];

  validacionMensajes = {
    'descripcion': [
      { type: 'required', message: 'Descripcion requerida.' }
    ],
    'gravidez': [
      { type: 'required', message: 'Gravidez requerida.' },
    ],
    'dias': [
      { type: 'required', message: 'Dias transcurridos es requerids.' },
      { type: 'minlength', message: 'Dias transcurridos debe tener un numero valido.' },
      { type: 'pattern', message: 'Dias transcurridos debe tener un numero valido.' }
    ],
    'personas': [
      { type: 'required', message: 'Personas convividas es requeridas.' },
      { type: 'minlength', message: 'Personas convividas debe tener un numero valido.' },
      { type: 'pattern', message: 'Personas convividas debe tener un numero valido.' }
    ],
    'oxigenacion': [
      { type: 'required', message: 'Oxigenación es requeridas.' },
      { type: 'minlength', message: 'Oxigenación debe tener un numero valido.' },
      { type: 'pattern', message: 'Oxigenación debe tener un numero valido.' }
    ],
    'temperatura': [
      { type: 'required', message: 'Temperatura es requeridas.' },
      { type: 'minlength', message: 'Temperatura debe tener un numero valido.' },
      { type: 'pattern', message: 'Temperatura debe tener un numero valido.' }
    ],
  };


  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private pacienteService: PacienteService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.gravidezOptions = [
      {name: 'Baja'},
      {name: 'Media'},
      {name: 'Alta'},
    ];
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      descripcion: new FormControl('', Validators.required),
      gravidez: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      dias: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      personas: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      oxigenacion: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      temperatura: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      sintomas: this.formularioSintomas,
    });

    this.formularioSintomas.addControl('dolorCabeza', this.dolorCabeza);
    this.formularioSintomas.addControl('diarrea', this.diarrea);
    this.formularioSintomas.addControl('faltaDeGusto', this.faltaDeGusto);
    this.formularioSintomas.addControl('faltaDeOlfato', this.faltaDeOlfato);
    this.formularioSintomas.addControl('vomito', this.vomito);
    this.formularioSintomas.addControl('tos', this.tos);
    this.formularioSintomas.addControl('cansancio', this.cansancio);
    this.formularioSintomas.addControl('dificultadRespiratoria', this.dificultadRespiratoria);
    this.formularioSintomas.addControl('neumonia', this.neumonia);
  }

  validarFormulario(campo: string, tipo: any): boolean{
    return this.formulario.get(campo)!.hasError(tipo) && (this.formulario.get(campo)!.dirty || this.formulario.get(campo)!.touched)
  }

  async registrarSintomas(){
    this.loading = true;
    const momentDate = moment().format('YYYY-MM-DD');
    const momenthour = moment().format('HH:mm:ss');
    const sintomas: RegistrarSintomasModel = {
      descripcion: this.formulario.get('descripcion')?.value,
      gravidez: this.formulario.get('gravidez')?.value.name,
      diasTranscurridos: this.formulario.get('dias')?.value,
      personasConvividas: this.formulario.get('personas')?.value,
      oxigenacion: this.formulario.get('oxigenacion')?.value,
      temperatura: this.formulario.get('temperatura')?.value,
      fecha: momentDate,
      hora: momenthour,
      paciente: this.authService.user!,
      sintomas: this.formulario.get('sintomas')?.value,
    }
    console.log(sintomas);
    try {
      const resp = await this.pacienteService.registrarSintomas(sintomas)
      console.log(resp)
      this.alertService.showToast('Propuesta de trabajo registrada', 'success');
      this.formulario.reset();
      this.loading = false;
      this.router.navigate(['/empresario']);
    } catch (err) {
      this.loading = false;
      console.log(err);
    }
  }
}
