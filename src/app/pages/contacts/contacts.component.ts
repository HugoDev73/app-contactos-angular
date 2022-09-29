import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResponseType } from 'src/app/enums/response.enum';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contactList!: Contact[];
  successMessage = '';
  showMessage: boolean = false;


  page = 1;
  pageSize = 10;
  collectionSize = 0;
  limit: number = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private toastr: ToastrService,
    private _dataStorage: DataStorageService
  ) {}

  ngOnInit(): void {
    this.onShowContacts();
  }

  onShowContacts() {
    console.log(this.page);
    var offset = (this.page - 1) * this.limit;
    this.contactService
      .getContacts(offset, this.limit, '')
      .subscribe((data) => {
        this.contactList = data.result.list;
        this.collectionSize = data.result.count;
      });
  }

  onEditContact(contact: Contact) {
    this.router.navigate(['edit'], { relativeTo: this.route, state:{contact: contact} });
    this.contactService.statusFormObservableData = false;
  }

  onDetailContact(contact: Contact) {
    this.router.navigate(['detail'], { relativeTo: this.route, state:{contact: contact} });
  }

  onDeleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe((data) => {
      if (data.statusCode == ResponseType.Ok) {
        this._dataStorage.decreaseCounter();
      } 
    });
  }

  onNewContact() {
    this.contactService.statusFormObservableData = true;
    this.router.navigate(['create'], { relativeTo: this.route });
  }


}
