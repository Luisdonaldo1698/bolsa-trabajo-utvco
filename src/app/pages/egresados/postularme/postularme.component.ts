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
    if(this.recomendacionesGenerales.trim().length < 1 && this.medicamentos.length < 1){
      this.alertService.showAlert('Receta incompleta', 'Debe agregar recomendaciones generales o medicamentos para proceder', 'warning');
      return;
    }
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

  agregarMedicamento(){
    const medicamento: MedicamentoModel = {
      nombre: this.formulario.get('nombre')?.value,
      recomendacion: this.formulario.get('recomendacion')?.value,
    }
    this.medicamentos.push(medicamento);
    this.formulario.reset();
    this.display = false;
  }

  showDialog() {
    this.display = true;
  }

  clearForm(){
    this.formulario.reset();
  }

  generarPdf(save: boolean){
    this.loading = true;
    const registro = this.doctorService.getRegistro();
    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageOrientation('portrait');
    pdf.pageMargins(20);
    const user = this.authService.user;
    const momentDate = moment().format('YYYY-MM-DD');
    const momenthour = moment().format('HH:mm:ss');

    if(this.recomendacionesGenerales.trim().length > 0){
      pdf.add(
        new Stack([
          `Doctor: ${user?.nombre.toUpperCase()}`,
          `Cédula: ${user?.cedula ? user.cedula: 'NA'}`,
          `Fecha: ${momentDate}`,
          `Paciente: ${registro.paciente.nombre.toUpperCase()}`
        ]).margin([30, 15, 30, 5]).bold().end
      );
    }

    if(this.recomendacionesGenerales.trim().length > 0){
      pdf.add(
        new Stack([
          'Recomendaciones generales:'
        ]).margin([30, 15, 30, 5]).bold().end
      );
      pdf.add(
        new Stack([
          `${this.recomendacionesGenerales}`,
        ]).margin([30, 0, 30, 0]).end
      );
    }

    if(this.medicamentos.length > 0) {
      pdf.add(
        new Stack([
          'Tratamiento:'
        ]).margin([30, 15, 30, 0]).bold().end
      );
      this.medicamentos.forEach((tratamiento, indice) => {
        pdf.add(
          new Stack([
            `${ indice + 1 }.- ${ tratamiento.nombre }, ${ tratamiento.recomendacion }`,
          ]).margin([30, 10, 30, 0]).end
        );
        pdf.add(
          new Stack([
            `${ tratamiento.recomendacion }`
          ]).margin([50, 0, 30, 10]).end
        );
      });
    }
    if(save)
    pdf.create().getBlob(pdf => {
      this.doctorService.subirPdfFirebase(registro.id!, pdf).then(resp => {
        this.generarReceta(resp);
      });
    });
    else{
      this.loading = false;
      pdf.create().open()
    }
  }

}
