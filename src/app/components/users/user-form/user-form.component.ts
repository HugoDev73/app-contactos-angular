import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  data$!: Observable<User>;
  user!: User;
  usersLocal: User[] = [];
  createUser!: FormGroup;
  isCreate:boolean = true;
  urlImage = ""


  constructor(private _userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.getStatusForm();
    this.onCreateForm();
  }

  getStatusForm(){
    this._userService.statusFormObservable.subscribe(data => this.isCreate = data)
  }

  onCreateForm() {
    if(this.isCreate){
      this.createUser = new FormGroup({
        'userId': new FormControl(15, Validators.required),
        'userFullName': new FormControl(null, Validators.required),
        'userName': new FormControl(null, Validators.required),
        'userPassword': new FormControl(null, Validators.required),
        'userEmail': new FormControl(null, Validators.required),
        'userPhoto': new FormControl(null, Validators.required)
      });
    }else{
      this._userService.userObservable.subscribe((response:User) => {
        this.user = response;
      })
      this.createUser = new FormGroup({
        'userId': new FormControl(this.user.userId, Validators.required),
        'userFullName': new FormControl(this.user.userFullName, Validators.required),
        'userName': new FormControl(this.user.userName, Validators.required),
        'userPassword': new FormControl(this.user.userPassword, Validators.required),
        'userEmail': new FormControl(this.user.userEmail, Validators.required),
        'userPhoto': new FormControl(this.user.userPhoto, Validators.required),
      });
    }
    
  }

  onSubmit() {
    const user = this.createUser.value;
    console.log(user)

    if (this.createUser.valid) {
      if(this.isCreate){
        this._userService.createUser(user).subscribe(data => {
          console.log(data)
        })
      }else{
        this._userService.updateUser(user).subscribe(data => {
          console.log(data)
        })
      }
      this.router.navigate(['admin/contacts']);      
    } else {
      console.log("Llene los campos");
    }

  }
  
  onSelectImage(e: any) {
    console.log(e)
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
  
    if(e.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any) => {
        this.urlImage = event.target.result;
      }
    } 
  }

  /* onSubmit(){
     const user:User = this.signupForm.value
     
     this.userService.createUser(user).subscribe(data => console.log(data));
     localStorage.setItem('user', JSON.stringify(user));
    //console.log(this.signupForm.value);
  } */

}
