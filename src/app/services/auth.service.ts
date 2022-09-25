import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authUser:string, authPassword:string): Observable<ResponseApi> {
    const body = {
      "authUser": authUser,
      "authPassword": authPassword
    };
    return this.http.put<ResponseApi>(`${environment.baseUrl}/auth/login`,body);
  }

  logout():Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${environment.baseUrl}/auth/logout`);
  }

  isAuth():boolean{
    const token = localStorage.getItem('accessToken');
    if(!token || token == undefined){
      return false;
    }
    return true;
  }

  refreshToken():Observable<ResponseApi>{
    const refreshToken = localStorage.getItem('refreshToken')
    return this.http.put<ResponseApi>(`${environment.baseUrl}/auth/refresh`, {refreshToken});
  }
  
}
