import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitanteComponent } from './pages/visitante/visitante.component';

const routes: Routes = [
  {
    path: 'nuevo',
    component: VisitanteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitantesRoutingModule { }
