import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsRoutingModule } from './contacts-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactCreateEditComponent } from './contact-create-edit/contact-create-edit.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DynamicPhoneDirective } from 'src/app/directives/dynamic-phone.directive';
import { DynamicEmailDirective } from 'src/app/directives/dynamic-email.directive';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactDetailComponent,
    ContactCreateEditComponent,
    DynamicPhoneDirective,
    DynamicEmailDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ContactsRoutingModule,
    NgbModule,
    FormsModule,
  ],
})
export class ContactsModule {}
