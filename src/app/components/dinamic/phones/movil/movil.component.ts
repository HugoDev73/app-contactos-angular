import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputPhone } from '../../../../models/enumPhone';

@Component({
  selector: 'app-movil',
  templateUrl: './movil.component.html',
  styleUrls: ['./movil.component.scss'],
})
export class MovilComponent implements OnInit, InputPhone {
  data: any;
  lada: string = '';
  number: string = '';
  formMovil!: FormGroup;
  @Output() phone = new EventEmitter<string>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.data.number != undefined) {
      this.lada = this.data.number.substr(0, 3);
      this.number = this.data.number.substr(3);
    }
    this.createForm();
  }

  createForm() {
    this.formMovil = this.fb.group({
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
    console.log(this.formMovil);
    const {controlNumber, controlLada}  = this.formMovil.value;
    console.log(controlNumber.toString() + controlLada.toString());
    const phoneValue = controlLada.toString() + controlNumber.toString();
    if (this.formMovil.valid) {
      this.phone.emit(phoneValue);
    }
  }
}
