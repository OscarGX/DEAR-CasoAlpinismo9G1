import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVisitanteResponse, IVisitanteRequest } from '../models/interfaces/visitantes.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitantesService {

  constructor(private http: HttpClient) { }

  public newVisitante(body: IVisitanteRequest): Observable<IVisitanteResponse> {
    return this.http.post<IVisitanteRequest>(`${environment.API_ENDPOINT}/visitantes`, body);
  }
}
