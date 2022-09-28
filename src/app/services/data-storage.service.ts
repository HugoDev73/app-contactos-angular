import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Tag } from '../models/tag.model';
import { Contact } from '../models/contact.model';
import { Storage } from '../enums/storage.enun';



@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor() {}

  private listContactsLocal: Contact[] = [];
  private listLocal = new BehaviorSubject<Contact[]>([]);
  listLocal$ = this.listLocal.asObservable();

  private counterContacts: number = Number(localStorage.getItem(Storage.Count))
  private counter = new BehaviorSubject<number>(this.counterContacts)




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
    this.listContactsLocal.push(contact)
    localStorage.setItem(Storage.Contacts, JSON.stringify(this.listContactsLocal));
    this.listLocal.next(this.listContactsLocal)
  }

  increaseCounter(){
    const counter = Number(localStorage.getItem(Storage.Count))
    localStorage.setItem(Storage.Count, ( counter+1).toString() )
  }

  decreaseCounter(){
    const counter = Number(localStorage.getItem(Storage.Count))
    localStorage.setItem(Storage.Count, ( counter-1).toString() )
  }


  getContactsLocal(): Observable<Contact[]> {
    return of(this.contacts);
  }


    
}
