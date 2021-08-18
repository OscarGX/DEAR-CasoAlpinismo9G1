import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SweetalertService } from '../../../common/services/sweetalert.service';
import { Subscription } from 'rxjs';
import { IAdminLoginRequest } from '../../models/interfaces/admins.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  private subscription$: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private authService: AuthService,private swas: SweetalertService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.form.valid) {
      this.swas.showLoading('Espere', 'Estamos verificando los datos...');
      const loginObj: IAdminLoginRequest = {
        username: this.form.value.username,
        pass: this.form.value.password
      };
      this.subscription$.add(this.authService.adminLogin(loginObj).subscribe(data => {
        this.swas.hideLoading();
        this.router.navigateByUrl('/visitas');
      }, (e) => {
        this.swas.hideLoading();
        this.swas.showAlertGeneric('Error', 'Correo o contraseña incorrectos', 'error');
      }));
    } else {
      this.swas.showAlertGeneric('Error', 'El formulario no es válido', 'error');
    }
  }

  //#region Variables de formulario

  get isUsernameValid(): boolean {
    const usernameField = this.form.get('username');
    if (usernameField !== null)
      return usernameField.invalid && usernameField.touched;
    return false;
  }

  get isPasswordValid(): boolean {
    const passwordField = this.form.get('password');
    if (passwordField !== null)
      return passwordField.invalid && passwordField.touched;
    return false;
  }

  //#endregion

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
