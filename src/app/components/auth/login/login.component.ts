import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  accessToken: string = "";
  refreshToken: string = "";

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.onCreateForm();
  }

  onCreateForm() {
    this.signupForm = new FormGroup({
      'authUser': new FormControl(null, Validators.required),
      'authPassword': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const { authUser, authPassword } = this.signupForm.value;
    if (authUser && authPassword) {
      this.authService.login(authUser, authPassword).subscribe(data => {
        const { accessToken, refreshToken, expiresAt } = data.result
        if (authUser == 'admin' && authPassword == 'admin') {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("expiresAt", expiresAt)
          this.router.navigate(['contacts']);
        } else {
          this.router.navigate(['login']);
        }
      })
    } else {
      console.log("Llene los campos");
      this.toastr.error('Todos los campos son requeridos', 'Error')
    }

  }

  verifyUser(authUser: string, authPassword: string) {
    if (authUser != 'admin' && authPassword != 'admin') {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['contacts']);
    }
  }

}
