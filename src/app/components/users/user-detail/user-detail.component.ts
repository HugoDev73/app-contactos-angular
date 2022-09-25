import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private userService: UserService) { }

  data$!:Observable<User>;
  user!:User;

  ngOnInit(): void {
    this.onGetUser();
  }

  onGetUser(){
    this.userService.userObservable.subscribe((response:User) => {
      this.user = response;
      console.log(this.user)
    })
  }

}
