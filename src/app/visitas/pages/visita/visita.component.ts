import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IVisitante, IGuia, IZona, IRuta, IHorario, IVisitaRequest } from '../../models/interfaces/visitas.interface';
import { Subscription } from 'rxjs';
import { VisitasService } from '../../services/visitas.service';
import { SweetalertService } from '../../../common/services/sweetalert.service';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.scss']
})
export class VisitaComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  private subscription$: Subscription = new Subscription();
  public visitantes: IVisitante[] = [];
  public guias: IGuia[] = [];
  public zonas: IZona[] = [];
  public rutas: IRuta[] = [];
  public horarios: IHorario[] = [];

  constructor(private fb: FormBuilder, private visitaService: VisitasService, private swas: SweetalertService) {
    this.createForm();
    this.disableControl('visitante');
    this.disableControl('guia');
    this.disableControl('zona');
    this.disableControl('ruta');
    this.disableControl('horario');
  }

  ngOnInit(): void {
    this.getVisitantes();
    this.getGuias();
    this.getZonas();
  }

  private createForm(): void {
    this.form = this.fb.group({
      visitante: ['', [Validators.required]],
      guia: ['',[Validators.required]],
      zona: ['',[Validators.required]],
      ruta: ['', [Validators.required]],
      horario: ['', [Validators.required]]
    });
  }

  private getVisitantes(): void {
    this.subscription$.add(this.visitaService.getVisitantes().subscribe(data => {
      this.visitantes = data;
      this.enableControl('visitante');
    }, () => {

    }));
  }

  private getGuias(): void {
    this.subscription$.add(this.visitaService.getGuias().subscribe(data => {
      this.guias = data;
      this.enableControl('guia');
    }, () => {

    }));
  }

  private getZonas(): void {
    this.subscription$.add(this.visitaService.getZonas().subscribe(data => {
      this.zonas = data;
      this.enableControl('zona');
    }, () => {

    }));
  }

  onZonaChange(id: string): void {
    if (id === null) {
      return;
    }
    if(id.length > 0) {
      this.form.get('ruta')?.setValue('');
      this.form.get('horario')?.setValue('');
      this.getRutasByZoneId(id);
      this.getHorariosByZoneId(id);
    }
  }

  private getRutasByZoneId(id: string): void {
    this.subscription$.add(this.visitaService.getRutasByZoneId(id).subscribe(data => {
      this.rutas = data;
      this.enableControl('ruta');
    }, () => {
      this.disableControl('ruta');
    }));
  }

  private getHorariosByZoneId(id: string): void {
    this.subscription$.add(this.visitaService.getHorariosByZoneId(id).subscribe(data => {
      this.horarios = data;
      this.enableControl('horario');
    }, () => {
      this.disableControl('horario');
    }));
  }  

  newVisit(): void {
    if (this.form.valid) {
      const visit: IVisitaRequest = {
        fecha: new Date().toISOString(),
        visitante: this.form.value.visitante,
        guia: this.form.value.guia,
        zona: this.form.value.zona,
        ruta: this.form.value.ruta,
        horario: this.form.value.horario
      };
      this.swas.showLoading('Espere', 'Estamos registrando los datos...');
      this.subscription$.add(this.visitaService.newVisit(visit).subscribe(data => {
        this.swas.hideLoading();
        this.swas.showAlertGeneric('Ok', 'La visita se guardó correctamente', 'success');
        this.form.reset();
      }, () => {
        this.swas.hideLoading();
        this.swas.showAlertGeneric('Error', 'Algo salió mal, inenta más tarde', 'error');
      }));
    } else {
      this.swas.showAlertGeneric('Error', 'El formulario no es válido', 'error');
    }
  }

  private disableControl(controlName: string): void {
    this.form.get(controlName)?.disable();
  }

  private enableControl(controlName: string): void {
    this.form.get(controlName)?.enable();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

}
