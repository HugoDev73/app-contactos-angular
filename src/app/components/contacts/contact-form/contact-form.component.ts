import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

import { Contact } from 'src/app/models/contact.model';
import { Email, InputEmail } from 'src/app/models/email.model';
import { TypePhone, InputPhone } from 'src/app/models/enumPhone';
import { Phone } from 'src/app/models/phone.model';
import { Tag } from 'src/app/models/tag.model';
import { ContactService } from 'src/app/services/contact.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { EmailComponent } from '../../dinamic/email/email.component';
import { HomeComponent } from '../../dinamic/phones/home/home.component';
import { MovilComponent } from '../../dinamic/phones/movil/movil.component';
import { WhatsappComponent } from '../../dinamic/phones/whatsapp/whatsapp.component';
import { DynamicEmailDirective } from '../../directives/dynamic-email.directive';
import { DynamicPhoneDirective } from '../../directives/dynamic-phone.directive';
import { ResponseType } from '../../enums/response.enum';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  data$!: Observable<Contact>;
  isCreate: boolean = true;

  contact!: Contact;
  emails!: Email[];
  tags: Tag[] = [];
  phones!: Phone[];

  tag: string = '';

  listContactsLocal: Contact[] = [];
  listTags: Tag[] = [];
  listPhones: Phone[] = [];
  listEmails: Email[] = [];

  formContact!: FormGroup;
  urlImage: string = '';

  isCreatePhone: boolean = true;

  @ViewChild(DynamicPhoneDirective) dynamic!: DynamicPhoneDirective;
  @ViewChild(DynamicEmailDirective) dynamicEmail!: DynamicEmailDirective;

  constructor(
    private toastr: ToastrService,
    private _contactService: ContactService,
    private router: Router,
    private _dataStorage: DataStorageService,
    private fb:FormBuilder

  ) {
    this.contact = history.state;
    console.log(this.contact);
    
  }

  ngOnInit(): void {
    this.getStatusForm();
    this.onCreateForm();
    this.onGetTags();
    this.onGetContactsLocal();
  }

  errorMessage(message: any) {
    this.toastr.error(message, 'Error');
  }

  onGetTags() {
    this.listTags = this._dataStorage.tags
    //this._dataStorage.getTags().subscribe((data) => (this.listTags = data));
  }

  onGetContactsLocal() {
    this._dataStorage
      .getContactsLocal()
      .subscribe((data) => (this.listContactsLocal = data));
  }

  getStatusForm() {
    this._contactService.statusFormObservable.subscribe(
      (data) => (this.isCreate = data)
    );
  }

  getContactData() {
    this._contactService.contactObservable.subscribe((response: Contact) => {
      this.contact = response;
      this.listEmails = response.contactEmails;
      this.tags = response.contactTags;
      this.listPhones = response.contactPhones;
    });
  }

  createFormContact(contact?: Contact) {
    /* this.formContact = this.fb.group({
      contactId: [!this.contact ? null : this.contact.contactId, Validators.required]
    }) */
    this.formContact = new FormGroup({
      contactId: new FormControl(!this.contact ? null : this.contact.contactId),
      contactFirstName: new FormControl(
        !this.contact ? null : this.contact.contactFirstName!,
        Validators.required
      ),
      contactLastName: new FormControl(
        !this.contact ? null : this.contact.contactLastName!,
        Validators.required
      ),
      contactCompany: new FormControl(
        !this.contact ? null : this.contact.contactCompany!,
        Validators.required
      ),
      contactBirthday: new FormControl(
        !this.contact ? null : this.contact.contactBirthday!,
        [Validators.required]
      ),
      contactNotes: new FormControl(
        !this.contact ? null : this.contact.contactNotes!,
        Validators.required
      ),
      contactAlias: new FormControl(
        !this.contact ? null : this.contact.contactAlias!,
        Validators.required
      ),
    });
  }

  onCreateForm() {
    if (this.isCreate) {
      this.createFormContact();
    } else {
      this.getContactData();
      this.createFormContact(this.contact);
    }
  }

  /* 
  Logica emails  
  */
  createComponentEmail(value?: string) {
    var comp: any = this.getEmailComponent(value);
    const viewContainerRef = this.dynamicEmail.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<InputEmail>(
      comp.Component
    );
    componentRef.instance.data = comp.data;
    componentRef.instance.emailOutput.subscribe((emailValue: string) => {
      if (value != undefined) {
        this.listEmails.map(function (item) {
          if (item.emailValue == value) item.emailValue = emailValue;
        });
      } else {
        const email: Email = { emailValue: emailValue };
        this.listEmails.push(email);
      }
    });
  }

  getEmailComponent(value?: string): any {
    return {
      data: value,
      Component: EmailComponent,
    };
  }

  onRemoveEmail(emailValue: string) {
    this.removeElementEmail(this.listEmails, emailValue);
    console.log(this.listEmails);
  }

  removeElementEmail(arr: Email[], element: string) {
    arr.forEach((value, index) => {
      if (value['emailValue'] == element) arr.splice(index, 1);
    });
  }

  /* 
  Logica Tags  
  */
  tagExists(value: string, tags: Tag[]): boolean {
    const index = tags.findIndex(it => it.tagValue == value);
    if(index >= 0){
      this.errorMessage(`Ya existe "${value}": Ingrese uno diferente`);
      return true;
    }
   /*  for (var i = 0; i < tags.length; i++) {
      if (tags[i].tagValue == value) {
        this.errorMessage(`Ya existe "${value}": Ingrese uno diferente`);
        return true;
      }
    } */
    return false;
  }

  onAddTag(valueTag: string) {
    const tag: Tag = { tagValue: valueTag };
    if (valueTag != '') {
      if (!this.tagExists(valueTag, this.listTags)) {
        this.listTags = this.listTags || [];
        this.listTags.push(tag);
        this._dataStorage.addTag(this.listTags);
      }
    } else {
      this.errorMessage('Ingrese nombre de tag');
    }
  }

  onAddMyTags(valueTag: string) {
    const tag: Tag = { tagValue: valueTag };
    if (!this.tagExists(valueTag, this.tags)) {
      this.tags.push(tag);
    }
  }

  onRemoveTag(valueTag: string) {
    const tag: Tag = { tagValue: valueTag };
    this.removeElement(this.tags, valueTag);
  }

  removeElement(arr: Tag[], element: string) {
    arr.forEach((value, index) => {
      if (value['tagValue'] == element) arr.splice(index, 1);
    });
  }

  /* 
  generate dynamic phones
  */
  phoneType: string = '';
  createComponentPhone(type: string, value?: string) {
    console.log(type);
    this.phoneType = type;
    var objectType: any = this.getObjectType(this.phoneType, value);
    const viewContainerRef = this.dynamic.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<InputPhone>(
      objectType.Component
    );
    componentRef.instance.data = objectType.data;

    componentRef.instance.phone.subscribe((phoneValue: string) => {
      if (value != undefined) {
        this.listPhones.map(function (item) {
          if (item.phoneValue == value) {
            item.phoneValue = phoneValue;
            item.icon = objectType.data.icon;
          }
        });
      } else {
        const number: Phone = {
          phoneValue: phoneValue,
          phoneType: this.phoneType,
          icon: objectType.data.icon,
        };
        this.listPhones.push(number);
      }
    });
  }

  getObjectType(type: string, value?: string): any {
    switch (type) {
      case TypePhone.Home:
        return {
          data: { icon: 'bi bi-house', number: value },
          Component: HomeComponent,
        };
      case TypePhone.Mobile:
        return {
          data: { icon: 'bi bi-phone', number: value },
          Component: MovilComponent,
        };
      case TypePhone.Whatsapp:
        return {
          data: { icon: 'bi bi-whatsapp', number: value },
          Component: WhatsappComponent,
        };
    }
  }

  onEditPhone(phone: Phone) {
    this.createComponentPhone(phone.phoneType);
  }

  getContact(): Contact {
    const contact: Contact = this.formContact.value;
    contact.contactPhoto = this.urlImage;
    contact.contactEmails = this.listEmails;
    contact.contactTags = this.tags;
    contact.contactPhones = this.listPhones;
    return contact;
  }

  saveContact() {
    const contactItem = this.getContact();
    this.listContactsLocal = this.listContactsLocal || [];
    this._contactService.createContact(contactItem).subscribe((data) => {
      if (data.statusCode == ResponseType.Ok) {
        this.listContactsLocal.push(contactItem);
        this._dataStorage.addContactLocal(contactItem);
      }
    });
  }

  updateContact() {
    const contactItem = this.getContact();
    this._contactService.updateContact(contactItem).subscribe((data) => {
      if (data.statusCode == ResponseType.Ok) {
        this.router.navigate(['admin/contacts']);
      }
    });
  }

  /* 
  Enviar formulario 
  */
  onSubmit() {
    console.log(this.formContact);

    if (this.formContact.valid) {
      if (this.isCreate) {
        this.saveContact();
        this._dataStorage.increaseCounter();
      } else {
        this.updateContact();
      }
      this.router.navigate(['admin/contacts']);
    } else {
      console.log('Llene los campos');
    }
  }

  onSelectImage(e: any) {
    console.log(e);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.urlImage = event.target.result;
        console.log(this.urlImage);
      };
    }
  }
}
