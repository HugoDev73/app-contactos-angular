import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AppAgenda';
  isLogin: boolean = true;

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    //this.isLogin = this.isLoginUser();
    this.isLoginUser();
  }

  isLoginUser() {
    if (this._authService.isAuth()) {
      this.isLogin = true
      console.log('usuario logeado');
      
    }else{
      this.isLogin = false
      console.log('usuario NO logeado');
    }
    
  }
}
