import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputPhone } from 'src/app/models/enumPhone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, InputPhone {
  data: any;
  //lada: string = ""
  number: string = ''
  formHome!: FormGroup;


  @Output() phone = new EventEmitter<string>();
  constructor(private fb: FormBuilder ) {}

  ngOnInit(): void {
    this.number = this.data.number;
    this.createForm();
  }

  createForm() {
    this.formHome = this.fb.group({
      controlNumber: [this.number, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  onSaveNumber() {
    const phoneValue = this.formHome.value.controlNumber

    if(this.formHome.valid){}
    //const phoneValue = (this.number).toString()
    this.phone.emit(phoneValue);
  }

}
