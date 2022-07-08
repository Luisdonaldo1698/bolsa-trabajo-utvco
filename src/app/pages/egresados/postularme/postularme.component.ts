import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import * as moment from 'moment';
import { RecetaModel } from '../../../models/receta.model';
import { MedicamentoModel } from '../../../models/medicamento.model';
import { AuthService } from '../../../services/auth.service';
import { DoctorService } from '../../../services/doctor.service';
import { Router } from '@angular/router';
import { PdfMakeWrapper, Stack} from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";

PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-crear-receta',
  templateUrl: './postularme.component.html',
  styleUrls: ['./postularme.component.scss']
})
export class PostularmeComponent implements OnInit {

  loading: boolean = false;
  formulario!: FormGroup;
  fecha: Date = new Date;
  display: boolean = false;

  recomendacionesGenerales: string = '';
  medicamentos: MedicamentoModel[] = [];
  uploadedFiles: any[] = [];


  validacionMensajes = {
    'nombre': [
      { type: 'required', message: 'Nombre requerido.' }
    ],
    'recomendacion': [
      { type: 'required', message: 'Recomendación requerida.' },
    ],
  };


  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private doctorService: DoctorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      recomendacion: new FormControl('', Validators.required),
    });
  }

  validarFormulario(campo: string, tipo: any): boolean{
    return this.formulario.get(campo)!.hasError(tipo) && (this.formulario.get(campo)!.dirty || this.formulario.get(campo)!.touched)
  }

  async generarReceta(urlPdf?: string){
    const momentDate = moment().format('YYYY-MM-DD');
    const momenthour = moment().format('HH:mm:ss');
    console.log(this.formulario.value);
    const registro = this.doctorService.getRegistro();
    const receta : RecetaModel = {
      fecha: momentDate,
      hora: momenthour,
      recomendacionGeneral: this.recomendacionesGenerales,
      doctor: this.authService.user!,
      paciente: registro.paciente,
      medicamentos: this.medicamentos,
      url: urlPdf,
    }
    console.log(receta);
    this.doctorService.generarReceta(receta).then(async (resp) => {
      console.log(resp.id);
      await this.doctorService.updateRegistroConReceta(receta.url!, registro.id!);
      this.doctorService.clearRegistro();
      this.alertService.showToast('Receta creada exitosamente', 'success');
      this.loading = false;
      this.router.navigate(['/egresado']);
    }).catch(err => {+
      console.log(err);
      this.alertService.showAlert('Error', err, 'error');
      this.loading = false;
    })
  }

  uploadFile(event:any) :void{
    this.loading = true;
    const registro = this.doctorService.getRegistro();
    const file = event.files[0];
    this.doctorService.subirPdfFirebase(registro.id!, file).then(resp => {
      this.generarReceta(resp);
    });
  }

  showDialog() {
    this.display = true;
  }

  clearForm(){
    this.formulario.reset();
  }

}
