import { Component, OnInit } from '@angular/core';
import { VisitasService } from '../../services/visitas.service';
import { IVisitaResponse } from '../../models/interfaces/visitas.interface';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visita-detalle',
  templateUrl: './visita-detalle.component.html',
  styleUrls: ['./visita-detalle.component.scss']
})
export class VisitaDetalleComponent implements OnInit {

  public visita!: IVisitaResponse;
  private subscription$: Subscription = new Subscription();
  private id: string = '';

  constructor(private visitasService: VisitasService, private route: ActivatedRoute, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id ? id : '';
  }

  ngOnInit(): void {
    this.subscription$.add(this.visitasService.getVisitaById(this.id).subscribe(data => {
      this.visita = data;
    }, (e) => {
      this.router.navigateByUrl('/visitas');
    }));
  }

}
