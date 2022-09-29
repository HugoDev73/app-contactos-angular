import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MovilComponent } from './dinamic/phones/movil/movil.component';
import { HomeComponent } from './dinamic/phones/home/home.component';
import { WhatsappComponent } from './dinamic/phones/whatsapp/whatsapp.component';
import { EmailComponent } from './dinamic/email/email.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ToolbarComponent,
    MovilComponent,
    HomeComponent,
    WhatsappComponent,
    EmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule
  ],
  exports:[
    ToolbarComponent
  ]
})
export class ComponentModule { }
