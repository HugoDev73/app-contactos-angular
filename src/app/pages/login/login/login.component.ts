import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/enums/auth.enum';
import { ResponseType } from 'src/app/enums/response.enum';
import { AuthService } from 'src/app/services/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  accessToken: string = '';
  refreshToken: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private _dataStorage: DataStorageService
  ) {}

  ngOnInit(): void {
    this.onCreateForm();
  }

  onCreateForm() {
    this.signupForm = new FormGroup({
      authUser: new FormControl(null, Validators.required),
      authPassword: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const { authUser, authPassword } = this.signupForm.value;
    if (authUser && authPassword) {
      this.login(authUser, authPassword);
    } else {
      this.toastr.error('Todos los campos son requeridos', 'Error');
    }
  }

  login(authUser:string, authPassword:string){
    this.authService.login(authUser, authPassword).subscribe((data) => {
      if ((data.statusCode === ResponseType.Ok)) {
        const { accessToken, refreshToken, expiresAt } = data.result;
        if (authUser == User.authUser && authPassword == User.authPassword) {
          this._dataStorage.setInformationAuth(
            accessToken,
            refreshToken,
            expiresAt
          );
          this.router.navigate(['contacts']);
        } else {
          this.router.navigate(['login']);
        }
      }
    });
  }

 /*  verifyUser(authUser: string, authPassword: string) {
    if (authUser != User.authUser && authPassword != User.authPassword) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['contacts']);
    }
  } */ 
  
}
