import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ContactDetailComponent } from "src/app/components/contacts/contact-detail/contact-detail.component";
import { ContactFormComponent } from "src/app/components/contacts/contact-form/contact-form.component";
import { ContactListComponent } from "src/app/components/contacts/contact-list/contact-list.component";
import { UserDetailComponent } from "src/app/components/users/user-detail/user-detail.component";
import { UserFormComponent } from "src/app/components/users/user-form/user-form.component";
import { UserListComponent } from "src/app/components/users/user-list/user-list.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { AboutComponent } from "../about/about.component";
import { AdminComponent } from "../admin/admin.component";
import { UsersComponent } from "../users/users.component";
import { ContactsComponent } from "./contacts.component";

const routes:Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children:[
    {
      path: 'contacts', component: ContactsComponent, children: [
        { path: '', component: ContactListComponent },
        { path: 'create', component: ContactFormComponent },
        { path: 'edit', component: ContactFormComponent },
        { path: 'detail', component: ContactDetailComponent }
      ]
    },
    {
      path: 'users', component: UsersComponent, children: [
        { path: '', component: UserListComponent },
        { path: 'create', component: UserFormComponent },
        { path: 'edit', component: UserFormComponent },
        { path: 'detail', component: UserDetailComponent }
      ]
    },
    { path: 'about', component: AboutComponent }
  ] }
];

@NgModule({
imports: [
    RouterModule.forChild(routes)
],
exports: [RouterModule]
})

export class ContactsRoutingModule {

}