import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitasRoutingModule } from './visitas-routing.module';
import { VisitasComponent } from './pages/visitas/visitas.component';
import { VisitaComponent } from './pages/visita/visita.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VisitaDetalleComponent } from './pages/visita-detalle/visita-detalle.component';


@NgModule({
  declarations: [
    VisitasComponent,
    VisitaComponent,
    VisitaDetalleComponent
  ],
  imports: [
    CommonModule,
    VisitasRoutingModule,
    ReactiveFormsModule
  ]
})
export class VisitasModule { }
