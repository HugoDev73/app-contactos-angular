import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './auth/register/register.component';
import { MovilComponent } from './dinamic/phones/movil/movil.component';
import { HomeComponent } from './dinamic/phones/home/home.component';
import { WhatsappComponent } from './dinamic/phones/whatsapp/whatsapp.component';
import { EmailComponent } from './dinamic/email/email.component';
import { DynamicPhoneDirective } from './directives/dynamic-phone.directive';
import { DynamicEmailDirective } from './directives/dynamic-email.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    LoginComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactFormComponent,
    UserListComponent,
    UserDetailComponent,
    UserFormComponent,
    RegisterComponent,
    MovilComponent,
    HomeComponent,
    WhatsappComponent,
    EmailComponent,
    DynamicPhoneDirective,
    DynamicEmailDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports:[
    LoginComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactFormComponent,
    UserListComponent,
    UserDetailComponent,
    UserFormComponent,
    DynamicPhoneDirective,
  ]
})
export class ComponentModule { }