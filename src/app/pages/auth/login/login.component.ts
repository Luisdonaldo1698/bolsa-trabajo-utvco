import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/user.model';
import { AlertService } from '../../../services/alert.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  formulario!: FormGroup;

  validacionMensajes = {
    'email': [
      { type: 'required', message: 'Correo electrónico requerido.' },
      { type: 'pattern', message: 'Ingresar un correo electrónico válido.' }
    ],
    'password': [
      { type: 'required', message: 'La contraseña es requerida.' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caractéres.' }
    ]
  };

  private _unsubscribeAll: Subject<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
    this._unsubscribeAll.unsubscribe();
  }

  initForm() {
    this.formulario = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

  validarFormulario(campo: string, tipo: any): boolean{
    return this.formulario.get(campo)!.hasError(tipo) && (this.formulario.get(campo)!.dirty || this.formulario.get(campo)!.touched)
  }

  async login(){
    try {
      const resp = await this.authService.login(this.formulario.get('email')?.value, this.formulario.get('password')?.value);
      this.authService.getUser(resp.user?.uid!)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: UserModel[]) => {
          if(user.length){
            const usuario = user[0];
            this.authService.autenticado = true;
            this.router.navigate([`/${usuario.rol}`], {replaceUrl: true});
          }
        });
    } catch (err: any) {
      console.log(err);
      this.alertService.showAlert('error', err, 'error');
    }
  }

}
