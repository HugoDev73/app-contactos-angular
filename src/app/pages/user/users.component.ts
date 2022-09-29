import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseType } from 'src/app/enums/response.enum';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private _userService: UserService) { }

  userList!: User[];
  successMessage = '';
  showMessage: boolean = false;

  page = 1;
  pageSize = 10;
  collectionSize = 0;

  ngOnInit(): void {
    this.onShowUsers(); 
  }


  onShowUsers() {
    this._userService.getUsers().subscribe(data => {
      this.userList = data.result.list;
      this.collectionSize = data.result.count;
    });
  }

  onEditUser(user: User) {
    this.router.navigate(['edit'], { relativeTo: this.route, state:{user: user} });
    this._userService.userObservableData = user;
    this._userService.statusFormObservableData = false;
    console.log(user);
  }

  onDetailUser(user: User) {
    this.router.navigate(['detail'], { relativeTo: this.route });
    this._userService.userObservableData = user;
    console.log(user);
  }

  onDeleteUser(id: number) {
    this._userService.deleteUser(id).subscribe(data => {
      if(data.statusCode == ResponseType.Ok){}
    })

  }

  onNewUser() {
    this.router.navigate(['create'], { relativeTo: this.route });
    this._userService.statusFormObservableData = true;
  }

}
