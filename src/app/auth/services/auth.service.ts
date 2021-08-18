import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAdminLoginResponse, IAdminLoginRequest } from '../models/interfaces/admins.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public adminLogin(adminCredentials: IAdminLoginRequest): Observable<IAdminLoginResponse> {
    return this.http.post<IAdminLoginResponse>(`${environment.API_ENDPOINT}/admins`, adminCredentials);
  }

}
