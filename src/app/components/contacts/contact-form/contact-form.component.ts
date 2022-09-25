import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  data$!: Observable<Contact>;
  isCreate: boolean = true;

  contact!: Contact;
  emails!: Email[];
  tags: Tag[] = [];
  phones!: Phone[];

  tag: string = ''

  listContactsLocal: Contact[] = [];
  listTags: Tag[] = [];
  listPhones: Phone[] = [];
  listEmails: Email[] = [];

  createContact!: FormGroup;
  urlImage: string = "";

  isCreatePhone: boolean = true;



  @ViewChild(DynamicPhoneDirective) dynamic!: DynamicPhoneDirective
  @ViewChild(DynamicEmailDirective) dynamicEmail!: DynamicEmailDirective

  constructor(private _contactService: ContactService,
    private router: Router,
    private _dataStorage: DataStorageService) { }

  ngOnInit(): void {
    this.getStatusForm();
    this.onCreateForm();
    this.onGetTags();
    this.onGetContactsLocal();
  }

  onGetTags() {
    this._dataStorage.getTags().subscribe(data => this.listTags = data)
  }

  onGetContactsLocal() {
    this._dataStorage.getContactsLocal().subscribe(data => this.listContactsLocal = data)
  }

  getStatusForm() {
    this._contactService.statusFormObservable.subscribe(data => this.isCreate = data)
  }

  onCreateForm() {
    if (this.isCreate) {
      this.createContact = new FormGroup({
        'contactId': new FormControl(1, Validators.required),
        'contactFirstName': new FormControl(null, Validators.required),
        'contactLastName': new FormControl(null, Validators.required),
        'contactCompany': new FormControl(null, Validators.required),
        'contactBirthday': new FormControl(null, [Validators.required,]),
        'contactNotes': new FormControl(null, Validators.required),
        'contactAlias': new FormControl(null, Validators.required)
        /*        'contactEmails': new FormArray([]),
               'contactTags': new FormArray([]) */
      });
    } else {
      this._contactService.contactObservable.subscribe((response: Contact) => {
        this.contact = response;
        this.listEmails = response.contactEmails;
        this.tags = response.contactTags;
        this.listPhones = response.contactPhones;
      })
      this.createContact = new FormGroup({
        'contactId': new FormControl(1, Validators.required),
        'contactFirstName': new FormControl(this.contact.contactFirstName, Validators.required),
        'contactLastName': new FormControl(this.contact.contactLastName, Validators.required),
        'contactCompany': new FormControl(this.contact.contactCompany, Validators.required),
        'contactBirthday': new FormControl(this.contact.contactBirthday, Validators.required),
        'contactNotes': new FormControl(this.contact.contactNotes, Validators.required),
        'contactAlias': new FormControl(this.contact.contactAlias, Validators.required)
      });
    }
  }

  /* 
  Logica emails  
  */
  createComponentEmail(value?: string) {
    console.log(value)

    var comp: any = this.getEmailComponent(value)
    const viewContainerRef = this.dynamicEmail.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<InputEmail>(comp.Component);
    componentRef.instance.data = comp.data;
    if (value != undefined) {
      componentRef.instance.emailOutput.subscribe((emailValue: string) => {
        this.listEmails.map(function (item) {
          if (item.emailValue == value) {
            item.emailValue = emailValue;
          }
        });
      })
    } else {
      componentRef.instance.emailOutput.subscribe((emailValue: string) => {
        const email: Email = { emailId: 0, emailValue: emailValue }
        console.log(email)
        this.listEmails.push(email)
        console.log(this.listEmails);
      })
    }
  }

  getEmailComponent(value?: string): any {
    return {
      data: value,
      Component: EmailComponent
    }
  }

  onRemoveEmail(emailValue: string) {
    this.removeElementEmail(this.listEmails, emailValue)
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
  onAddTag(valueTag: string) {
    if (valueTag != '') {
      const tag: Tag = { tagValue: valueTag }
      this.listTags = this.listTags || [];
      this.listTags.push(tag)
      this._dataStorage.addTag(this.listTags)
    } else {
      console.log('Ingrese texto');
    }
  }

  onAddMyTags(valueTag: string) {
    const tag: Tag = { tagValue: valueTag }
    this.tags.push(tag)
    console.log(this.tags)
  }

  onRemoveTag(valueTag: string) {
    const tag: Tag = { tagValue: valueTag }
    this.removeElement(this.tags, valueTag)
    console.log(this.tags);

  }

  removeElement(arr: Tag[], element: string) {
    arr.forEach((value, index) => {
      if (value['tagValue'] == element) arr.splice(index, 1);
    });
  }



  /* 
  generate dynamic phones
  */
  phoneType: string = ''
  createComponentPhone(type: string, value?: string) {
    console.log(type)
    this.phoneType = type;
    var objectType: any = this.getObjectType(this.phoneType, value)
    const viewContainerRef = this.dynamic.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<InputPhone>(objectType.Component);
    componentRef.instance.data = objectType.data;

    if (value != undefined) {
      componentRef.instance.phone.subscribe((phoneValue: string) => {
        //const number: Phone = { phoneId: 0, phoneValue: phoneValue, phoneType: this.phoneType, icon: objectType.data.icon }
        this.listPhones.map(function (item) {
          if (item.phoneValue == value) {
            item.phoneValue = phoneValue;
            item.icon = objectType.data.icon
          }
        });
      })
    } else {
      componentRef.instance.phone.subscribe((phoneValue: string) => {
        const number: Phone = { phoneId: 0, phoneValue: phoneValue, phoneType: this.phoneType, icon: objectType.data.icon }
        console.log(number)
        this.listPhones.push(number)
        console.log(this.listPhones);
      })
    }

  }

  getObjectType(type: string, value?: string): any {
    switch (type) {
      case TypePhone.Home:
        return {
          data: { icon: 'bi bi-house', number: value },
          Component: HomeComponent
        }
      case TypePhone.Mobile:
        return {
          data: { icon: 'bi bi-phone', number: value },
          Component: MovilComponent
        }
      case TypePhone.Whatsapp:
        return {
          data: { icon: 'bi bi-whatsapp', number: value },
          Component: WhatsappComponent
        }
    }
  }

  onEditPhone(phone: Phone) {
    //this.phoneType = phone.phoneType;
    console.log(phone.phoneType);
    this.createComponentPhone(phone.phoneType)
    /* this.listPhones.map((item) => {
      if (item.phoneValue == phone.phoneValue) {

      }
    }) */

  }



  /* 
  Enviar formulario 
  */
  onSubmit() {
    console.log(this.createContact)
    const contact = this.createContact.value;
    const {
      contactId,
      contactFirstName,
      contactLastName,
      contactCompany,
      contactBirthday,
      contactNotes,
      contactAlias,
    } = contact;

    var contactItem: Contact = {
      contactId: contactId,
      contactFirstName: contactFirstName,
      contactLastName: contactLastName,
      contactCompany: contactCompany,
      contactBirthday: contactBirthday,
      contactNotes: contactNotes,
      contactAlias: contactAlias,
      contactPhoto: this.urlImage,
      contactEmails: this.listEmails,
      contactTags: this.tags,
      contactPhones: this.listPhones
    }
    console.log(contactItem)

    if (this.createContact.valid) {
      if (this.isCreate) {
        this.listContactsLocal = this.listContactsLocal || [];
        this.listContactsLocal.push(contactItem);
        this._dataStorage.addContactLocal(this.listContactsLocal);
        this._contactService.createContact(contactItem).subscribe(data => {
          console.log(data)
        })
      } else {
        this._contactService.updateContact(contactItem).subscribe(data => {
          console.log(data)
          if (data.statusCode == 400) {
            this.router.navigate(['admin/contacts/edit']);
          }

        })
      }
      this.router.navigate(['admin/contacts']);
    } else {
      console.log("Llene los campos");
    }


  }

  onSelectImage(e: any) {
    console.log(e)
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.urlImage = event.target.result;
        console.log(this.urlImage);
      }
    }
  }

}
