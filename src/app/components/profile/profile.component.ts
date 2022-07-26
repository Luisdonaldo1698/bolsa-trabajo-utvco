import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Roles } from '../../models/userRol.enum';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { EgresadoService } from '../../services/egresado.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() rol: string = '';

  loading: boolean = false;

  formulario!: FormGroup;

  sexoOptions: {name: string}[];

  user: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private egresadoService: EgresadoService,
    private alertService: AlertService,
  ) {
    this.sexoOptions = [
      {name: 'Masculino'},
      {name: 'Femenino'},
    ];
    this.user = this.authService.user!;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: new FormControl({value: this.user.nombre, disabled: true}, []),
      email: new FormControl({value: this.user.email, disabled: true}, []),
      telefono: new FormControl(this.user.telefono, []),
      edad: new FormControl(this.user.edad, []),
      sexo: new FormControl(this.user.sexo, []),
      cedula: new FormControl(this.user.cedula, []),
    });
  }

  validarFormulario(campo: string, tipo: any): boolean{
    return this.formulario.get(campo)!.hasError(tipo) && (this.formulario.get(campo)!.dirty || this.formulario.get(campo)!.touched)
  }

  async updateProfile(){
    this.loading = true;
    try {
      if(this.rol === Roles.EGRESADO){
        const resp = await this.egresadoService.updateProfile(this.user.id!, this.formulario.value);
        this.alertService.showAlert('Perfil actualizado', 'Se ha actualizado tu perfil correctamente', 'success');
        this.loading = false;
      }
    } catch (err: any) {
      console.log(err);
      this.loading = false;
      this.alertService.showAlert('Perfil actualizado', err, 'error');
    }
  }

}
