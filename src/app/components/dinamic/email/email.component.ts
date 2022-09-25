import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputEmail } from 'src/app/models/email.model';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit, InputEmail {
  data: any;
  formEmail!: FormGroup;
  email!:string;


  @Output() emailOutput = new EventEmitter<string>();

  constructor(private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.email = this.data
    this.createForm();
  }

  createForm() {
    this.formEmail = this.fb.group({
      controlEmail: [this.email, [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]]
    });
  }

  onSaveEmail(){
    console.log(this.formEmail);
    const emailValue = this.formEmail.value.controlEmail
    if(this.formEmail.valid){
      this.email =emailValue
      console.log(this.email);
    this.emailOutput.emit(this.email);
    }
  }

}
