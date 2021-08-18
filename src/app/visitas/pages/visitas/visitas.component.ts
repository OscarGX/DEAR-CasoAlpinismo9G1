import { Component, OnInit, OnDestroy } from '@angular/core';
import { VisitasService } from '../../services/visitas.service';
import { Subscription } from 'rxjs';
import { IVisitaResponse } from '../../models/interfaces/visitas.interface';
import { SweetalertService } from '../../../common/services/sweetalert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit, OnDestroy {

  private subscription$: Subscription = new Subscription();
  public visitas: IVisitaResponse[] = [];

  constructor(private visitasService: VisitasService, private swas: SweetalertService, private router: Router) { }

  ngOnInit(): void {
    this.subscription$.add(this.visitasService.getVisitas().subscribe(data => {
      this.visitas = data;
    }, (e) => {
    })); 
  }

  async deleteVisita(index: number, id: string): Promise<void> {
    const resp = await this.swas.showConfirmDialog('¿Está seguro?',
    'Está a punto de eliminar esta visita, esta acción no se puede deshacer', 'question', 'Si, eliminar');
    if (resp.isConfirmed) {
      this.swas.showLoading('Espere', 'Estamos eliminando la visita...');
      this.subscription$.add(this.visitasService.deleteVisitaById(id).subscribe(() => {
        this.swas.hideLoading();
        this.swas.showAlertGeneric('Ok', 'La visita se eliminó correctamente', 'success');
        this.visitas = this.visitas.filter(visita => visita.id !== id);
      },() => {
        this.swas.hideLoading();
        this.swas.showAlertGeneric('Error', 'Algo salió mal, intente más tarde.', 'error');
      }));
    }
  }

  visitaDetail(id: string): void {
    this.router.navigateByUrl(`/visitas/${id}`);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
