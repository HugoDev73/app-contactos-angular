import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  formWhatsapp!: FormGroup;
@Output() phone = new EventEmitter<string>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.data.number != undefined) {
      this.lada = this.data.number.substr(0, 3);
      this.number = this.data.number.substr(3);
    }
    this.createForm();
  }

  createForm() {
    this.formWhatsapp = this.fb.group({
      controlLada: [
        this.lada,
        [Validators.required, Validators.pattern(/^\D*\d{3}$/)],
      ],
      controlNumber: [
        this.number,
        [Validators.required, Validators.pattern(/^\D*\d{7}$/)],
      ],
    });
  }

  onSaveNumber() {
    console.log(this.formWhatsapp);
    const {controlNumber, controlLada}  = this.formWhatsapp.value;
    console.log(controlNumber.toString() + controlLada.toString());
    const phoneValue = controlLada.toString() + controlNumber.toString();
    if (this.formWhatsapp.valid) {
      this.phone.emit(phoneValue);
    }
  }
  

}
