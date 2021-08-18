import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SweetalertService } from '../../../common/services/sweetalert.service';
import { VisitantesService } from '../../services/visitantes.service';
import { Subscription } from 'rxjs';
import { IVisitanteRequest } from '../../models/interfaces/visitantes.interface';

@Component({
  selector: 'app-visitante',
  templateUrl: './visitante.component.html',
  styleUrls: ['./visitante.component.scss']
})
export class VisitanteComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  private subscription$: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private swas: SweetalertService, private visitantesService: VisitantesService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  newVisitante(): void {
    if (this.form.valid) {
      const visitante: IVisitanteRequest = {
        nombre: this.form.value.nombre,
        apellidoPaterno: this.form.value.apellidoPaterno,
        apellidoMaterno: this.form.value.apellidoMaterno,
        edad: this.form.value.edad,
        email: this.form.value.email,
        username: this.form.value.username,
        telefono: this.form.value.telefono,
        direccion: this.form.value.direccion
      };
      this.subscription$.add(this.visitantesService.newVisitante(visitante).subscribe(() => {
        this.swas.hideLoading();
        this.swas.showAlertGeneric('Ok', 'El visitante fue registrado correctamente', 'success');
        this.form.reset();
      }, () => {
        this.swas.hideLoading();
        this.swas.showAlertGeneric('Error', 'Hubo un error al registrar al visitante, intenta más tarde', 'error');
      }));
    } else {
      this.swas.showAlertGeneric('Error', 'El formulario no es válido', 'error');
    }
  }

  //#region Variables de formulario

  
  get isNombreValid(): boolean {
    const usernameField = this.form.get('nombre');
    if (usernameField !== null)
    return usernameField.invalid && usernameField.touched;
    return false;
  }

  get isApellidoPValid(): boolean {
    const usernameField = this.form.get('apellidoPaterno');
    if (usernameField !== null)
      return usernameField.invalid && usernameField.touched;
    return false;
  }

  get isApellidoMValid(): boolean {
    const usernameField = this.form.get('apellidoMaterno');
    if (usernameField !== null)
      return usernameField.invalid && usernameField.touched;
    return false;
  }

  get isEdadValid(): boolean {
    const usernameField = this.form.get('edad');
    if (usernameField !== null)
      return usernameField.invalid && usernameField.touched;
    return false;
  }

  get isEmailValid(): boolean {
    const usernameField = this.form.get('email');
    if (usernameField !== null)
      return usernameField.invalid && usernameField.touched;
    return false;
  }

  get isUsernameValid(): boolean {
    const usernameField = this.form.get('username');
    if (usernameField !== null)
      return usernameField.invalid && usernameField.touched;
    return false;
  }

  get isTelefonoValid(): boolean {
    const usernameField = this.form.get('telefono');
    if (usernameField !== null)
      return usernameField.invalid && usernameField.touched;
    return false;
  }

  get isDireccionValid(): boolean {
    const usernameField = this.form.get('direccion');
    if (usernameField !== null)
      return usernameField.invalid && usernameField.touched;
    return false;
  }

  //#endregion
  
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
