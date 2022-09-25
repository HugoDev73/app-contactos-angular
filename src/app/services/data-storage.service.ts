import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tag } from '../models/tag.model';
import { Contact } from '../models/contact.model';

enum Storage{
  Tags = 'tags',
  Contacts = 'contacts'
}

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }


  /**
   * Tags
   */
  tags = JSON.parse(localStorage.getItem(Storage.Tags)!)
 
  addTag(tag:Tag[]){
    localStorage.setItem(Storage.Tags,JSON.stringify(tag))
  }

  getTags():Observable<Tag[]>{
    return of(this.tags);
  }

  /**
   * Contacts
   */
   contacts = JSON.parse(localStorage.getItem(Storage.Contacts)!)

  addContactLocal(contact:Contact[]){
    localStorage.setItem(Storage.Contacts, JSON.stringify(contact));
  }

  getContactsLocal():Observable<Contact[]>{
    return of(this.contacts);
  }

  getTotalContacts():Observable<number>{
    return of(this.contacts.length);
  }

}
