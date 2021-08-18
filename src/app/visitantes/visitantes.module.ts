import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitantesRoutingModule } from './visitantes-routing.module';
import { VisitanteComponent } from './pages/visitante/visitante.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VisitanteComponent
  ],
  imports: [
    CommonModule,
    VisitantesRoutingModule,
    ReactiveFormsModule
  ]
})
export class VisitantesModule { }
