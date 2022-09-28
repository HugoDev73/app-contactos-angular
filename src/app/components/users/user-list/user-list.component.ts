import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ResponseType } from '../../enums/response.enum';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

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

      this.userList = this.userList
        .map((user) => ({ ...user }))
        .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
      console.log(this.userList);
    });
  }

  onEditUser(user: User) {
    this.router.navigate(['edit'], { relativeTo: this.route });
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
