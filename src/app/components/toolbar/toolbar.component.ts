import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {NgbOffcanvas, OffcanvasDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ResponseType } from 'src/app/enums/response.enum';
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
  total = 0;
  imageDefault = 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/man5-512.png'
 
  constructor(private router: Router,
    private route: ActivatedRoute, 
    private offcanvasService: NgbOffcanvas, 
    private _userService: UserService, 
    private _authService: AuthService,
    private _dataStorage: DataStorageService) { }

    totalContacts = this._dataStorage.cambiaNumObs$.subscribe(data => this.total = data)

  ngOnInit(): void {
    this.onGetUser(12);
  }
 
  menuOptions = [
    {name: 'contactos', route: '/contacts'},
    {name: 'about', route: '/about'}
  ]

  onGetUser(id:number){
    this._userService.getUser(id).subscribe( data => {
     this.user = data.result.user;
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
    this._authService.logout().subscribe((data) => {
      if(data.statusCode === ResponseType.Ok){
        this._dataStorage.removeInformationAuth();
        this.router.navigate(['login']);
      }
    })
  }

  refreshToken(){
    this._authService.refreshToken().subscribe((data) => {
      if (data.statusCode === ResponseType.Ok) {
        const {accessToken, refreshToken, expiresAt} = data.result
        this._dataStorage.setInformationAuth(accessToken,refreshToken, expiresAt);
      }
    })
  }

  onEditProfile(user:User){
    this.router.navigate(['user/edit'], { state:{user: user} });
    this._userService.statusFormObservableData = false;
  }


  ngOnDestroy(): void {
    
  }


}
