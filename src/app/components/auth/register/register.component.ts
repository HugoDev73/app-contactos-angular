import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  createUser!: FormGroup;

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.onCreateForm();
  }

  onCreateForm() {
    this.createUser = new FormGroup({
      'userFullName': new FormControl(null, Validators.required),
      'userName': new FormControl(null, Validators.required),
      'userPassword': new FormControl(null, Validators.required),
      'userEmail': new FormControl(null, Validators.required),
      'userPhoto': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const user = this.createUser.value;
    if (this.createUser.valid) {
      this._userService.createUser(user).subscribe(data => {
       console.log(data)
        //this.toastr.success('Inicio de sesion exitoso', 'Exito')
      })
    } else {
      console.log("Llene los campos");
      //this.toastr.error('Todos los campos son requeridos', 'Error')
    }

  }

}
