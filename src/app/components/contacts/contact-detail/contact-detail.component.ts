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
  emails!:Email[];
  phones!:Phone[];
  tags!:Tag[];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.onGetContacto();
  }

  onGetContacto(){
    this.contactService.contactObservable.subscribe((response:Contact) => {
      this.contact = response;
      this.emails = response.contactEmails;
      this.phones = response.contactPhones;
      this.tags = response.contactTags;
      console.log(this.emails[0])
    })
  }

}
