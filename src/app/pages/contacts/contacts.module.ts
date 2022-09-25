import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsRoutingModule } from './contacts-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
 
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        ContactsRoutingModule,
        NgbModule
    ]
})

export class ContactsModule {}