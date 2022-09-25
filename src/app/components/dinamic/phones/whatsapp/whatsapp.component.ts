import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputPhone } from '../../../../models/enumPhone';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit, InputPhone {
data: any;
  lada: string = ""
  number: string = ""
@Output() phone = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    this.number = this.data.number;
  }

  onSaveNumber() {
    const numberPhone = (this.number).toString()
    this.phone.emit(numberPhone);
  
  }

}
