import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/user.model';
import { AlertService } from '../../../services/alert.service';
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { Router } from '@angular/router';
import { Roles } from '../../../models/userRol.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  rol: string = Roles.EMPRESARIO;

  loading: boolean = false;

  formulario!: FormGroup;

  validacionMensajes = {
    'nombre': [
      { type: 'required', message: 'Nombre requerido.' }
    ],
    'email': [
      { type: 'required', message: 'Correo electrónico requerido.' },
      { type: 'pattern', message: 'Ingresar un correo electrónico válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caractéres.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'La contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caractéres.' }
    ]
  };


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      confirm_password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ]))
    });
  }

  changeRol(rol: string){
    this.rol = rol;
    this.formulario.reset();
  }

  validarFormulario(campo: string, tipo: any): boolean{
    return this.formulario.get(campo)!.hasError(tipo) && (this.formulario.get(campo)!.dirty || this.formulario.get(campo)!.touched)
  }

  async register(){
    this.loading = true;
    const user: UserModel = {
      nombre: this.formulario.get('nombre')?.value,
      email: this.formulario.get('email')?.value,
      password: this.formulario.get('password')?.value,
      rol: this.rol,
    }
    try {
      await this.authService.signUp(user)
      this.formulario.reset();
      this.loading = false;
      this.router.navigate([`/${this.rol}`]);
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  }
}
