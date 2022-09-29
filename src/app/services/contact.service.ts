import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, map, BehaviorSubject } from "rxjs";

import { Contact } from '../models/contact.model';
import { ResponseApi } from '../models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  stateForm:boolean = true;
  private statusFormPrivate: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.stateForm);

  constructor(private http: HttpClient) { }

  /**
   * Obtener y asignar el estado del formulario
   */
   get statusFormObservable() {
    return this.statusFormPrivate.asObservable();
  }
  set statusFormObservableData(data: boolean) {
    this.statusFormPrivate.next(data);
  }

  getContacts(offset:number, limit:number = 10, searchTerm:string): Observable<ResponseApi> {
    const body = {
      "offset": offset,
      "limit": limit,
      "searchTerm": ""
    }
    return this.http.put<ResponseApi>(`${environment.baseUrl}/contacts`,body);
  }

  deleteContact(id:number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${environment.baseUrl}/contacts/delete/${id}`);
  }

  createContact(contact:Contact): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${environment.baseUrl}/contacts/create`, contact);
  }

  updateContact(contact:Contact): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${environment.baseUrl}/contacts/update/${contact.contactId}`, contact);
  }

}
