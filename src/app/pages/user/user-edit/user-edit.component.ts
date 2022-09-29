import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  data$!: Observable<User>;
  user!: User;
  usersLocal: User[] = [];
  formUser!: FormGroup;
  isCreate:boolean = true;
  urlImage = ""


  constructor(private _userService: UserService, private router:Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getStatusForm();
    this.onCreateForm();
  }

  getStatusForm(){
    this._userService.statusFormObservable.subscribe(data => this.isCreate = data)
  }

  getUserData(){
    this.user = history.state.user
  }

  createFormUser(user?:User) {
    this.formUser = this.fb.group({
      userId: [!user ? null : user.userId],
      userFullName: [
        !user ? null : this.user.userFullName!,
        Validators.required,
      ],
      userName: [
        !user ? null : user.userName!,
        Validators.required,
      ],
      userPassword: [
        !user ? null : user.userPassword!,
        Validators.required,
      ],
      userEmail: [
        !user ? null : user.userEmail!,
        Validators.required,
      ],
      userPhoto: [
        !user ? null : user.userPhoto!,
        Validators.required,
      ]
    });
  }
  onCreateForm() {
    if(this.isCreate){
     this.createFormUser();
    }else{
      this.getUserData();
      this.createFormUser(this.user);

    }
    
  }

  onSubmit() {
    const user:User = this.formUser.value;
    user.userPhoto = this.urlImage;
    console.log(user);
    
    if (this.formUser.valid) {
      if(this.isCreate){
        this._userService.createUser(user).subscribe(data => {
          console.log(data)
        })
      }else{
        this._userService.updateUser(user).subscribe(data => {
          console.log(data)
        })
      }
      this.router.navigate(['contacts']);      
    } else {
      console.log("Llene los campos");
    }

  }
  

  onSelectImage(e: any) {
    console.log(e);
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    if (e.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.urlImage = event.target.result;
        console.log(this.urlImage);
      };
    }
  }


}
