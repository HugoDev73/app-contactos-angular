import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { InputPhone } from '../../../../models/enumPhone';

@Component({
  selector: 'app-movil',
  templateUrl: './movil.component.html',
  styleUrls: ['./movil.component.scss']
})
export class MovilComponent implements OnInit, InputPhone {
  data: any;
  lada: string = ""
  number: string = ""
  @Output() phone = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
    if( this.data.number != undefined){
      this.lada = this.data.number.substr(0,3)
      this.number = this.data.number.substr(3);
      console.log('lada: ',this.lada)
    }
  }

  onSaveNumber() {
    const numberPhone = (this.lada + this.number).toString()
    this.phone.emit(numberPhone);
  
  }

}
