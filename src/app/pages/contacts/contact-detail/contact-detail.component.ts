import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { Email } from 'src/app/models/email.model';
import { Phone } from 'src/app/models/phone.model';
import { Tag } from 'src/app/models/tag.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  data$!:Observable<Contact>;
  contact!:Contact;
  listEmails!:Email[];
  listPhones!:Phone[];
  tags!:Tag[];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.getContactData();
  }


  getContactData() {
    this.contact = history.state.contact;
    this.listEmails = this.contact.contactEmails;
    this.tags = this.contact.contactTags;
    this.listPhones = this.contact.contactPhones;
  }

}
