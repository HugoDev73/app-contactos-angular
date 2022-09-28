import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ContactCreateEditComponent } from "./contact-create-edit/contact-create-edit.component";
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";
import { ContactListComponent } from "./contact-list/contact-list.component";

const routes:Routes = [
        { path: '', component: ContactListComponent },
        { path: 'create', component: ContactCreateEditComponent },
        { path: 'edit', component: ContactCreateEditComponent },
        { path: 'detail', component: ContactDetailComponent }  
];

@NgModule({
imports: [
    RouterModule.forChild(routes)
],
exports: [RouterModule]
})

export class ContactsRoutingModule {

}