import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';





@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  
  contactList!: Contact[];
  successMessage = '';
  showMessage: boolean = false;

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;

  page = 1;
  pageSize = 10;
  collectionSize = 0;
  limit:number = 10;
  offset:number = this.page + 10

 


  constructor(private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService) {
  }

  ngOnInit(): void {
    this.onShowContacts();
  }


  onShowContacts() {
  
    console.log(this.page);
   var offset = (this.page - 1)*this.limit

    
    this.contactService.getContacts(offset, this.limit, '').subscribe(data => {
      this.contactList = data.result.list;
      this.collectionSize = data.result.count;
    });
  }

  onEditContact(contact: Contact) {
    this.router.navigate(['edit'], { relativeTo: this.route });
    this.contactService.contactObservableData = contact;
    this.contactService.statusFormObservableData = false;
  }

  onDetailContact(contact: Contact) {
    this.router.navigate(['detail'], { relativeTo: this.route });
    this.contactService.contactObservableData = contact;
    console.log(contact);
  }

  onDeleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(data => {
      this.showMessage = true;
      this.successMessage = data.friendlyMessage;
      //setTimeout(() => this.selfClosingAlert.close(), 3000);
      console.log(data)
    })

  }

  onNewContact() {
    this.contactService.statusFormObservableData = true;
    this.router.navigate(['create'], { relativeTo: this.route });
  }


}
