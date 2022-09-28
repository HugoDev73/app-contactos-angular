import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  title:string = "Agenda";
  closeResult = '';
  user!:User;
 
  constructor(private router: Router,
    private route: ActivatedRoute, 
    private offcanvasService: NgbOffcanvas, 
    private _userService: UserService, 
    private _authService: AuthService,
    private _dataStorage: DataStorageService) { }

    listLocal$ = this._dataStorage.listLocal$;

  ngOnInit(): void {
    this.onGetUser(12);
  }
 

  onGetUser(id:number){
    this._userService.getUser(id).subscribe( data => {
     this.user = data.result.user;
      console.log(data.result.user)
    })
  }

  open(content:any) {
    this.offcanvasService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  logout(){
    this._authService.logout().subscribe(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      this.router.navigate(['login']);
    })
  }

  refreshToken(){
    this._authService.refreshToken().subscribe((data) => {
      const {accessToken, refreshToken} = data.result
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    })
  }

  onEditProfile(user:User){
    this.router.navigate(['admin/users/edit']);
    this._userService.userObservableData = user;
    this._userService.statusFormObservableData = false;
    console.log(user);
  }


  ngOnDestroy(): void {
    
  }


}
