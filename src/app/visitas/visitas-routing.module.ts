import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitasComponent } from './pages/visitas/visitas.component';
import { VisitaComponent } from './pages/visita/visita.component';
import { VisitaDetalleComponent } from './pages/visita-detalle/visita-detalle.component';

const routes: Routes = [
  {
    path: '',
    component: VisitasComponent
  },
  {
    path: 'nueva',
    component: VisitaComponent
  },
  {
    path: ':id',
    component: VisitaDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitasRoutingModule { }
