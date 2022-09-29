import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Tag } from '../models/tag.model';
import { Contact } from '../models/contact.model';
import { Storage } from '../enums/storage.enun';
import { Auth } from '../enums/auth.enum';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor() {}

  private listContactsLocal: Contact[] = [];

  /* private counterContacts: number = Number(localStorage.getItem(Storage.Count))
  private counter = new BehaviorSubject<number>(this.counterContacts) */

  count: number = Number(localStorage.getItem(Storage.Count));
  private totalContacts = new BehaviorSubject<number>(this.count);
  public cambiaNumObs$ = this.totalContacts.asObservable();

  /**
   * Tags
   */
  tags = JSON.parse(localStorage.getItem(Storage.Tags)!);

  addTag(tag: Tag[]) {
    localStorage.setItem(Storage.Tags, JSON.stringify(tag));
  }

  getTags(): Observable<Tag[]> {
    return of(this.tags);
  }

  /**
   * Contacts
   */
  contacts = JSON.parse(localStorage.getItem(Storage.Contacts)!);

  addContactLocal(contact: Contact) {
    this.listContactsLocal.push(contact);
    localStorage.setItem(
      Storage.Contacts,
      JSON.stringify(this.listContactsLocal)
    );
  }

  //Añadir contacto editando o en detalle a localstorage
  addContactEditDetail(contact:Contact){
    localStorage.setItem(Storage.ContactEditDetail, JSON.stringify(contact))
  }

  //Obtener contacto en detalle o editando
  getContactEditDetail():Contact{
    return JSON.parse(localStorage.getItem(Storage.ContactEditDetail)!)
  }

  /* remover contacto editando */
  removeContactEditDetail(){
    localStorage.removeItem(Storage.ContactEditDetail)
  }


  increaseCounter() {
    const n = this.totalContacts.getValue() + 1;
    this.totalContacts.next(n);
    localStorage.setItem(Storage.Count, n.toString());
  }

  decreaseCounter() {
    const n = this.totalContacts.getValue() - 1;
    this.totalContacts.next(n);
    localStorage.setItem(Storage.Count, n.toString());
  }

  getContactsLocal(): Observable<Contact[]> {
    return of(this.contacts);
  }

  /*
   * Auth
   */

  setInformationAuth(accessToken:string, refreshToken:string, expiresAt:string) {
    localStorage.setItem(Auth.accessToken, accessToken);
    localStorage.setItem(Auth.refreshToken, refreshToken);
    localStorage.setItem(Auth.expiresAt, expiresAt);
  }

  removeInformationAuth() {
    localStorage.clear()
    /* localStorage.removeItem(Auth.accessToken);
    localStorage.removeItem(Auth.refreshToken);
    localStorage.removeItem(Auth.expiresAt); */
  }

}
