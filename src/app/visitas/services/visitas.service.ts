import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVisitaResponse, IVisitante, IGuia, IZona, IRuta, IHorario, IVisitaRequest } from '../models/interfaces/visitas.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  constructor(private http: HttpClient) { }

  public getVisitas(): Observable<IVisitaResponse[]> {
    return this.http.get<IVisitaResponse[]>(`${environment.API_ENDPOINT}/visitas`);
  }

  public getVisitaById(id: string): Observable<IVisitaResponse> {
    return this.http.get<IVisitaResponse>(`${environment.API_ENDPOINT}/visitas/${id}`);
  }

  public getVisitantes(): Observable<IVisitante[]> {
    return this.http.get<IVisitante[]>(`${environment.API_ENDPOINT}/visitantes`);
  }

  public getGuias(): Observable<IGuia[]> {
    return this.http.get<IGuia[]>(`${environment.API_ENDPOINT}/guias`);
  }

  public getZonas(): Observable<IZona[]> {
    return this.http.get<IZona[]>(`${environment.API_ENDPOINT}/zonas`);
  }

  public getRutasByZoneId(zonaId: string): Observable<IRuta[]> {
    return this.http.get<IRuta[]>(`${environment.API_ENDPOINT}/rutas/${zonaId}`);
  }

  public getHorariosByZoneId(zonaId: string): Observable<IHorario[]> {
    return this.http.get<IHorario[]>(`${environment.API_ENDPOINT}/horarios/${zonaId}`);
  }

  public newVisit(visita: IVisitaRequest): Observable<IVisitaResponse> {
    return this.http.post<IVisitaResponse>(`${environment.API_ENDPOINT}/visitas`, visita);
  }

  public deleteVisitaById(id: string): Observable<IVisitaResponse> {
    return this.http.delete<IVisitaResponse>(`${environment.API_ENDPOINT}/visitas/${id}`);
  }

}
